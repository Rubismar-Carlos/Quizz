// Declaraçao variaveis
const question = document.querySelector("#question");
const answersbox = document.querySelector("#answers-box");
const quizzcontainer = document.querySelector("#quizz-container");
const scorecontainer = document.querySelector("#score-container");
const letters = ["a", "b", "c", "d"];
let points = 0;
let actualQuestion = 0;

// Perguntas 

const questions = [
    {
        "question": "PHP foi desenvolvido para qual fim?",
        "answers" : [
            {
                "answer": "back-end",
                "correct": true
            },
            {
                "answer": "front-end",
                "correct": false
            },
            {
                "answer": "Sistema operacional",
                "correct": false
            },
            {
                "answer": "Banco de dados",
                "correct": false
            },
        ]
    },
    {
        "question": "Uma forma de declarar variável em JavaScript:",
        "answers" : [
            {
                "answer": "$var",
                "correct": false
            },
            {
                "answer": "var",
                "correct": true
            },
            {
                "answer": "@var",
                "correct": false
            },
            {
                "answer": "#let",
                "correct": false
            },
        ]
    },
    {
        "question": "Qual o seletor de ID no CSS?",
        "answers" : [
            {
                "answer": "#",
                "correct": true
            },
            {
                "answer": ".",
                "correct": false
            },
            {
                "answer": "@",
                "correct": false
            },
            {
                "answer": "/",
                "correct": false
            },
        ]
    }
]

// Substituiçao do quizz para a primeira pergunta

function init() {
    // vai criar a primeira pergunta
    createQuestion(0);
}

// Cria uma pergunta
function createQuestion(i){
    // limpar a questao anterior
    const oldButtons = answersbox.querySelectorAll("button");

    oldButtons.forEach(function(btn){
        btn.remove();
    })

    // Alterar o texto da pergunta
    const questionText = question.querySelector("#question-text");
    const questionNumber = question.querySelector("#question-number");

    questionText.textContent = questions[i].question;
    questionNumber.textContent = i + 1;

    // inserir as alternativas 
    questions[i].answers.forEach(function(answer, i) {
        // Cria o template do botao do quizz
        const answerTemplate = document.querySelector(".answer-template").cloneNode(true);

        const letterBtn = answerTemplate.querySelector(".btn-letter");
        const answerText = answerTemplate.querySelector(".question-answers");

        letterBtn.textContent = letters[i];
        answerText.textContent = answer['answer'];

        answerTemplate.setAttribute("correct-answer", answer["correct"]);

        // Remover hide  e template class
        answerTemplate.classList.remove("hide");
        answerTemplate.classList.remove("answer-template");

        // Inserir a alternativa na tela

        answersbox.appendChild(answerTemplate);

        //inserir um evento de click no botao
        answerTemplate.addEventListener("click", function() {
            checkAnswer(this);
        });
    });

    // Incrementar o numero da questao
    actualQuestion++;

}

// Verificando a resposta do usuario

function checkAnswer(btn) {
    
    // Seleciona todos os botoes
    const buttons = answersbox.querySelectorAll("button");

    // Verifica se a respota esta correta e adiciona classe aos botoes
    buttons.forEach(function(button) {

        if(button.getAttribute("correct-answer") === "true") {

            button.classList.add("correct-answer");

            // checa se o usuario acertou a pergunta
            if(btn === button) {
                // Adicionando pontos
                points++;
            }
        } else {

            button.classList.add("wrong-answer");

        }
    });

    // Exibir proxima pergunta
    nextQuestion();


}

// Exibe a proxima pergunta do quizz
function nextQuestion(){

    // timer para ver as respostas
    setTimeout(function() {

        // verifica se ainda há perguntas
        if(actualQuestion >= questions.length) {
            // Apresenta a msg de sucesso
            showSucccessMessage();
            return;
        }

        createQuestion(actualQuestion);

    }, 1500);

}

//Exibe a tela final

function showSucccessMessage(){

    hideOrShowQuizz();

    // trocar dados da tela de sucesso

    // calcula o score
    const score = ((points / questions.length) * 100).toFixed(2);
    const displayScore = document.querySelector("#display-score span");

    displayScore.textContent = score.toString();

    // Alterar o numero de perguntas corretas
    const correctAnswers = document.querySelector("#correct-answers");

    correctAnswers.textContent = points;

    /// Alterar o total de perguntas 
    const totalQuestions = document.querySelector("#questions-qty");

    totalQuestions.textContent = questions.length;

}

// Mostra ou esconde o score do quizz
function hideOrShowQuizz(){
    quizzcontainer.classList.toggle("hide");
    scorecontainer.classList.toggle("hide");
}

// Reiniciar Quizz
const restartBtn = document.querySelector("#restart");

restartBtn.addEventListener("click", function() {

    // Zerar o jogo
    actualQuestion = 0;
    points = 0;
    hideOrShowQuizz();
    init();
})

// Iniciar o Quizz
init();