function fibFunction(index) {
  if (index < 2) return index;
  return fibFunction(index - 1) + fibFunction(index - 2);
}

const fibIndex = document.querySelector("#fib-index");
const fibNumber = document.querySelector("#fib-number");

fibNumber.innerText = fibFunction(9);
