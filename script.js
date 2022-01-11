let nav = 0;
let nav2 = 0;
let clicked = null;
let events;
// events = localStorage.getItem("events")
//   ? JSON.parse(localStorage.getItem("events"))
//   : [];
const calendar = document.querySelector(".calendar");
const calendarMini = document.querySelector(".calendar_mini");
const monthDisplay = document.querySelector(".monthDisplay");
const monthDisplayMini = document.querySelector(".monthDisplay_mini");
const monthDisplayEvent = document.querySelector(".job__daytime");
const jobContainer = document.querySelector(".job__container");
const monthButton = document.getElementById("monthButton");
const monthSelector = document.querySelector(".month_selector");
const eventModal = document.querySelector(".eventModal");
const overlay = document.querySelector(".overlay");
const viewAllButton = document.getElementById("viewAllButton");
const buttonCloseModal = document.querySelector(".btn--close-modal");
const evenModalContainer = document.querySelector(".eventModal__container");
const eventModalHeader = document.querySelector(".evenModal__header__text");

const fakeData1 = [
  {
    date: "1/1/2022",
    event: [
      {
        type: "appointment",
        code: "123456789",
        title: "Hop lop 123321323231",
        time: "9 AM - 9:30 AM GMT+8",
        clAvatarUrl: "",
        clProfileUrl: "",
        zoomUrl: "",
      },
      {
        type: "event",
        code: "12345678",
        title: "Di choi voi cong ty",
        time: "9 AM - 9:30 AM GMT+8",
      },
    ],
  },
  {
    date: "10/1/2022",
    event: [
      {
        type: "appointment",
        code: "123456789",
        title: "Hop lop 123321323231",
        time: "9 AM - 9:30 AM GMT+8",
        clAvatarUrl: "",
        clProfileUrl: "",
        zoomUrl: "",
      },
      {
        type: "appointment",
        code: "123456789",
        title: "Hop lop 123321323231",
        time: "9 AM - 9:30 AM GMT+8",
        clAvatarUrl: "",
        clProfileUrl: "",
        zoomUrl: "",
      },
      {
        type: "event",
        code: "1234567",
        title: "Giao luu cung doi tac",
        time: "9 AM - 9:30 AM GMT+8",
      },
    ],
  },
  {
    date: "20/1/2022",
    event: [
      {
        type: "appointment",
        code: "123",
        title: "TEST",
        time: "9 AM - 9:30 AM GMT+8",
        clAvatarUrl: "",
        clProfileUrl: "",
        zoomUrl: "",
      },
    ],
  },
  {
    date: "23/1/2022",
    event: [
      {
        type: "appointment",
        code: "1234",
        title: "Gap doi tac",
        time: "9 AM - 9:30 AM GMT+8",
        clAvatarUrl: "",
        clProfileUrl: "",
        zoomUrl: "",
      },
    ],
  },
  {
    date: "29/1/2022",
    event: [
      {
        type: "appointment",
        code: "12345",
        title: "Gap cap tren",
        time: "9 AM - 9:30 AM GMT+8",
        clAvatarUrl: "",
        clProfileUrl: "",
        zoomUrl: "",
      },
      {
        type: "appointment",
        code: "12345611111",
        title: "Gap sep",
        time: "9 AM - 9:30 AM GMT+8",
        clAvatarUrl: "",
        clProfileUrl: "",
        zoomUrl: "",
      },
    ],
  },
];

localStorage.setItem("fakeData1", JSON.stringify(fakeData1));
const fakeData = JSON.parse(localStorage.getItem("fakeData1"));
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Friday",
  "Saturday",
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function starter() {}

