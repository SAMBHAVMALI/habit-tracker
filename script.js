// ---------- DATE (AUTOMATIC) ----------
const today = new Date();
const dateKey = today.toISOString().split("T")[0]; // e.g. 2025-01-17

document.getElementById("todayDate").innerText =
  today.toDateString();

// ---------- STATE ----------
let data = JSON.parse(localStorage.getItem("habitData")) || {};

if (!data[dateKey]) data[dateKey] = {};

// ---------- RENDER ----------
function renderHabits() {
  const container = document.getElementById("habitSection");
  container.innerHTML = "";

  Object.keys(data[dateKey]).forEach(habit => {
    const card = document.createElement("div");
    card.className = "habitCard";

    card.innerHTML = `
      <h3>${habit}</h3>
      <button class="done">Done</button>
      <button class="notdone">Not Done</button>
    `;

    card.children[1].onclick = () => {
      data[dateKey][habit] = true;
      save();
    };

    card.children[2].onclick = () => {
      data[dateKey][habit] = false;
      save();
    };

    container.appendChild(card);
  });
}

// ---------- ADD HABIT ----------
function addHabit() {
  const input = document.getElementById("habitInput");
  const habit = input.value.trim();
  if (!habit) return;

  data[dateKey][habit] = null;
  input.value = "";
  save();
  renderHabits();
}

// ---------- SAVE ----------
function save() {
  localStorage.setItem("habitData", JSON.stringify(data));
}

// INITIAL LOAD
renderHabits();
