import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const startBtn = document.querySelector("[data-start]")
const timerEl = document.querySelector(".timer");
const fieldsEl = document.querySelectorAll(".field");
const valuesEl = document.querySelectorAll(".value");
const daysEl = document.querySelector("[data-days]");
const hoursEl = document.querySelector("[data-hours]");
const minutesEl = document.querySelector("[data-minutes]");
const secondsEl = document.querySelector("[data-seconds]");
const labelsEl = document.querySelectorAll(".label");
let selectedDate = null;
let timerId = null;

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, "0");
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        clearInterval(timerId);
        selectedDate = selectedDates[0];
      if (selectedDates[0] < new Date()) {
          startBtn.setAttribute('disabled', '');
          Notiflix.Notify.warning("Please choose a date in the future");
      } else {
          startBtn.removeAttribute('disabled');
      };
  },
};

flatpickr('input[type="text"]', options);

startBtn.setAttribute('disabled', '');
startBtn.addEventListener('click', () => {
    clearInterval(timerId);
    timerId = setInterval(() => {
        const diffTime = selectedDate - new Date();
        const { days, hours, minutes, seconds } = convertMs(diffTime);
        daysEl.textContent = addLeadingZero(days);
        hoursEl.textContent = addLeadingZero(hours);
        minutesEl.textContent = addLeadingZero(minutes);
        secondsEl.textContent = addLeadingZero(seconds);

        if (
            daysEl.textContent === '00' &&
            hoursEl.textContent === '00' &&
            minutesEl.textContent === '00' &&
            secondsEl.textContent === '00'
        ) {
            clearInterval(timerId);
        };
    }, 1000);
});

timerEl.style.display = "flex";
timerEl.style.marginTop = "16px";
timerEl.style.gap = "14px";

fieldsEl.forEach((field) => {
    field.style.display = "flex";
    field.style.flexDirection = "column";
    field.style.alignItems = "center";
});

valuesEl.forEach((value) => {
    value.style.fontSize = "32px";
    value.style.fontWeight = "500";
});

labelsEl.forEach((label) => {
    label.style.textTransform = "uppercase";
    label.style.fontSize = "12px";
    label.style.fontWeight = "500";
});
