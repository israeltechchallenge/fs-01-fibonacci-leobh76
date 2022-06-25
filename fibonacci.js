const fibInput = document.getElementById("form12");
const button = document.getElementById("button");
const fibNumber = document.querySelector("#fib-number");
const spinner = document.getElementById("spinner");
const error50 = document.getElementById("error-50");
const resultLog = document.getElementById("result-line");
const resultsSpinner = document.getElementById("spinner-results");

window.addEventListener("load", getResultsList);

function getResultsList() {
  resultsSpinner.classList.remove("d-none");
  fetch("http://localhost:5050/getFibonacciResults")
    .then((response) => response.json())
    .then((data) => {
      resultsSpinner.classList.add("d-none");
      let list = data.results;
      for (item of list) {
        let newLine = document.createElement("div");
        newLine.innerHTML = `The Fibonnaci of <b>${item.number}</b> is <b>${
          item.result
        }</b>. Calculated at: ${new Date(item.createdDate)}`;
        resultLog.appendChild(newLine);
        newLine.className = "mb-2 text-decoration-underline";
      }
    });
}

function getFibNumber() {
  const index = fibInput.value;

  if (index > 50) {
    /* if input is more than 50 */
    spinner.classList.remove("d-none");
    setTimeout(() => {
      spinner.classList.add("d-none");
      error50.classList.remove("d-none");
    }, 500);
  } else {
    /* if it is 50 or less */
    spinner.classList.remove("d-none");
    setTimeout(() => {
      spinner.classList.add("d-none");
    }, 500);
    fetch(`${"http://localhost:5050/fibonacci/"}${index}`)
      .then((response) => {
        if (!response.ok) {
          response.text().then((error) => {
            console.log("Server error:" + error);
            fibNumber.innerText = `Server Error: ${error}`;
            fibNumber.classList.add("text-danger");
          });
        } else {
          return response.json();
        }
      })
      .then((data) => {
        fibNumber.classList.remove("text-danger");
        const result = data.result;
        fibNumber.innerText = result;
      });
  }
}

fibInput.addEventListener("focus", clearInput);
button.addEventListener("click", getFibNumber);

// clear input when focused
function clearInput() {
  fibInput.value = null;
  fibNumber.innerText = null;
  error50.classList.add("d-none");
}
