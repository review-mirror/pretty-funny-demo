const calendarContainer = document.getElementById('calendar');
const monthYear = document.getElementById('monthYear');
const prevMonth = document.getElementById('prevMonth');
const nextMonth = document.getElementById('nextMonth');
const modal = document.getElementById('modal');
const closeModal = document.getElementsByClassName('close')[0];
const addTaskButton = document.getElementById('addTask');
const taskInput = document.getElementById('taskInput');
const motivationalQuote = document.getElementById('motivationalQuote');

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let selectedDay = null;

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const motivationalQuotes = [
    "January: The best way to predict the future is to create it.",
    "February: Success is not the key to happiness. Happiness is the key to success.",
    "March: The only limit to our realization of tomorrow is our doubts of today.",
    "April: Don't watch the clock; do what it does. Keep going.",
    "May: Keep your face always toward the sunshine—and shadows will fall behind you.",
    "June: The future belongs to those who believe in the beauty of their dreams.",
    "July: The only way to do great work is to love what you do.",
    "August: The best preparation for tomorrow is doing your best today.",
    "September: Act as if what you do makes a difference. It does.",
    "October: Quality is not an act, it is a habit.",
    "November: The best revenge is massive success.",
    "December: Life is 10% what happens to us and 90% how we react to it."
];

function renderCalendar(month, year) {
    calendarContainer.innerHTML = '';
    monthYear.textContent = `${monthNames[month]} ${year}`;
    motivationalQuote.textContent = motivationalQuotes[month];

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.classList.add('day');
        calendarContainer.appendChild(emptyCell);
    }

    for (let i = 1; i <= daysInMonth; i++) {
        const dayCell = document.createElement('div');
        dayCell.classList.add('day');
        dayCell.textContent = i;
        dayCell.addEventListener('click', () => openModal(i));
        calendarContainer.appendChild(dayCell);
    }
}

function openModal(day) {
    selectedDay = day;
    modal.style.display = 'block';
}

function closeModalFunc() {
    modal.style.display = 'none';
    taskInput.value = '';
}

function addTask() {
    if (taskInput.value) {
        const task = taskInput.value;
        alert(`Task for ${selectedDay}/${currentMonth + 1}/${currentYear}: ${task}`);
        closeModalFunc();
    }
}

prevMonth.addEventListener('click', () => {
    currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    currentYear = currentMonth === 11 ? currentYear - 1 : currentYear;
    renderCalendar(currentMonth, currentYear);
});

nextMonth.addEventListener('click', () => {
    currentMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    currentYear = currentMonth === 0 ? currentYear + 1 : currentYear;
    renderCalendar(currentMonth, currentYear);
});

closeModal.addEventListener('click', closeModalFunc);
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModalFunc();
    }
});

addTaskButton.addEventListener('click', addTask);

renderCalendar(currentMonth, currentYear);
