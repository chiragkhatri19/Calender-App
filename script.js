const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let isDarkMode = false;

renderCalendar();

function renderCalendar() {
  let firstDay = (new Date(currentYear, currentMonth, 1)).getDay();
  let daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  document.getElementById("month-year").innerText = monthNames[currentMonth] + " " + currentYear;

  let dates = document.getElementById("dates");
  dates.innerHTML = "";

  let blanks = "";
  for (let i = 0; i < firstDay; i++) {
    blanks += "<span></span>";
  }

  for (let i = 1; i <= daysInMonth; i++) {
    let dateElement = document.createElement("span");
    dateElement.innerText = i;
    dateElement.classList.add("date");
    if (i === new Date().getDate() && currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear()) {
      dateElement.classList.add("current-date");
    }
    dates.appendChild(dateElement);
  }

  dates.innerHTML = blanks + dates.innerHTML;
  toggleTheme(); // Apply initial theme based on the isDarkMode flag
}

function previousMonth() {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar();
}

function nextMonth() {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar();
}

function changeTheme() {
  isDarkMode = !isDarkMode;
  toggleTheme();
}

function toggleTheme() {
  const body = document.body;
  const calendarContainer = document.querySelector('.calendar-container');
  const dateSpans = document.querySelectorAll('.dates span');

  if (isDarkMode) {
    body.classList.add('dark-mode');
    calendarContainer.classList.add('dark-mode');
    dateSpans.forEach(span => span.classList.add('dark-mode'));
  } else {
    body.classList.remove('dark-mode');
    calendarContainer.classList.remove('dark-mode');
    dateSpans.forEach(span => span.classList.remove('dark-mode'));
  }
}

// Add event listeners to the previous and next month buttons and the slider
document.getElementById("previous-month").addEventListener("click", previousMonth);
document.getElementById("next-month").addEventListener("click", nextMonth);
document.getElementById("theme-slider").addEventListener("change", changeTheme);
