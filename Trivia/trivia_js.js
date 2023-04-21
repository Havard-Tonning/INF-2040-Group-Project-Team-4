window.addEventListener("DOMContentLoaded",init);
        let startButton = null;
        let nextButton = null;
        let questionContainerElement = null;
        let questionElement = null;
        let answerButtonsElement = null;
        let score = null;
        let playerScore = 0;
        let shuffledQuestions, currentQuestionIndex;
        
const questions = [
  {
    question: 'What is the capital of Bulgaria?',
    answers: [
      { text: 'Blagoevgrad', correct: false },
      { text: 'Sofia', correct: true },
      { text: 'Plovdiv', correct: false },
      { text: 'Sunny Beach', correct: false }
    ]
  },
  {
    question: 'What year was the first recipe for liutenitsa made',
    answers: [
      { text: '1902', correct: false },
      { text: '1765', correct: false },
      { text: '1937', correct: true },
      { text: '2001', correct: false }
    ]
  },
  {
    question: 'What is 2 + 2?',
    answers: [
      { text: '5', correct: false },
      { text: 'Not 5', correct: true },
      { text: '5 - 2', correct: false },
      { text: '4.323',correct: false }
    ]
  },
  {
    question: 'How many styles of beer are there in the world?',
    answers: [
      { text: '20', correct: false },
      { text: 'more than 3000', correct: false },
      { text: 'more than 100', correct: true },
      { text: 'more than 300', correct: false }
    ]
  },
   {
    question: 'How many Formula 1 tracks are there for season 2023?',
    answers: [
      { text: '20', correct: false },
      { text: '25', correct: false },
      { text: '23', correct: true },
      { text: '31', correct: false }
    ]
  },
  {
    question: 'How many states are there in the EU as of 2023?',
    answers: [
      { text: '27', correct: true },
      { text: '28', correct: false },
      { text: '32', correct: false },
      { text: '22', correct: false }
    ]
  },
] 

        function init(){
            startButton = document.getElementById('start-btn');
            nextButton = document.getElementById('next-btn');
            questionContainerElement = document.getElementById('question-container');
            questionElement = document.getElementById('question');
            answerButtonsElement = document.getElementById('answer-buttons');
            score = document.getElementById("score")
            playerScore = 0;
            displayScore();;
            startButton.addEventListener('click', startGame)
            nextButton.addEventListener('click', () => {
                currentQuestionIndex++
                setNextQuestion()
            })
        } // function code borrowed
              

        function startGame() {
          startButton.classList.add('hide');
          shuffledQuestions = questions.sort(() => Math.random() - .5);
          currentQuestionIndex = 0;
          questionContainerElement.classList.remove('hide');
          setNextQuestion();
          playerScore = 0 // set score to 0 everytime the game starts
          displayScore();
        }
        function displayScore(){
            score.textContent = "SCORE:" + playerScore; 
        }
        function setNextQuestion() {
          resetState();
          showQuestion(shuffledQuestions[currentQuestionIndex]);
        }

        function showQuestion(question) {
          questionElement.innerText = question.question
          question.answers.forEach(answer => {
            const button = document.createElement('button')
            button.innerText = answer.text
            button.classList.add('btn')
            if (answer.correct) {
              button.dataset.correct = answer.correct

            }
            button.addEventListener('click', selectAnswer)
            answerButtonsElement.appendChild(button)
          })
        } // function code borrowed

        function resetState() {
          clearStatusClass(document.body)
          nextButton.classList.add('hide')
          while (answerButtonsElement.firstChild) {
            answerButtonsElement.removeChild(answerButtonsElement.firstChild)
          }
        } // function code borrowed

        function selectAnswer(e) {
          const selectedButton = e.target
          const correct = selectedButton.dataset.correct
          setStatusClass(document.body, correct); // adding 10 points even when the answer is wrong
         playerScore-=10; // decrease score by 10 to correct the above issue
          Array.from(answerButtonsElement.children).forEach(button => {
            setStatusClass(button, button.dataset.correct)
          })
          if (shuffledQuestions.length > currentQuestionIndex + 1) {
            nextButton.classList.remove('hide')
          } else {
            startButton.innerText = 'Restart'
            startButton.classList.remove('hide')
          } // restart game once all the questions have passed and treat the score as if a new game has started (set to 0)
        }

        function setStatusClass(element, correct) {
          clearStatusClass(element)
          if (correct) {
            element.classList.add('correct')
            playerScore += 10;
           // 10 points upon correct answer
           
          } else {
            element.classList.add('wrong')         
          }
          
          displayScore();
        }

        function clearStatusClass(element) {
          element.classList.remove('correct')
          element.classList.remove('wrong')
        } // function code borrowed
