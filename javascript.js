const map = L.map("map").setView([41.326518, 19.820487], 16);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

const marker = L.marker([41.326518, 19.820487]).addTo(map);

let index = 0;
const days = [];
const months = [
  "Janar",
  "Shkurt",
  "Mars",
  "Prill",
  "Maj",
  "Qershor",
  "Korrik",
  "Gusht",
  "Shtator",
  "Tetor",
  "Nentor",
  "Dhjetor",
];
const today = new Date();
const window_len = 20;
const windows = 3;
for (let i = 1; i <= 60; ++i) {
  let next = new Date();
  next.setDate(today.getDate() + i);
  days.push(next);
}

document.addEventListener("DOMContentLoaded", () => draw_calendar_view());
document.getElementById("next").addEventListener("mousedown", () => {
  index = (index + 1) % windows;

  draw_calendar_view();
});
document.getElementById("prev").addEventListener("mousedown", () => {
  if (index === 0) {
    index = windows;
  }
  index = (index - 1) % windows;

  draw_calendar_view();
});

document
  .getElementById("exampleModal")
  .addEventListener("show.bs.modal", (event) => {
    // Button that triggered the modal
    const button = event.relatedTarget;
    // Extract info from data-bs-* attributes
    const data = button.getAttribute("data-bs-whatever");
    // If necessary, you could initiate an Ajax request here
    // and then do the updating in a callback.

    document.getElementById("modal-date").innerText = data;
  });

function draw_calendar_view() {
  let calendar_nav = document.getElementById("calendar-content");
  let content = "";
  for (let i = 0; i < window_len; ++i) {
    let date = days[index * window_len + i];
    let day = date.getDate();
    let month = months[date.getMonth()];
    content += `
        <div
            class="date-box"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            data-bs-whatever="${day} ${month}"
        >
          <span class="month">${month}</span>
          <span class="date">${day}</span>
        </div>
        `;
  }

  calendar_nav.innerHTML = content;
}
