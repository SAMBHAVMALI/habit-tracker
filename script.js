// ---------- DATE ----------
const today = new Date();
const dateText = today.toDateString();
document.getElementById("todayDate").innerText = dateText;

// ---------- STORAGE ----------
const STORAGE_KEY = "habit-data-v1";

let data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
  habits: [],
  logs: {}
};

const dayKey = today.toISOString().slice(0, 10);

// ---------- SAVE ----------
function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// ---------- RENDER ----------
function renderHabits() {
  const container = document.getElementById("habits");
  container.innerHTML = "";

  data.habits.forEach((habit) => {
    const status = data.logs[dayKey]?.[habit] ?? null;

    const div = document.createElement("div");
    div.className = "habit";

    div.innerHTML = `
      <div class="habit-name">${habit}</div>
      <div class="actions">
        <button class="done ${status === true ? "active" : ""}">Done</button>
        <button class="not-done ${status === false ? "active" : ""}">Not Done</button>
      </div>
    `;

    const [doneBtn, notDoneBtn] = div.querySelectorAll("button");

    doneBtn.onclick = () => setStatus(habit, true);
    notDoneBtn.onclick = () => setStatus(habit, false);

    container.appendChild(div);
  });
}

// ---------- SET STATUS ----------
function setStatus(habit, value) {
  if (!data.logs[dayKey]) data.logs[dayKey] = {};
  data.logs[dayKey][habit] = value;
  saveData();
  renderHabits();
}

// ---------- ADD HABIT ----------
document.getElementById("addBtn").onclick = () => {
  const input = document.getElementById("habitInput");
  const name = input.value.trim();

  if (!name) return;

  if (!data.habits.includes(name)) {
    data.habits.push(name);
    saveData();
    renderHabits();
  }

  input.value = "";
};

// ---------- INIT ----------
renderHabits();
