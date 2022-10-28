// By Chernysh Artem 2022

// Takes slots from the gameboard.
const gameboard = (() => {
    const slots = document.querySelectorAll('.box-main button');
    return { slots }
})();

// Clears the gameboard.
const restartFunc = (() => {
    function restartGame() {
        gameboard.slots.forEach((slot) => {
            slot.textContent = "";
        })
    }
    return { restartGame };
})();

// AddEventListener for the restart button.
const restartButton = (() => {
    const button = document.querySelector('.box-down button');
    button.addEventListener('click', () => {
        restartFunc.restartGame();
    })
})();

// Changes the selected sign.
const changeSelectedSignButton = (() => {
    const buttons = document.querySelectorAll('.sign-options button');
    buttons[0].classList.add('selected');
    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            restartFunc.restartGame();
            buttons[0].classList.remove('selected');
            buttons[1].classList.remove('selected');
            button.classList.add('selected');
        })
    })
})();

// Takes current sign.
const takeUserSign = (() => {
    function take() {
        return document.querySelector('.sign-options button.selected').value;
    };
    return { take };
})();

// Takes the computer's sign.
const takeComputerSign = (() => {
    function take() {
        if (takeUserSign.take() === 'x') {
            return 'o';
        } else {
            return 'x';
        }
    }
    return { take };
})();

// Renders current player's sign on the gameboard.
const playerMove = (() => {
    const slots = gameboard.slots;
    slots.forEach((slot) => {
        slot.addEventListener('click', () => {
            if (slot.textContent === '') {
                slot.textContent = takeUserSign.take();
                winCheck.check();
                setTimeout(() => {
                    computerDecide.setRandomMove();
                }, 200)
            }
        })
    })
})();

// In case of victory, shows the victory screen and restarts the game.
const victory = (() => {
    function winScreen(condition, winner) {
        const box = document.querySelector('.box');
        box.style.position = 'relative';
        const winScreenDisplay = document.createElement('div');
        winScreenDisplay.classList.add('win-screen-display');
        const textWinner = document.createElement('h1');
        textWinner.textContent = condition
        winScreenDisplay.appendChild(textWinner);
        const signWinner = document.createElement('h1');
        signWinner.textContent = winner;
        winScreenDisplay.appendChild(signWinner);
        box.appendChild(winScreenDisplay);
        setTimeout(() => {
            restartFunc.restartGame();
            box.removeChild(winScreenDisplay);
        }, 1500);
    }
    return { winScreen }
})();

// Checks if someone has won.
const winCheck = (() => {
    function check() {
        if (((gameboard.slots[0].textContent === 'x') && (gameboard.slots[1].textContent === 'x') && (gameboard.slots[2].textContent === 'x')) || 
            ((gameboard.slots[3].textContent === 'x') && (gameboard.slots[4].textContent === 'x') && (gameboard.slots[5].textContent === 'x')) ||
            ((gameboard.slots[6].textContent === 'x') && (gameboard.slots[7].textContent === 'x') && (gameboard.slots[8].textContent === 'x')) ||
            ((gameboard.slots[0].textContent === 'x') && (gameboard.slots[3].textContent === 'x') && (gameboard.slots[6].textContent === 'x')) ||
            ((gameboard.slots[1].textContent === 'x') && (gameboard.slots[4].textContent === 'x') && (gameboard.slots[7].textContent === 'x')) ||
            ((gameboard.slots[2].textContent === 'x') && (gameboard.slots[5].textContent === 'x') && (gameboard.slots[8].textContent === 'x')) ||
            ((gameboard.slots[0].textContent === 'x') && (gameboard.slots[4].textContent === 'x') && (gameboard.slots[8].textContent === 'x')) ||
            ((gameboard.slots[2].textContent === 'x') && (gameboard.slots[4].textContent === 'x') && (gameboard.slots[6].textContent === 'x'))) {
                restartFunc.restartGame();
                victory.winScreen('The winner is:', 'x');
        } else if
            (((gameboard.slots[0].textContent === 'o') && (gameboard.slots[1].textContent === 'o') && (gameboard.slots[2].textContent === 'o')) || 
            ((gameboard.slots[3].textContent === 'o') && (gameboard.slots[4].textContent === 'o') && (gameboard.slots[5].textContent === 'o')) ||
            ((gameboard.slots[6].textContent === 'o') && (gameboard.slots[7].textContent === 'o') && (gameboard.slots[8].textContent === 'o')) ||
            ((gameboard.slots[0].textContent === 'o') && (gameboard.slots[3].textContent === 'o') && (gameboard.slots[6].textContent === 'o')) ||
            ((gameboard.slots[1].textContent === 'o') && (gameboard.slots[4].textContent === 'o') && (gameboard.slots[7].textContent === 'o')) ||
            ((gameboard.slots[2].textContent === 'o') && (gameboard.slots[5].textContent === 'o') && (gameboard.slots[8].textContent === 'o')) ||
            ((gameboard.slots[0].textContent === 'o') && (gameboard.slots[4].textContent === 'o') && (gameboard.slots[8].textContent === 'o')) ||
            ((gameboard.slots[2].textContent === 'o') && (gameboard.slots[4].textContent === 'o') && (gameboard.slots[6].textContent === 'o'))) {
                restartFunc.restartGame();
                victory.winScreen('The winner is:', 'o');
        } else if ((gameboard.slots[0].textContent !== '') && (gameboard.slots[1].textContent !== '') && (gameboard.slots[2].textContent !== '') &&
        (gameboard.slots[3].textContent !== '') && (gameboard.slots[4].textContent !== '') && (gameboard.slots[5].textContent !== '') &&
        (gameboard.slots[6].textContent !== '') && (gameboard.slots[7].textContent !== '') && (gameboard.slots[8].textContent !== '')) {
            restartFunc.restartGame();
            victory.winScreen("It's a draw", "");
        }
    };
    return { check };
})();

// The computer decides it's move based on a random number.
const computerDecide = (() => {
    function getRandomNumber() {
        return Math.floor(Math.random() * gameboard.slots.length);
    };
    function setRandomMove() {
        const num = getRandomNumber();
        if (gameboard.slots[num].textContent === '') {
            gameboard.slots[num].textContent = takeComputerSign.take();
        } else {
            setRandomMove();
        }
        winCheck.check();
    }
    return { setRandomMove };
})();

// If the user has pressed on "o" button, then the computer will go first.
const compGoesFirstOnO = (() => {
    const button = document.querySelector('#o-btn');
    button.addEventListener('click', () => {
        computerDecide.setRandomMove();
    })
})();