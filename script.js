$(function () {
  // Function to generate time blocks for specific hours
  function generateTimeBlocks() {
    // select the container element with the id "timeBlocks"
    var container = $('#timeBlocks');

    // Array of hours to display in the time blocks starting at 9am to 5 pm.
    var hoursToDisplay = [9, 10, 11, 12, 13, 14, 15, 16, 17];

    // loop through each hour in the array
    for (var i = 0; i < hoursToDisplay.length; i++) {
      // get the current hour
      var hour = hoursToDisplay[i];
      // format the hour for display in 24-hour format using Day.js
      var displayHour = dayjs().hour(hour).format('hA');

      // create a div element for the time block with appropriate classes 'row' and 'time-block'
      var timeBlock = $('<div>').addClass('row time-block');
      // create a div element for the hours label with appropriate classes and text content
      var hourLabel = $('<div>').addClass('col-2 col-md-1 hour text-center py-3').text(displayHour);
      // create a textarea element with appropriate classes and set number of rows to 3 and enters a place holder to 'Enter your task...'
      var textarea = $('<textarea>').addClass('col-8 col-md-10 description').attr('rows', 3).attr('placeholder', 'Enter your task...');
      // create a button element for saving with appropriate classes and 'aria-label'
      var saveBtn = $('<button>').addClass('btn saveBtn col-2 col-md-1').attr('aria-label', 'save');
      // create an icon element for the save button using Font Awesome classes and adds the icon of the floppy disk.
      var saveIcon = $('<i>').addClass('fas fa-save').attr('aria-hidden', 'true');

      // Append the save icon to the save button
      saveBtn.append(saveIcon);
      // Set the 'id' attribute of the time block to "hour-" followed by the current hour
      timeBlock.attr('id', 'hour-' + hour);
      // Append the hour label, textarea, and save button to the time block
      timeBlock.append(hourLabel, textarea, saveBtn);
      // Append the entire time block to the container
      container.append(timeBlock);
    }
  }

  // Function to update time block classes based on current time
  function updateTimeBlocks() {
     
    //Get the current hours using dayjs
    var currentHour = dayjs().hour();

    //loop through all elements with the class 'time-block'
    $('.time-block').each(function () {
      //extract the hour from the element's ID (assumed format: 'hour-X)
      var blockHour = parseInt($(this).attr('id').split('-')[1]);

      //comapare the block hour with the curren hour an update classes
      if (blockHour < currentHour) {
        //if the block hour is in the past, remove prensent and future classes, add the past class
        $(this).removeClass('present future').addClass('past');
        //if the block hour is the current hour, remove the past and future classes, add the present class
      } else if (blockHour === currentHour) {
        $(this).removeClass('past future').addClass('present');
        //if the block hour is in the future, remove past and present classes, add the future class
      } else {
        $(this).removeClass('past present').addClass('future');
      }
    });
  }

  // Function to save user input in local storage
  function saveToLocalStorage() {
    //loop through all elements with the class 'time-block'
    $('.time-block').each(function () {
      //get the ID of the time block
      var blockId = $(this).attr('id');
      //retrieve the user imput fromt he textarea inside the current time block
      var userDescription = $(this).find('.description').val();
      //save the user imput to local storage with the time block ID as the key 
      localStorage.setItem(blockId, userDescription);
    });
  }

  // Function to load saved data from local storage
  function loadFromLocalStorage() {
    //loop through all elements with the class 'time-block'
    $('.time-block').each(function () {
      //get the ID of the current time block
      var blockId = $(this).attr('id');
      //retireve the stored description from local storage using the time block ID as the key
      var storedDescription = localStorage.getItem(blockId);
      //set the value of the text area inside the current time block to the stored description
      $(this).find('.description').val(storedDescription);
    });
  }

  // Function to display the current date in the header
  function displayCurrentDate() {
    //use the dayjs library to format the current date as 'dddd, MMMM D'
    var currentDate = dayjs().format('dddd, MMMM D');
    //set the text context of the element with the ID 'currentDay' to dislay the current date
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
    //call the saveToLocalStorage fucntion to saveuser input to local storage
    saveToLocalStorage();
    // Provide visual feedback, for example:
    $(this).addClass('saved').text('Saved');
    // You can reset the button state after a certain period if needed.
    setTimeout(() => {
      //Remove the 'saved' class and revert the button text to 'Save' after a delay of 2000 milliseconds (2 seconds)
      $(this).removeClass('saved').text('Save');
    }, 2000);
  });

  // Update time blocks every minute
  //set interval to call the updateTimeBlocks function every 60,000 milliseconds (1 minute)
  var updateInterval = setInterval(function () {
    //Call the updateTimeBlocks function to update the classes of time blocks based on the current time
    updateTimeBlocks();
  }, 60000);
  
});