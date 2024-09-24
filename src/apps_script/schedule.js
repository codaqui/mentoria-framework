function onEventCreated(trigger) {
  if (!trigger) {
    return;
  }
    
  var calendarId = trigger.calendarId;
  var calendar = CalendarApp.getCalendarById(calendarId);
  // Logger.log("Event Raised: " + calendarId);
  var properties = PropertiesService.getUserProperties();
  var options = {};
  var syncToken = properties.getProperty('syncToken'); // pointer token from last sync also stored in user properties
  if (syncToken) {                        // if there is a sync token from last time
    options.syncToken = syncToken; // adds the current sync token to the list of sync options
  } else {
    // Sync events from today onwards.
    options.timeMin = new Date().toISOString(); //change to new Date().toISOString() from getRelativeDate(-1, 0).toISOString()    
  }    
  var eventResponse;
  var pageToken = null;
  try{
    do{     
      Logger.log(options);
      var eventResponse = Calendar.Events.list(calendarId, options);
      pageToken = eventResponse.nextPageToken;
      Logger.log ('PageToken: %s', pageToken);

      if(eventResponse.nextSyncToken != null){
        options.syncToken = eventResponse.nextSyncToken;
        properties.setProperty('syncToken', eventResponse.nextSyncToken)
        Logger.log ('NextSyncToken: %s', eventResponse.nextSyncToken);
      }
      var events = eventResponse.items;
      // Logger.log ('events: %s', events.length);
      for (var j=0; j<events.length; j++) {
        var e = calendar.getEventById(events[j].id);      
        Logger.log ('Title: %s', e.getTitle());  
        upsertEventToSheet(e);
      }
      options.nextPageToken = pageToken;

    } while(pageToken != null);
  } catch (ex){
    Logger.log ('Exception: %s', ex);
  }
}

function upsertEventToSheet(event) {

  var description = event.getDescription();

  Logger.log('description: %s', description);

  var telefoneMatch = description.match(/(.+)\s*<br><b>Idade<\/b>/);
  var telefone = telefoneMatch ? telefoneMatch[1] : "Telefone não encontrado";
  var idadeMatch = description.match(/<b>Idade<\/b>\s*(.+)/);
  var idade = idadeMatch ? idadeMatch[1] : "Idade não encontrada";
  var cidadeMatch = description.match(/<b>Cidade\/PR<\/b>\s*([^<]+)/);
  var cidade = cidadeMatch ? cidadeMatch[1].trim() : "Cidade/PR não encontrada";

  var spreadsheetId = '1YCJIVcVQlFWZOdZSYSrnGIZ3Q0y0JOFsZ_uZBmh3dyI';
  var spreadsheet = SpreadsheetApp.openById(spreadsheetId);

  var mentorsSheetName = 'Mentors';
  var mentorsSheet = spreadsheet.getSheetByName(mentorsSheetName);
  
  var mentor = {};
  var mentees = [];

  event.getGuestList().forEach(function(guest) {
    var mentorFinder = mentorsSheet.createTextFinder(guest.getEmail());
    if (mentorFinder.findAll().length !== 0) {
      Logger.log ('mentor: %s', guest.getEmail());
      mentor = {email: guest.getEmail()};
    } else {  
      Logger.log ('mentee: %s', guest.getEmail());
      mentee = {name: guest.getName(), email: guest.getEmail(), phone: telefone, age: idade, city: cidade};
      mentees.push(mentee);
    }
  });

  mentees.forEach(function(mentee) {
    upsertMentee(spreadsheet, mentee, mentor);
  });

  upsertSchedule(spreadsheet, event, mentee, mentor)
}

function upsertMentee(spreadsheet, mentee, mentor) {
  var menteesSheetName = 'Mentees';
  var menteesSheet = spreadsheet.getSheetByName(menteesSheetName);

  var menteeValue = [
    mentee.email, 
    mentee.name, 
    mentor.email, 
    mentee.phone, 
    mentee.age,
    mentee.city
  ];

  var menteeFinder = menteesSheet.createTextFinder(mentee.email);
  var finderResult = menteeFinder.findAll();
  if (finderResult.length == 0) {
    menteesSheet.appendRow(menteeValue);
  } else {
    var range = finderResult[0].offset(0, 0, 1, menteeValue.length);
    range.setValues([menteeValue]);
  }
}

function upsertSchedule(spreadsheet, event, mentee, mentor) {
  var scheduleSheetName = 'Schedules';
  var schedulesSheet = spreadsheet.getSheetByName(scheduleSheetName);

  var scheduleValue = [
    event.getId(), 
    new Date(), 
    mentor.email, 
    mentee.email, 
    event.getStartTime(), 
    event.getEndTime(), 
    event.getTitle()
  ];

  var idFinder = schedulesSheet.createTextFinder(event.getId());
  var idFinderResult = idFinder.findAll();
  if (idFinderResult.length == 0) {
    schedulesSheet.appendRow(scheduleValue);
  } else {
    var range = idFinderResult[0].offset(0, 0, 1, scheduleValue.length);
    range.setValues([scheduleValue]);
  }
}
