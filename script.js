// ===== DATE =====
const today = new Date();
const todayKey = today.toDateString();

document.getElementById("todayDate").innerText =
  today.toDateString();

// ===== STORAGE =====
let data = JSON.parse(localStorage.getItem("habitData")) || {
  habits: [],
  logs: {}
};

if (!data.logs[todayKey]) {
  data.logs[todayKey] = {};
}

function save() {
  localStorage.setItem("habitData", JSON.stringify(data));
}

// ===== ADD HABIT =====
function addHabit() {
  const input = document.getElementById("habitInput");
  const name = input.value.trim();
  if (!name) return;

  if (!data.habits.includes(name)) {
    data.habits.push(name);
    data.logs[todayKey][name] = null;
    save();
    renderHabits();
  }
  input.value = "";
}

// ===== MARK DONE / NOT DONE =====
function markHabit(habit, status) {
  data.logs[todayKey][habit] = status;
  save();
  renderHabits();
}

// ===== RENDER =====
function renderHabits() {
  const container = document.getElementById("habitsSection");
  container.innerHTML = "";

  data.habits.forEach(habit => {
    const state = data.logs[todayKey][habit];

    const card = document.createElement("div");
    card.className = "habitCard";

    card.innerHTML = `
      <h3>${habit}</h3>
      <div class="buttons">
        <button class="done ${state === true ? "active" : ""}"
          onclick="markHabit('${habit}', true)">Done</button>

        <button class="notdone ${state === false ? "active" : ""}"
          onclick="markHabit('${habit}', false)">Not Done</button>
      </div>
    `;

    container.appendChild(card);
  });
}

// ===== INIT =====
renderHabits();

