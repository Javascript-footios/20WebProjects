const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

// const dummyTransactions = [
//   { id: 1, text: "Flower", amount: -20 },
//   { id: 2, text: "Salary", amount: 300 },
//   { id: 3, text: "Book", amount: -10 },
//   { id: 4, text: "Camera", amount: 150 },
// ];

const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);

let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

// Add transaction
// mine before watching
// function addTransaction(e) {
//   e.preventDefault();
//   const transactions = [];
//   const transaction = {
//     id: Math.floor(Math.random() * 100),
//     text: text.value,
//     amount: amount.value,
//   };
//   console.log(transactions);
//   transactions.push(transaction);
//   addTransactionDOM(transaction);
// }

function addTransaction(e) {
  e.preventDefault();
  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("Please enter text and amount!");
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value,
    };
    transactions.push(transaction);
    addTransactionDOM(transaction);
    updateValues();
    updateLocalStorage();

    text.value = "";
    amount.value = "";
  }

  // Generate random id
  function generateID() {
    return Math.floor(Math.random() * 100000000);
  }
}

// Add transactions to DOM list
function addTransactionDOM(transaction) {
  const sign = transaction.amount < 0 ? "-" : "+";
  const item = document.createElement("li");

  item.classList.add(`${transaction.amount < 0 ? "minus" : "plus"}`);

  item.innerHTML = ` ${transaction.text} 
            <span>${sign}${Math.abs(transaction.amount)}</span>
            <button class="delete-btn" onclick="removeTransaction(${
              transaction.id
            })">x</button>
  `;

  list.appendChild(item);
}

// Update the balance, income and expense
// what I've tried before watching...
// function updateValues() {
//   balance.innerHTML = "";
//   let sum = 0;
//   dummyTransactions.forEach((elem) => {
//     if (elem.amount < 0) sum = sum - Math.abs(elem.amount);
//     else sum = sum + Math.abs(elem.amount);
//   });
//   console.log(sum);
//   const sign = sum.amount < 0 ? "-" : "+";

//   balance.innerHTML = `<h1 id="balance">$${sign}${sum}</h1>`;
// }

function updateValues() {
  const amounts = transactions.map((elem) => elem.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  /* prettier-ignore */
  const expense =
      amounts
        .filter((item) => item < 0)
        .reduce((acc, item) => (acc -= item), 0) * -(1)
        .toFixed(2);
  console.log(total);
  balance.innerText = `$${total}`;
  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expense}`;
}

// Remove transaction by ID
function removeTransaction(id) {
  transactions = transactions.filter((item) => item.id !== id);
  updateLocalStorage();
  init();
}

// Update local storage transactions
function updateLocalStorage() {
  localStorage.setItem("transcactions", JSON.stringify(transactions));
}

// Init App
function init() {
  list.innerHTML = "";
  transactions.forEach(addTransactionDOM);
  updateValues();
}

init();

// Listeners
form.addEventListener("submit", addTransaction);
