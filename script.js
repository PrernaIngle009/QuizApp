let quizData = {};
let quizScore = parseInt(localStorage.getItem("quizScore")) || 0;
let currentQues = parseInt(localStorage.getItem("currentQues")) || 0;
let questCount = parseInt(localStorage.getItem("questCount")) || 0;
let totalAttempted = parseInt(localStorage.getItem("totalAttempted")) || 0;
let notAttempted = parseInt(localStorage.getItem("notAttempted")) || 0;
const btns = document.querySelectorAll(".btn");
const submitBtn = document.querySelector(".btn-submit");
const prevBtn = document.getElementById("prevbtn");
const nextBtn = document.getElementById("nextbtn");
const endBtn = document.getElementById("endBtn");
if (document.querySelector(".quiz-container")) {
  const currentLang = localStorage.getItem("currentLang");
  fetch("quiz.json")
    .then((res) => res.json())
    .then((data) => {
      quizData = data;
      loadData(currentLang);
      if (submitBtn) {
        submitBtn.addEventListener("click", () => {
          const selected = selectOption();
          if (selected !== -1) {
            totalAttempted++;
            const optionlist = document.querySelectorAll(".options-list li");
            const selectLi = optionlist[selected];
            const correctAns = quizData[currentLang][currentQues].correct;
            const correctli = optionlist[correctAns];
            if (selected == correctAns) {
              selectLi.classList.add("correct");
              quizScore++;
            } else {
              selectLi.classList.add("wrong");
              correctli.classList.add("correct");
            }
            document
              .querySelectorAll("input[name='answer']")
              .forEach((radio) => {
                radio.disabled = true;
              });
            localStorage.setItem("quizScore", quizScore);
            localStorage.setItem("totalAttempted", totalAttempted);
            setTimeout(() => {
              currentQues++;
              questCount++;
              selectLi.classList.remove("wrong", "correct");
              correctli.classList.remove("correct");
              document
                .querySelectorAll("input[name='answer']")
                .forEach((radio) => {
                  radio.checked = false;
                  radio.disabled = false;
                });
              loadData(currentLang);
            }, 3000);
          }
        });
      }
      if (prevBtn) {
        prevBtn.addEventListener("click", () => {
          if (currentQues > 0) {
            currentQues--;
            questCount--;
            loadData(currentLang);
          }
        });
      }
      if (nextBtn) {
        nextBtn.addEventListener("click", () => {
          currentQues++;
          questCount++;
          loadData(currentLang);
        });
      }
      if (endBtn) {
        endBtn.addEventListener("click", () => {
          localStorage.setItem("totalScore", quizScore);
          localStorage.setItem("totalAttempted", totalAttempted);
          localStorage.setItem("notAttempted", 50 - totalAttempted);
          window.location.href = "score.html";
        });
      }
    });
}
function loadData(lang) {
  localStorage.setItem("currentQues", currentQues);
  localStorage.setItem("questCount", questCount);
  const languageQuest = quizData[lang];
  if (!languageQuest || currentQues >= languageQuest.length) {
    localStorage.setItem("quizScore", quizScore);
    localStorage.setItem("totalQuestions", totalQuestions);
    localStorage.setItem("totalAttempted", totalAttempted);
    window.location.href = "score.html";
    return;
  }
  const { question, options } = languageQuest[currentQues];
  document.querySelector("#question").innerHTML = `Q${
    questCount + 1
  }. ${question}`;
  const answerElems = document.querySelectorAll(".answer");
  options.forEach((opt, i) => {
    if (answerElems[i]) {
      answerElems[i].innerHTML = opt;
    }
  });
}

function selectOption() {
  const radios = document.querySelectorAll("input[name='answer']");
  let optionIndex = -1; //because option's starts from 0
  radios.forEach((radio, i) => {
    if (radio.checked) {
      optionIndex = i;
    }
  });
  return optionIndex;
}
