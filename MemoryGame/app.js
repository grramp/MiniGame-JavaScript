document.addEventListener('DOMContentLoaded', ()=>{

    //cards array
    const cardArray = [
        {
            name: 'pic1',
            img: 'img/pic1.png'
        },

        {
            name: 'pic2',
            img: 'img/pic2.png'
        },

        {
            name: 'pic3',
            img: 'img/pic3.png'
        },

        {
            name: 'pic4',
            img: 'img/pic4.png'
        },

        {
            name: 'pic5',
            img: 'img/pic5.png'
        },

        {
            name: 'pic6',
            img: 'img/pic6.png'
        }
    ]

    const grid = document.querySelector('.grid');
    const resultDisplay = document.getElementById("result");

    var cardsChosen = [];
    var cardsChosenId = [];
    var cardsWon = [];

    //creating board
    function CreateBoard(){
        for(let i = 0; i < 2; i++){
            for(let j = 0; j < cardArray.length; j++){
                var card = document.createElement('img');
                card.setAttribute('src', 'img/blank.png');
                card.setAttribute('data-id', i * cardArray.length + j);
                card.addEventListener('click', flipCard)
                grid.appendChild(card);
            }
        }
    }

    //check matches
    function checkForMatch(){
        var cards = document.querySelectorAll('img')
        const optionOne = cardsChosenId[0];
        const optionTwo = cardsChosenId[1];

        //if it they are the same cards
        if(cardsChosen[0] == cardsChosen[1] && optionOne != optionTwo){
            cards[optionOne].setAttribute('src', 'img/white.png');
            cards[optionTwo].setAttribute('src', 'img/white.png')
            cardsWon.push(cardsChosen);
        }
        else {
            cards[optionOne].setAttribute('src', 'img/blank.png');
            cards[optionTwo].setAttribute('src', 'img/blank.png');
        }

        //reset arrays to chose other cards
        cardsChosen = [];
        cardsChosenId = [];
        resultDisplay.innerText = cardsWon.length;
    }

    //flip cards
    function flipCard(){
        var cardId = this.getAttribute('data-id');
        if(cardId != cardsChosenId[0] && this.getAttribute('src') != "img/white.png") {
            cardsChosenId.push(cardId);
        }
        else{
            return;
        }

        //if it's the second copy of the card, takes the img from the original
        if(cardId >= cardArray.length){
            cardId -= cardArray.length;
        }
        cardsChosen.push(cardArray[cardId].name)
        this.setAttribute('src', cardArray[cardId].img)

        if(cardsChosen.length >= 2) {
            setTimeout(checkForMatch, 850)
        }
    }

    CreateBoard();
})