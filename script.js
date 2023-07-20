document.addEventListener('DOMContentLoaded', function() {
    // Current date
    var currentDate = new Date();
    // Month Day, Year
    var formattedDate = currentDate.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  
    // Content of the current-day element
    document.getElementById('current-day').textContent = formattedDate;
  
    // Start and end hours 24HR
    var startHour = 9;
    var endHour = 17;
  
    // Calendar container element
    var calendarContainer = document.getElementById('calendar');
  
    // Loop hours
    for (var hour = startHour; hour <= endHour; hour++) {
      // Time block elements
      var timeBlock = document.createElement('div');
      timeBlock.classList.add('time-block');
  
      var hourElement = document.createElement('div');
      hourElement.classList.add('hour');
      hourElement.textContent = formatHour(hour);
  
      var eventInput = document.createElement('textarea');
      eventInput.classList.add('event');
      eventInput.setAttribute('data-hour', hour);
  
      var saveButton = document.createElement('button');
      saveButton.classList.add('save-btn');
      saveButton.textContent = 'Save';
  
      // Append time block
      timeBlock.appendChild(hourElement);
      timeBlock.appendChild(eventInput);
      timeBlock.appendChild(saveButton);
  
      // Append calendar container
      calendarContainer.appendChild(timeBlock);
    }
  
    // Format hour in 12-hour format
    function formatHour(hour) {
      var meridiem = hour >= 12 ? 'PM' : 'AM';
      hour = hour % 12 || 12;
      return hour + ':00' + meridiem;
    }
  
    // Time block colors
    function updateTimeBlockColors() {
      // Current hour in 24-hour format
      var currentHour = new Date().getHours();
  
      // All time block elements
      var timeBlocks = document.getElementsByClassName('time-block');
  
      // Loop time blocks
      for (var i = 0; i < timeBlocks.length; i++) {
        var timeBlock = timeBlocks[i];
        var hour = parseHour(timeBlock.querySelector('.hour').textContent);
  
        // Reset block color
        timeBlock.classList.remove('past', 'present', 'future');
  
        // Add color based on the current hour
        if (hour < currentHour) {
          timeBlock.classList.add('past');
        } else if (hour === currentHour) {
          timeBlock.classList.add('present');
        } else {
          timeBlock.classList.add('future');
        }
      }
    }
  
    // Parse hour in 12-hour format to 24-hour format
    function parseHour(hourString) {
      var parts = hourString.split(':');
      var hour = parseInt(parts[0]);
      var meridiem = parts[1].slice(-2);
  
      if (meridiem === 'PM' && hour !== 12) {
        hour += 12;
      } else if (meridiem === 'AM' && hour === 12) {
        hour = 0;
      }
  
      return hour;
    }
  
    // Update time block colors
    updateTimeBlockColors();
  
    // Saving event
    function saveEvent(eventInput) {
      var hour = eventInput.getAttribute('data-hour');
      var eventText = eventInput.value;
  
      // Save to local storage
      localStorage.setItem('event-' + hour, eventText);
    }
  
    // Event listener for save buttons
    var saveButtons = document.getElementsByClassName('save-btn');
    for (var i = 0; i < saveButtons.length; i++) {
      var saveButton = saveButtons[i];
      saveButton.addEventListener('click', function() {
        var eventInput = this.parentNode.querySelector('.event');
        saveEvent(eventInput);
      });
    }
  
    // Load saved events from local storage
    function loadEvents() {
      var eventInputs = document.getElementsByClassName('event');
  
      // Loop inputs & load saved events
      for (var i = 0; i < eventInputs.length; i++) {
        var eventInput = eventInputs[i];
        var hour = eventInput.getAttribute('data-hour');
  
        // Get saved event from local storage
        var savedEvent = localStorage.getItem('event-' + hour);
  
        // Value of the event to the saved event
        eventInput.value = savedEvent;
      }
    }
  
    // Load the saved events
    loadEvents();
  });
  