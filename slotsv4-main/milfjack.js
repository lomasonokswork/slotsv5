let score = 0;
let aiscore = 0;

// Array of card values
const cards = [2, 3, 4, 5, 6, 7, 8, 9, 1, 11];
let card;
let aicard;

function updateScorebox(message = `Your current score: ${score}<br>AI score: ${aiscore}`) {
    const scorebox = document.querySelector('.scorebox');
    if (scorebox) {
        scorebox.innerHTML = message; // Use innerHTML to allow line breaks
    }
}

function resetGame() {
    score = 0;
    aiscore = 0;
    const buttonWrapper = document.querySelector('.button-wrapper');
    if (buttonWrapper) {
        buttonWrapper.remove();
    }
    const playButton = document.createElement('button');
    playButton.textContent = 'Play Again';
    playButton.onclick = play;
    const container = document.querySelector('.bigbox');
    if (container) {
        container.appendChild(playButton);
    }
    const scorebox = document.querySelector('.scorebox');
    if (scorebox) {
        scorebox.innerHTML = ''; // Clear the scorebox content
    }
}

function play() {
    const currentButton = document.querySelector('button');
    if (currentButton) {
        currentButton.remove();
    }

    const buttonWrapper = document.createElement('div');
    buttonWrapper.className = 'button-wrapper';

    const hitButton = document.createElement('button');
    hitButton.textContent = 'Hit';
    hitButton.className = currentButton?.className || '';
    hitButton.onclick = () => {
        card = cards[Math.floor(Math.random() * cards.length)];
        console.log("card:", card);
        score += card;
        updateScorebox();
        aicard = cards[Math.floor(Math.random() * cards.length)];
        console.log("AI card:", aicard);
        aiscore += aicard;
        updateScorebox();

        if (score > 21) {
            updateScorebox('You busted! AI wins!');
            resetGame();
        } else if (aiscore > 21) {
            updateScorebox('AI busted! You win!');
            resetGame();
        } else if (score === 21) {
            updateScorebox('Blackjack! You win!');
            resetGame();
        } else if (aiscore === 21) {
            updateScorebox('AI got Blackjack! AI wins!');
            resetGame();
        }
    };

    const standButton = document.createElement('button');
    standButton.textContent = 'Stand';
    standButton.className = currentButton?.className || '';
    standButton.onclick = () => {
        while (aiscore < 17) {
            aicard = cards[Math.floor(Math.random() * cards.length)];
            console.log("AI card:", aicard);
            aiscore += aicard;
            updateScorebox();
        }

        if (aiscore > 21) {
            updateScorebox('AI busted! You win!');
        } else if (aiscore > score) {
            updateScorebox('AI wins!');
        } else if (aiscore < score) {
            updateScorebox('You win!');
        } else {
            updateScorebox('It\'s a tie!');
        }
        resetGame();
    };

    buttonWrapper.appendChild(hitButton);
    buttonWrapper.appendChild(standButton);

    const container = document.querySelector('.bigbox');
    if (container) {
        container.appendChild(buttonWrapper);
    }
}