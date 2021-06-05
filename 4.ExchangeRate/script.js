const currencyEl_one = document.getElementById("currency-one");
const currencyEl_two = document.getElementById("currency-two");
const amountEl_one = document.getElementById("amount-one");
const amountEl_two = document.getElementById("amount-two");
const rateEl = document.getElementById("rate");
const swap = document.getElementById("swap");

// Fetch exchange rates and update the DOM
function calculate() {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;

  fetch(
    `https://v6.exchangerate-api.com/v6/8c0badfc242721d67b8caca9/latest/${currency_one}`
  )
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      const rate = data.conversion_rates[currency_two];
      console.log(rate);

      rateEl.innerHTML = `1 ${currency_one} = ${rate} ${currency_two}`;

      amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
    });

  // Expain what fetch does:
  // fetch("items.json"{
  //   method: postMessage,
  //   headers: {
  //     "Content-Type: application/json"
  //   }
  // })
  // fetch("items.json")
  //   .then((res) => res.json())
  //   .then((data) => console.log(data));
}

// Event Listeners
currencyEl_one.addEventListener("change", calculate);
amountEl_one.addEventListener("input", calculate);
currencyEl_two.addEventListener("change", calculate);
amountEl_two.addEventListener("input", calculate);

swap.addEventListener("click", () => {
  [currencyEl_one.value, currencyEl_two.value] = [
    currencyEl_two.value,
    currencyEl_one.value,
  ];
  calculate();
});
calculate();
