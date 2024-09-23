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
  if (syncToken) { // if there is a sync token from last time
    options.syncToken = syncToken; // adds the current sync token to the list of sync options
  } else {
    // Sync events from today onwards.
    options.timeMin = new Date().toISOString(); //change to new Date().toISOString() from getRelativeDate(-1, 0).toISOString()    
  }    
  var eventResponse;
  var pageToken = null;
  try{
    do{      
      var eventResponse = Calendar.Events.list(calendarId, options);
      pageToken = eventResponse.nextPageToken;
      // Logger.log ('PageToken: %s', pageToken);

      if(eventResponse.nextSyncToken != null){
        options.syncToken = eventResponse.nextSyncToken;
        properties.setProperty('syncToken', eventResponse.nextSyncToken)
        // Logger.log ('NextSyncToken: %s', eventResponse.nextSyncToken);
      }
      var events = eventResponse.items;
      for (var j=0; j<events.length; j++) {
        var e = calendar.getEventById(events[j].id);        
        addEventToSheet(e);
      }
      options.nextPageToken = pageToken;

    }while(pageToken != null);
  } catch (ex){
    Logger.log ('Exception: %s', ex);
  }
}

function addEventToSheet(event) {
  var spreadsheetId = '1YCJIVcVQlFWZOdZSYSrnGIZ3Q0y0JOFsZ_uZBmh3dyI';
  var sheetName = 'Schedules';
  var spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  var sheet = spreadsheet.getSheetByName(sheetName);
  var guestEmails = event.getGuestList().map(function(guest) {
      return guest.getEmail();
  }).join(', ');

  var values = [
    event.getId(), 
    new Date(), 
    guestEmails, 
    event.getStartTime(), 
    event.getEndTime(), 
    event.getTitle()
  ];

  var idFinder = sheet.createTextFinder(event.getId());
  var idFinderResult = idFinder.findAll();
  if (idFinderResult.length == 0) {
    sheet.appendRow(values);
  } else {
    var range = idFinderResult[0];
    range.offset(0, 0, 1, values.length).setValues([values]);
  }

}

