const fibInput = document.getElementById("form12");
const button = document.getElementById("button");
const fibNumber = document.querySelector("#fib-number");
const spinner = document.getElementById("spinner");
const error42 = document.getElementById("error-42");
const error50 = document.getElementById("error-50");

function getFibNumber() {
  const index = fibInput.value;

  if (index === 42) {
    error42.classList.remove("d-none");
  } else if (index > 50) {
    error50.classList.remove("d-none");
  } else if (index <= 50) {
    fetch(`${"http://localhost:5050/fibonacci/"}${index}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const result = data.result;
        fibNumber.innerText = result;
      });
  }
}

button.addEventListener("click", getFibNumber);
