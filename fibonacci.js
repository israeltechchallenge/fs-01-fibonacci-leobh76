const fibInput = document.getElementById("form12");
const button = document.getElementById("button");
const fibNumber = document.querySelector("#fib-number");
const spinner = document.getElementById("spinner");
const error50 = document.getElementById("error-50");
const error42 = document.getElementById("error-42");

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
            fibNumber.innerText = error;
          });
        } else {
          return response.json();
        }
      })
      .then((data) => {
        const result = data.result;
        fibNumber.innerText = result;
      });
  }
}

// event listeners for the button
fibInput.addEventListener("focus", clearInput);
button.addEventListener("click", getFibNumber);

// function to clear input when focusing it again
function clearInput() {
  fibInput.value = null;
  fibNumber.innerText = null;
  error50.classList.add("d-none");
}
