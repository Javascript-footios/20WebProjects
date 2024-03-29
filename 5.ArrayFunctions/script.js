const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// Fetch random user and add money
async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();
  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };
  addData(newUser);
}

// Add new obj to data array
function addData(obj) {
  data.push(obj);

  updateDOM();
}

// Display initially users
function updateDOM(providedData = data) {
  // Clear main div
  main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`;

  providedData.forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });

  // My first attempt to log a user in the DOM
  // const user = document.createElement("p");
  // const tag = document.createTextNode(data[0].name);
  // console.log(data);
  // user.appendChild(tag);
  // const elem = document.getElementById("main");
  // elem.appendChild(user);
}

// Format number as money
function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

// Double everyones money

// Double eveyones money
function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });

  // My naive solution
  // const newArr = data.map((user) => {
  //   const newUser = { ...user };
  //   newUser.money = user.money * 2;
  //   return newUser;
  // });
  // data = [];
  // data = [...newArr];
  updateDOM();
}

// Sort by richest
function sortByRichest() {
  data.sort((a, b) => b.money - a.money);
  updateDOM();
}

function showMillionaires() {
  data = data.filter((user) => user.money > 1000000);
  updateDOM();
}

function calculateWealth() {
  const result = data.reduce((acc, user) => acc + user.money, 0);

  const wealthEl = document.createElement("div");
  wealthEl.innerHTML = `<h3 class="total-wealth" >Total Wealth: <strong>${formatMoney(
    result
  )} </strong> </h3>`;
  main.appendChild(wealthEl);

  // Personal attempt
  // const element = document.createElement("div");
  // element.innerHTML = `<span>${formatMoney(result)}</span>`;
  // main.appendChild(element);
}

// Event Listeners
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByRichest);
showMillionairesBtn.addEventListener("click", showMillionaires);
calculateWealthBtn.addEventListener("click", calculateWealth);
