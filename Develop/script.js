$(function () {
  // Function to generate time blocks for specific hours
  function generateTimeBlocks() {
    //select the container element with the id "timeBlocks"
    var container = $('#timeBlocks');

    //Array of hours to display in the time blocks starting at 9am to 5 pm.
    var hoursToDisplay = [9, 10, 11, 12, 13, 14, 15, 16, 17,];

    //loop trough each hour in nthe array
    for (var i = 0; i < hoursToDisplay.length; i++) {
      //get the current hour
      var hour = hoursToDisplay[i];
      //determine AM or PM based on the current hour
      var ampm = hour >= 12 ? 'PM' : 'AM';
      //format the hour for display in 12-hour format
      var displayHour = hour > 12 ? hour - 12 : hour;

      //create a div element for the hour label with appropiate classes 'row' and 'time-block'
      var timeBlock = $('<div>').addClass('row time-block');
      //creates a div element for the hours label with appropiate classes and text content
      var hourLabel = $('<div>').addClass('col-2 col-md-1 hour text-center py-3').text(displayHour + ampm);
      //create a textarea element with appropiate classes and set number of rows to 3
      var textarea = $('<textarea>').addClass('col-8 col-md-10 description').attr('rows', 3);
      //create a button element for saving with appropiate classes and 'aria-label'
      var saveBtn = $('<button>').addClass('btn saveBtn col-2 col-md-1').attr('aria-label', 'save');
      //create an icon element for the save buttion using Font Awesome classes
      var saveIcon = $('<i>').addClass('fas fa-save').attr('aria-hidden', 'true');

      //Append the save icon tot he save buttion
      saveBtn.append(saveIcon);
      //set the 'id' attribute of the time block to "hour-" followed by the current hour
      timeBlock.attr('id', 'hour-' + hour);
      //append the hour label, textera, and save buttion to the time block
      timeBlock.append(hourLabel, textarea, saveBtn);
      //append the entire time block to the container
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
