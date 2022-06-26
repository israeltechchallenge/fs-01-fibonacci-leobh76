// Variables:
const fibInput = document.getElementById("form12");
const buttonLocal = document.getElementById("button-local");
const buttonServer = document.getElementById("button-server");
const fibNumber = document.querySelector("#fib-number");
const spinner = document.getElementById("spinner");
const error50 = document.getElementById("error-50");
const resultLog = document.getElementById("result-line");
const resultsSpinner = document.getElementById("spinner-results");
const checkBox = document.getElementById("flexCheckDefault");
const error00 = document.getElementById("error-00");

// Event listeners:
window.addEventListener("load", getResultsList);

fibInput.addEventListener("focus", clearInput);

buttonServer.addEventListener("click", getFibNumber);

buttonLocal.addEventListener("click", () => {
  spinner.classList.remove("d-none");
  setTimeout(() => {
    spinner.classList.add("d-none");
    fibNumber.innerText = fibFunction(parseInt(fibInput.value));
  }, 200);
});

// Swapping between local and server buttons
checkBox.addEventListener("change", () => {
  if (checkBox.checked) {
    // hide the local button
    buttonLocal.classList.add("d-none");
    buttonServer.classList.remove("d-none");
  } else if (!checkBox.checked) {
    // hide the server button
    buttonLocal.classList.remove("d-none");
    buttonServer.classList.add("d-none");
  }
});

// Function to calculate the Fibonacci number LOCALLY:
function fibFunction(n) {
  if (n < 0) {
    error00.classList.remove("d-none");
    fibNumber.classList.add("d-none");
  } else if (n < 2) {
    error00.classList.add("d-none");
    return n;
  } else if (n > 50) {
    error00.classList.add("d-none");
    error50.classList.remove("d-none");
    fibNumber.classList.add("d-none");
  } else {
    error00.classList.add("d-none");
    fibNumber.classList.remove("d-none");
    return fibFunction(n - 1) + fibFunction(n - 2);
  }
}

// Function to calculate the Fibonacci number ON THE SERVER:
function getFibNumber() {
  const index = fibInput.value;
  if (index > 50) {
    // if input is more than 50
    spinner.classList.remove("d-none");
    setTimeout(() => {
      spinner.classList.add("d-none");
      error50.classList.remove("d-none");
    }, 500);
  } else {
    // if it is 50 or less
    spinner.classList.remove("d-none");
    fetch(`${"http://localhost:5050/fibonacci/"}${index}`)
      .then((response) => {
        if (!response.ok) {
          response.text().then((error) => {
            console.log("Server error:" + error);
            fibNumber.innerText = `Server Error: ${error}`;
            fibNumber.classList.add("text-danger");
            fibNumber.classList.remove("d-none");
            spinner.classList.add("d-none");
          });
        } else {
          return response.json();
        }
      })
      .then((data) => {
        fibNumber.classList.remove("text-danger");
        const result = data.result;
        fibNumber.innerText = result;
        spinner.classList.add("d-none");
      });
  }
}

// Function to clear input when focused:
function clearInput() {
  fibInput.value = null;
  fibNumber.innerText = null;
  error50.classList.add("d-none");
  error00.classList.add("d-none");
}

// Function for the results list:
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
