const fibInput = document.querySelector("#form12");
const button = document.querySelector("#button");
const fibNumber = document.querySelector("#fib-number");

function fibFunction(n) {
  if (n < 2) {
    return n;
  } else return fibFunction(n - 1) + fibFunction(n - 2);
}

button.addEventListener("click", () => {
  fibNumber.innerText = fibFunction(parseInt(fibInput.value));
});