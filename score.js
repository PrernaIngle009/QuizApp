const scoreValue = document.getElementById("scoreValue");
const totalQuestions = 50;
const totalAttempt = document.getElementById("totalAttempted");
const notAttempt = document.getElementById("notAttempted");
const restartBtn = document.getElementById("btn");
scoreValue.innerHTML = localStorage.getItem("totalScore");
totalAttempt.innerHTML = localStorage.getItem("totalAttempted");
notAttempt.innerHTML = localStorage.getItem("notAttempted");
restartBtn.addEventListener("click", () => {
  localStorage.removeItem("currentLang");
  localStorage.removeItem("currentQues");
  localStorage.removeItem("notAttempted");
  localStorage.removeItem("questCount");
  localStorage.removeItem("quizScore");
  localStorage.removeItem("totalAttempted");
  localStorage.removeItem("totalScore");
  window.location.href = "index.html";
});