function load() {
  const dt = new Date();

  if (nav !== 0) {
    dt.setMonth(new Date().getMonth() + nav);
  }

  const day = dt.getDate();
  const month = dt.getMonth();
  const year = dt.getFullYear();
  const daysInPreviousMonth = new Date(year, month, 0).getDate();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const paddingPreviousDays = new Date(year, month, 1).getDay();
  const paddingNextDays = 6 - new Date(year, month + 1, 0).getDay();
  monthDisplay.innerText = `${dt.toLocaleDateString("en-us", {
    month: "long",
  })} ${year}`;
  calendar.innerText = "";
  // d/m/yyyy

  for (
    let i = 1;
    i <= paddingPreviousDays + daysInMonth + paddingNextDays;
    i++
  ) {
    const daySquare = document.createElement("div");
    // const todaySquare = document.createElement("div");
    daySquare.classList.add("day");
    if (i <= paddingPreviousDays) {
      daySquare.innerText = daysInPreviousMonth - paddingPreviousDays + i;
      daySquare.classList.add("padding");
      daySquare.addEventListener("click", () => {
        nav--;
        load();
      });
    }
    if (i > paddingPreviousDays && i <= paddingPreviousDays + daysInMonth) {
      if (i === paddingPreviousDays + day && nav === 0) {
        daySquare.innerHTML = `<span class="today today__active">${
          i - paddingPreviousDays
        }</span>`;
      } else {
        daySquare.innerText = i - paddingPreviousDays;
      }
      const dateToCheck = `${i - paddingPreviousDays}/${month + 1}/${year}`;
      const dataOfThisDay = fakeData.find((e) => e.date === dateToCheck);
      if (dataOfThisDay) {
        console.log(dataOfThisDay);
        daySquare.classList.add(`event`);
        daySquare.classList.add(
          `${i - paddingPreviousDays}/${month + 1}/${year}`
        );
        let markup = dataOfThisDay.event
          .filter((data, i) => i < 2)
          .map(
            (data) =>
              `<div class="calendar__event__title ${
                data.type === "event" ? "modal__event" : ""
              }"> ${data.title} </div>`
          )
          .join("");
        if (dataOfThisDay.event.length > 2) {
          markup += `<div class="more"> ${
            dataOfThisDay.event.length - 2
          } more <div>`;
        }
        daySquare.insertAdjacentHTML("beforeend", markup);
      }

      // daySquare.addEventListener("click", () => console.log("Add Task"));
    }
    if (i > paddingPreviousDays + daysInMonth) {
      daySquare.innerText = i - daysInMonth - paddingPreviousDays;
      daySquare.classList.add("padding");
      daySquare.addEventListener("click", () => {
        nav++;
        load();
      });
    }

    calendar.appendChild(daySquare);
  }
}

function loadMiniCalendar() {
  const dt = new Date();

  if (nav2 !== 0) {
    dt.setMonth(new Date().getMonth() + nav2);
  }

  const day = dt.getDate();
  const month = dt.getMonth();
  const year = dt.getFullYear();
  const daysInPreviousMonth = new Date(year, month, 0).getDate();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const paddingPreviousDays = new Date(year, month, 1).getDay();
  const paddingNextDays = 6 - new Date(year, month + 1, 0).getDay();
  monthDisplayMini.innerText = `${dt.toLocaleDateString("en-us", {
    month: "short",
  })} ${year}`;
  calendarMini.innerText = "";
  for (
    let i = 1;
    i <= paddingPreviousDays + daysInMonth + paddingNextDays;
    i++
  ) {
    const daySquare = document.createElement("div");
    daySquare.classList.add("day__mini");
    if (i <= paddingPreviousDays) {
      daySquare.innerText = daysInPreviousMonth - paddingPreviousDays + i;
      daySquare.classList.add("padding");
      daySquare.addEventListener("click", () => {
        nav2--;
        loadMiniCalendar();
      });
    }
    if (i > paddingPreviousDays && i <= paddingPreviousDays + daysInMonth) {
      daySquare.innerText = i - paddingPreviousDays;
      daySquare.addEventListener("click", () => console.log("Add Task"));
      if (i === paddingPreviousDays + day && nav2 === 0) {
        daySquare.classList.add("today__active");
      }
    }
    if (i > paddingPreviousDays + daysInMonth) {
      daySquare.innerText = i - daysInMonth - paddingPreviousDays;
      daySquare.classList.add("padding");
      daySquare.addEventListener("click", () => {
        nav2++;
        loadMiniCalendar();
      });
    }

    calendarMini.appendChild(daySquare);
  }
}

function loadUpcomingEvent() {
  loadEvent();
  loadUpcomingEventContainer();
}

function loadUpcomingEventContainer() {
  const codeExist = [];
  let markup = fakeData
    .map((ev) =>
      ev.event
        .map(function (miniEvent) {
          if (codeExist.length > 2) return; // 3 event display ob upcommingEvents
          if (codeExist.some((code) => code === miniEvent.code)) return;
          else {
            codeExist.push(miniEvent.code);
            return `
      <div class="modal ${miniEvent.type === "event" ? "modal__event" : ""}">
      <div>
        <div class="modal__event__title"> ${miniEvent.title}</div>
        <div class="modal__event__time ${
          miniEvent.type === "event" ? "time__event" : ""
        }"> ${miniEvent.time}</div>
        ${
          miniEvent.type === "appointment"
            ? `<div class="modal__event__client">
        <img class="avatar__img" src="img/img-1.jpg" alt="avatar" />
        <div class="modal__event_client__text" href="#">
          View Client Profile
        </div>
      </div>`
            : ""
        }
      </div>
      ${
        miniEvent.type === "appointment"
          ? `<img
      class="zoomIcon"
      src="img/zoom_logo_icon_188426.png"
      rel="zoomIcon"
    />`
          : ""
      }
      
    </div>
  `;
          }
        })
        .join("")
    )
    .join("");

  jobContainer.insertAdjacentHTML("beforeend", markup);
}

