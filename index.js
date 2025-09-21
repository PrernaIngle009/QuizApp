let quizData = {};
const btns = document.querySelectorAll(".btn");

fetch("quiz.json")
  .then((res) => res.json())
  .then((data) => {
    quizData = data;
  });
btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    currentLang = btn.getAttribute("data-lang");
    localStorage.setItem("currentLang", currentLang);
    window.location.href = "quizPage.html";
    currentQues = 0;
    loadData();
  });
});
