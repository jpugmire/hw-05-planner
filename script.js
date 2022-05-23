window.addEventListener('load', updateRows); //grab already saved data from storage when page loads

const saveBtns = document.getElementsByClassName('saveBtn'); //add event listeners to save buttons
for(i = 0; i < saveBtns.length; i++){
    saveBtns[i].addEventListener('click', saveRow);
}

function saveRow() {
    //grab elements and values
    targetEl = window.event.target.previousElementSibling;
    parentEl = targetEl.parentElement;
    const time = parentEl.id;
    const textValue = targetEl.value;
    console.log('now saving event from ' + time)
    //save to local storage
    localStorage.setItem(time, textValue);
    //show the notification section
    notificationEl = document.getElementsByClassName('notification')
    notificationEl[0].classList.add("show");
    setTimeout(function () {
        notificationEl[0].classList.remove("show");
    }, 5000);
}

function updateRows() {
    const descriptions = {
        '0': localStorage.getItem('hour-1'),
        '1': localStorage.getItem('hour-2'),
        '2': localStorage.getItem('hour-3'),
        '3': localStorage.getItem('hour-4'),
        '4': localStorage.getItem('hour-5'), //grab storage items
        '5': localStorage.getItem('hour-6'),
        '6': localStorage.getItem('hour-7'),
        '7': localStorage.getItem('hour-8'),
        '8': localStorage.getItem('hour-9'),
    }
    const descs = document.getElementsByClassName('description');
    Object.keys(descs).map(function(el) { //apply saved row text to rows
        descs[el].innerHTML = descriptions[el];
    });
}

function hourUpdater() {
    // get current number of hours
    var currentHour = moment().hours();

    // loop over time blocks
    $('.time-block').each(function () {
      var blockHour = (parseInt($(this).attr('id').split('-')[1])) + 8;

      // check if we've moved past this time
      if (blockHour < currentHour) {
        $(this).addClass('past');
      } else if (blockHour === currentHour) {
        $(this).removeClass('past');
        $(this).addClass('present');
      } else {
        $(this).removeClass('past');
        $(this).removeClass('present');
        $(this).addClass('future');
      }
    });
  }

  hourUpdater();

  // set up interval to check if current time needs to be updated
  var interval = setInterval(hourUpdater, 15000);