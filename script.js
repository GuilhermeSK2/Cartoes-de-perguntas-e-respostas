const flashcards = document.getElementsByClassName("flashcards")[0];
const createBox = document.getElementsByClassName("create-box")[0];

const question = document.getElementById("question");
const answer = document.getElementById("answer");
const saveButton = document.getElementById("save-button");

let contentArray = localStorage.getItem('items') ?
    JSON.parse(localStorage.getItem('items')) : [];

contentArray.forEach(divMaker);

function divMaker(text) {
    var div = document.createElement("div");
    var h2_question = document.createElement("h2");
    var h2_answer = document.createElement("h2");

    div.className = 'flashcard';

    h2_question.setAttribute('style', "border-top:1px solid red; padding: 15px; margin-top: 30px");
    h2_question.innerHTML = text.my_question;

    h2_answer.setAttribute("style", "text-align:center; color:red;");
    h2_answer.innerHTML = text.my_answer;
    h2_answer.style.display = 'none';

    h2_question.addEventListener('click', function() {
        h2_answer.style.display = (h2_answer.style.display === 'none') ? 'block' : 'none';
    });

    h2_answer.addEventListener('click', function() {
        h2_question.style.display = (h2_question.style.display === 'none') ? 'block' : 'none';
    });

    div.appendChild(h2_question);
    div.appendChild(h2_answer);

    flashcards.appendChild(div);
}

function addFlashcard() {
    var flashcard_info = {
        'my_question': question.value,
        'my_answer': answer.value
    };

    contentArray.push(flashcard_info);
    localStorage.setItem('items', JSON.stringify(contentArray));
    divMaker(contentArray[contentArray.length - 1]);
    question.value = '';
    answer.value = '';
    hideCreateBox();
}

function delFlashcards() {
    localStorage.clear();
    flashcards.innerHTML = '';
    contentArray = [];
}

function showCreateCardBox() {
    createBox.style.display = "block";
}

function hideCreateBox() {
    createBox.style.display = "none";
}

saveButton.addEventListener('click', addFlashcard);
