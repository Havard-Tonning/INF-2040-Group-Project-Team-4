<!-- 
file name: report.md
name: Kamen Georgiev
date: 04/21/2023
-->

<h1>Trivia Game Report</h1>

<p>The program uses HTML, CSS and JavaScript.</p>

<h2>How it works</h2>
<p>The user starts the game by pressing the Start button. The user has to answer 6 questions. Every correct answer increments the user's score by 10, wrong answers do not change the score. After the sixth question the game has to be restarted by a means of a button. Maximum achievable score is 60. </p>
<h2>References</h2>
<p>The Trivia Game was built upon an existing project on CodePen by Web Dev Simplified - https://codepen.io/WebDevSimplified/pen/xNvaaz. Much of the HTML and JavaScript code in the game is from the above project. 
</p>

<h2>HTML</h2>
<p>The container class, hide class and controls for the game is borrowed from the existing project referenced above. <br>
The score class was added by me and implemented into the existing HTML code.
</p>

<h2>CSS</h2>
<p>A large portion of the CSS is from the existing project with most of the values in the code being changed in the process. The box class for the .score-box was implemented by me to style the HTML score box </p>

<h2>JavaScript</h2>
<p>The basis of the JavaScript is from the existing project. The declaration of the variables is own code. The content of the const questions is my own. The init(), startGame(), setNextQuestion(), resetState(), selectAnswer(), setStatusClass(), clearStatusClass() functions are from the existing project. The displayScore is added code, also a few lines were embedded in setStatusClass(), init(), startGame(), selectAnswer() for the scoring system to work properly and icrement the user's score by 10 upon a corrent answer and reset score to 0 with the start of a new game. </p>

<h2>Limitations</h2>
<p>The scoring system works, but the score is incremented every time the user answers a question no matter if the answer is right or wrong, corrected by decreasing the score by 10 in selectAnswer() function, which could be an issues. 
Also the user may click the correct answer as many times as they want to increment their score by 10 several times in a single question. </p>