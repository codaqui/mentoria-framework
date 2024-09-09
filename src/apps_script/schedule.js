function onEventCreated() {
    var calendarId = 'mentoria@codaqui.dev';
    var events = CalendarApp.getCalendarById(calendarId).getEventsForDay(new Date());

    events.forEach(function(event) {
        if (!event.isAllDayEvent()) {
            addEventToSheet(event);
        }
    });
}

function addEventToSheet(event) {
    var spreadsheetId = '1YCJIVcVQlFWZOdZSYSrnGIZ3Q0y0JOFsZ_uZBmh3dyI';//Not sensitive
    var sheetName = 'Schedules';

    var spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    var sheet = spreadsheet.getSheetByName(sheetName);
    sheet.appendRow([event.getTitle(), event.getStartTime(), event.getEndTime(), event.getLocation()]);
}