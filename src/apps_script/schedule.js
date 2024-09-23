function onEventCreated(trigger) {
  if (!trigger) {
    return;
  }

  var calendarId = trigger.calendarId;
  var calendar = CalendarApp.getCalendarById(calendarId);
  var properties = PropertiesService.getUserProperties();
  var predicateFilter = {};
  var currentSyncToken = properties.getProperty('syncToken');
  if (currentSyncToken) {
    predicateFilter.syncToken = currentSyncToken;
  } else {
    predicateFilter.timeMin = new Date().toISOString();
  }

  var eventResponse;
  var pageToken = null;
  try{
    do{
      var eventResponse = Calendar.Events.list(calendarId, predicateFilter);
      pageToken = eventResponse.nextPageToken;

      if(eventResponse.nextSyncToken != null){
        predicateFilter.syncToken = eventResponse.nextSyncToken;
        properties.setProperty('syncToken', eventResponse.nextSyncToken)
      }

      var events = eventResponse.items;
      for (var j=0; j<events.length; j++) {
        var e = calendar.getEventById(events[j].id);
        addEventToSheet(e);
      }
      predicateFilter.nextPageToken = pageToken;

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

  var scheduledEventData = [
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
    sheet.appendRow(scheduledEventData);
  } else {
    var range = idFinderResult[0];
    range.offset(0, 0, 1, scheduledEventData.length).setValues([scheduledEventData]);
  }
}

