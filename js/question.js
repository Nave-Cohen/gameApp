function checkAnswer(button) {
  var answer = button.innerText;

  if (answer === "Paris") {
    alert("Correct answer! Paris is the capital of France.");
  } else {
    alert("Sorry, that is incorrect. Please try again.");
  }
}
