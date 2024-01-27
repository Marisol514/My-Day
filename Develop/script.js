$(function () {
  // Function to generate time blocks for specific hours
  function generateTimeBlocks() {
    var container = $('#timeBlocks');

    var hoursToDisplay = [9, 10, 11, 12, 13, 14, 15, 16, 17];

    for (var i = 0; i < hoursToDisplay.length; i++) {
      var hour = hoursToDisplay[i];
      var ampm = hour >= 12 ? 'PM' : 'AM';
      var displayHour = hour > 12 ? hour - 12 : hour;

      var timeBlock = $('<div>').addClass('row time-block');
      var hourLabel = $('<div>').addClass('col-2 col-md-1 hour text-center py-3').text(displayHour + ampm);
      var textarea = $('<textarea>').addClass('col-8 col-md-10 description').attr('rows', 3);
      var saveBtn = $('<button>').addClass('btn saveBtn col-2 col-md-1').attr('aria-label', 'save');
      var saveIcon = $('<i>').addClass('fas fa-save').attr('aria-hidden', 'true');

      saveBtn.append(saveIcon);
      timeBlock.attr('id', 'hour-' + hour);
      timeBlock.append(hourLabel, textarea, saveBtn);
      container.append(timeBlock);
    }
  }


  // Function to display the current date in the header
  function displayCurrentDate() {
    var currentDate = dayjs().format('dddd, MMMM D');
    $('#currentDay').text(currentDate);
  }


});
