// ---------- DATE ----------
const today = new Date();
const dateKey = today.toISOString().split("T")[0];
document.getElementById("date").innerText =
  today.toDateString();

// ---------- STORAGE ----------
let data = JSON.parse(localStorage.getItem("habitData")) || {
  habits: [],
  log: {}
};

if (!data.log[dateKey]) {
  data.log[dateKey] = {};
}

// ---------- ELEMENTS ----------
const habitInput = document.getElementById("habitInput");
const addBtn = document.getElementById("addHabit");
const habitList = document.getElementById("habitList");

// ---------- SAVE ----------
function save() {
  localStorage.setItem("habitData", JSON.stringify(data));
}

// ---------- ADD HABIT ----------
addBtn.onclick = () => {
  const name = habitInput.value.trim();
  if (!name || data.habits.includes(name)) return;

  data.habits.push(name);
  data.log[dateKey][name] = null;

  habitInput.value = "";
  save();
  render();
};

// ---------- RENDER ----------
function render() {
  habitList.innerHTML = "";

  data.habits.forEach(habit => {
    const status = data.log[dateKey][habit];

    const card = document.createElement("div");
    card.className = "habit-card";

    card.innerHTML = `
      <h3>${habit}</h3>
      <div class="buttons">
        <button class="done ${status === true ? "active" : ""}">Done</button>
        <button class="notdone ${status === false ? "active" : ""}">Not Done</button>
      </div>
    `;

    card.querySelector(".done").onclick = () => {
      data.log[dateKey][habit] = true;
      save();
      render();
    };

    card.querySelector(".notdone").onclick = () => {
      data.log[dateKey][habit] = false;
      save();
      render();
    };

    habitList.appendChild(card);
  });
}

render();
