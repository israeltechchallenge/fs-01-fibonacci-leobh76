const fibInput = document.getElementById("form12");
const button = document.getElementById("button");
const fibNumber = document.querySelector("#fib-number");

function getFibNumber() {
  const index = fibInput.value;

  fetch(`${"http://localhost:5050/fibonacci/"}${index}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const result = data.result;
      fibNumber.innerText = result;
    });
}

button.addEventListener("click", getFibNumber);