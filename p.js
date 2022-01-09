const tabs = document.querySelector(".tab-list");
const card = document.querySelectorAll(".card--info");
const current = document.querySelectorAll(".current");
const previous = document.querySelectorAll(".previous");
let userData = [];
let defaultTab = localStorage.getItem("tabValue") || "daily";

window.onload = loadData;

async function loadData() {
  await fetchData();
  tabs
    .querySelectorAll("button")
    .forEach(
      (e) =>
        e.innerText.toLowerCase() === defaultTab &&
        e.setAttribute("aria-selected", true)
    );

  render(userData);
}

async function fetchData() {
  const data = await fetch("data.json");
  const resp = await data.json();
  userData = [...resp];
  return resp;
}

function changeTab(ev) {
  if (!ev.target.matches("button")) return;
  for (let tab of tabs.children) {
    tab.setAttribute("aria-selected", false);
  }
  ev.target.setAttribute("aria-selected", true);
  defaultTab = ev.target.innerText.toLowerCase();
  saveToLs();
  render(userData);
}

tabs.addEventListener("click", changeTab);

function render(arr) {
  arr.map((e, i) => {
    const { title, timeframes } = e;
    current[i].innerText = `${timeframes[defaultTab].current}hrs`;
    previous[i].innerText = `${str(defaultTab)} - ${
      timeframes[defaultTab].previous
    }hrs`;
  });
}

function str(tab) {
  switch (tab.toLowerCase()) {
    case "daily":
      return "Yesterday";
    case "weekly":
      return "Last Week";
    case "monthly":
      return "Last Month";
  }
}

function saveToLs() {
  localStorage.setItem("tabValue", defaultTab);
}
