$(function () {
  // Function to generate time blocks for specific hours
  function generateTimeBlocks() {
    var container = $('#timeBlocks');

    var hoursToDisplay = [9, 10, 11, 12, 13, 14, 15, 16, 17,];

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

  // Function to update time block classes based on current time
  function updateTimeBlocks() {
    var currentHour = dayjs().hour();

    $('.time-block').each(function () {
      var blockHour = parseInt($(this).attr('id').split('-')[1]);

      if (blockHour < currentHour) {
        $(this).removeClass('present future').addClass('past');
      } else if (blockHour === currentHour) {
        $(this).removeClass('past future').addClass('present');
      } else {
        $(this).removeClass('past present').addClass('future');
      }
    });
  }

  // Function to save user input in local storage
  function saveToLocalStorage() {
    $('.time-block').each(function () {
      var blockId = $(this).attr('id');
      var userDescription = $(this).find('.description').val();
      localStorage.setItem(blockId, userDescription);
    });
  }

  // Function to load saved data from local storage
  function loadFromLocalStorage() {
    $('.time-block').each(function () {
      var blockId = $(this).attr('id');
      var storedDescription = localStorage.getItem(blockId);
      $(this).find('.description').val(storedDescription);
    });
  }

  // Function to display the current date in the header
  function displayCurrentDate() {
    var currentDate = dayjs().format('dddd, MMMM D');
    $('#currentDay').text(currentDate);
  }

  // Generate time blocks on page load
  generateTimeBlocks();

  // Display current date on page load
  displayCurrentDate();

  // Apply past, present, or future class on page load
  updateTimeBlocks();

  // Load saved data from local storage on page load
  loadFromLocalStorage();

  // Click event listener for save button
  $('.saveBtn').on('click', function () {
    saveToLocalStorage();
  });

  // Update time blocks every minute
  setInterval(function () {
    updateTimeBlocks();
  }, 60000);
});