function loadFullUpcomingEventContainer() {
  eventModalHeader.innerHTML = "Upcoming Events";
  const codeExist = [];
  let markup = fakeData
    .map((ev) =>
      ev.event
        .map(function (miniEvent) {
          if (codeExist.some((code) => code === miniEvent.code)) return;
          else {
            codeExist.push(miniEvent.code);
            return `
      <div class="modal ${miniEvent.type === "event" ? "modal__event" : ""}">
      <div>
        <div class="modal__event__title"> ${miniEvent.title}</div>
        <div class="modal__event__time ${
          miniEvent.type === "event" ? "time__event" : ""
        }"> ${miniEvent.time}</div>
        ${
          miniEvent.type === "appointment"
            ? `<div class="modal__event__client">
        <img class="avatar__img" src="img/img-1.jpg" alt="avatar" />
        <div class="modal__event_client__text" href="#">
          View Client Profile
        </div>
      </div>`
            : ""
        }
      </div>
      ${
        miniEvent.type === "appointment"
          ? `<img
      class="zoomIcon"
      src="img/zoom_logo_icon_188426.png"
      rel="zoomIcon"
    />`
          : ""
      }
      
    </div>
  `;
          }
        })
        .join("")
    )
    .join("");

  evenModalContainer.insertAdjacentHTML("beforeend", markup);
}

function loadEventOfDay(day) {
  eventModalHeader.innerHTML = `${day.date} Events`;
  let markup = day.event
    .map(function (miniEvent) {
      return `
      <div class="modal ${miniEvent.type === "event" ? "modal__event" : ""}">
      <div>
        <div class="modal__event__title"> ${miniEvent.title}</div>
        <div class="modal__event__time ${
          miniEvent.type === "event" ? "time__event" : ""
        }"> ${miniEvent.time}</div>
        ${
          miniEvent.type === "appointment"
            ? `<div class="modal__event__client">
        <img class="avatar__img" src="img/img-1.jpg" alt="avatar" />
        <div class="modal__event_client__text" href="#">
          View Client Profile
        </div>
      </div>`
            : ""
        }
      </div>
      ${
        miniEvent.type === "appointment"
          ? `<img
      class="zoomIcon"
      src="img/zoom_logo_icon_188426.png"
      rel="zoomIcon"
    />`
          : ""
      }
      
    </div>
  `;
    })
    .join("");

  evenModalContainer.insertAdjacentHTML("beforeend", markup);
}

function loadEvent() {
  const dt = new Date();
  const day = dt.getDate();
  monthDisplayEvent.innerText = `Today, ${day} ${dt.toLocaleDateString(
    "en-us",
    {
      month: "short",
    }
  )} `;
}

function initButton() {
  //calendar
  document.getElementById("nextButton").addEventListener("click", () => {
    nav++;
    load();
  });
  document.getElementById("backButton").addEventListener("click", () => {
    nav--;
    load();
  });
  document.getElementById("todayButton").addEventListener("click", () => {
    nav = 0;
    load();
  });
  monthSelector.addEventListener("click", (e) => {
    const target = e.target.innerHTML;
    const monthTarget = months.findIndex((mon) => mon == target);
    const monthNew = new Date();
    monthNew.setMonth(new Date().getMonth() + nav);
    nav += monthTarget - monthNew.getMonth();
    monthSelector.classList.add("hidden");
    load();
  });
  //Mini Calendar
  document.getElementById("nextButton_mini").addEventListener("click", () => {
    nav2++;
    loadMiniCalendar();
  });
  document.getElementById("backButton_mini").addEventListener("click", () => {
    nav2--;
    loadMiniCalendar();
  });

  // effect for month selector
  monthButton.addEventListener("mouseenter", () =>
    monthSelector.classList.remove("hidden")
  );
  monthButton.addEventListener("mouseleave", () =>
    monthSelector.classList.add("hidden")
  );
  monthSelector.addEventListener("mouseenter", () =>
    monthSelector.classList.remove("hidden")
  );
  monthSelector.addEventListener("mouseleave", () =>
    monthSelector.classList.add("hidden")
  );

  //eventModal
  viewAllButton.addEventListener("click", () => {
    eventModal.classList.remove("hidden");
    overlay.classList.remove("hidden");
    loadFullUpcomingEventContainer();
  });
  buttonCloseModal.addEventListener("click", () => {
    evenModalContainer.innerHTML = "";
    eventModal.classList.add("hidden");
    overlay.classList.add("hidden");
  });
  overlay.addEventListener("click", () => {
    evenModalContainer.innerHTML = "";
    eventModal.classList.add("hidden");
    overlay.classList.add("hidden");
  });

  //get event from day
  document
    .querySelector(".calendar_container")
    .addEventListener("click", function (e) {
      e.preventDefault();
      const target = e.target.closest(".day")?.classList[2];
      if (target) {
        const dataOfDay = fakeData.find((event) => event.date === target);
        loadEventOfDay(dataOfDay);
        eventModal.classList.remove("hidden");
        overlay.classList.remove("hidden");
      }
    });
}

initButton();
loadMiniCalendar();
loadUpcomingEvent();
load();
