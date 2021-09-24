document.addEventListener('DOMContentLoaded', ()=>{

    //cards array
    const cardArray = [
        {
            name: 'pic1',
            img: 'MemoryGame/img/pic1.png'
        },

        {
            name: 'pic2',
            img: 'MemoryGame/img/pic2.png'
        },

        {
            name: 'pic3',
            img: 'MemoryGame/img/pic3.png'
        },

        {
            name: 'pic4',
            img: 'MemoryGame/img/pic4.png'
        },

        {
            name: 'pic5',
            img: 'MemoryGame/img/pic5.png'
        },

        {
            name: 'pic6',
            img: 'MemoryGame/img/pic6.png'
        }
    ]

    const grid = document.querySelector('.grid');
    const resultDisplay = document.getElementById("result");

    var canPick = true;
    var cardsChosen = [];
    var cardsChosenId = [];
    var cardsWon = [];

    //Shuffle Cards
    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    //creating board
    function CreateBoard(){
        cardArray.forEach( (cardElement) => {
            cardArray.push(cardElement);
        })
        console.log(cardArray);
        shuffleArray(cardArray);
            for(let i = 0; i < cardArray.length; i++){
                var card = document.createElement('img');
                card.setAttribute('src', 'MemoryGame/img/blank.png');
                card.setAttribute('data-id', i);
                card.addEventListener('click', flipCard)
                grid.appendChild(card);
            }
    }

    //check matches
    function checkForMatch(){
        var cards = document.querySelectorAll('img')
        const optionOne = cardsChosenId[0];
        const optionTwo = cardsChosenId[1];

        //if it they are the same cards
        if(cardsChosen[0] == cardsChosen[1] && optionOne != optionTwo){
            cards[optionOne].setAttribute('src', 'MemoryGame/img/white.png');
            cards[optionTwo].setAttribute('src', 'MemoryGame/img/white.png')
            cardsWon.push(cardsChosen);
        }
        else {
            cards[optionOne].setAttribute('src', 'MemoryGame/img/blank.png');
            cards[optionTwo].setAttribute('src', 'MemoryGame/img/blank.png');
        }

        //reset arrays to chose other cards
        cardsChosen = [];
        cardsChosenId = [];
        canPick = true;
        resultDisplay.innerText = cardsWon.length;
    }

    //flip cards
    function flipCard(){
        var cardId = this.getAttribute('data-id');
        if(cardId != cardsChosenId[0] && this.getAttribute('src') != "MemoryGame/img/white.png" && canPick) {
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
            canPick = false;
            setTimeout(checkForMatch, 750)
        }
    }

    CreateBoard();
})