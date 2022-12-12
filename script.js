const hitSound = new Audio('assets/sounds/swish.m4a');
const winSound = new Audio('assets/sounds/cash.mp3');
const lossSound = new Audio('assets/sounds/aww.mp3');

function rpsGame(yourChoice) {
    let humanChoice, botChoice;
    humanChoice = yourChoice.id;
    botChoice = numberToChoice(randToRpsInt());
    // console.log(botChoice);
    results = decideWinner(humanChoice, botChoice);
    // console.log(results);
    message = finalMessage(results);
    // console.log(message);
    rpsFrontEnd(yourChoice.id, botChoice, message);
    let score = soundChoose(results);
    if (score === 0) {
        lossSound.play();
    }
    else if (score === 0.5) {
        // .. 
    }
    else {
        winSound.play();
    }
}

function randToRpsInt() {
    return Math.floor(Math.random()*3);
}

function numberToChoice(number) {
    return ['rock', 'paper', 'scissors'][number];
}

function decideWinner(yourChoice, computerChoice) {
    let rpsDataBase = {
        'rock' : {
            'scissors' : 1,
            'rock' : 0.5,
            'paper' : 0
        },
        'paper' : {
            'rock' : 1,
            'paper' : 0.5,
            'scissors' : 0
        },
        'scissors' : {
            'paper' : 1,
            'scissors' : 0.5,
            'rock' : 0
        }
    };
    let yourScore = rpsDataBase[yourChoice][computerChoice];
    let computerScore = rpsDataBase[computerChoice][yourChoice];
    return [yourScore, computerScore];
}

function soundChoose([yourScore, computerScore]) {
    return yourScore;
}

function finalMessage([yourScore, computerScore]) {
    if (yourScore === 0) {
        return {'message': 'You lost!', 'color': 'red'};
    }
    else if (yourScore === 0.5) {
        return {'message': 'You tied!', 'color': 'yellow'};
    }
    else {
        return {'message': 'You won!', 'color': 'green'};
    }
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage) {
    let imagesDataBase = {
        'rock' : document.getElementById('rock').src,
        'paper' : document.getElementById('paper').src,
        'scissors' : document.getElementById('scissors').src
    }
    //let's remove all the images
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    let humanDiv = document.createElement('div');
    let botDiv = document.createElement('div');
    let messageDiv = document.createElement('div');

    humanDiv.innerHTML = "<img src='" + imagesDataBase[humanImageChoice] + "'height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1);'>";
    messageDiv.innerHTML = "<h1 style='color:" + finalMessage['color'] + "; font-size:60px; padding:30px; '>"+finalMessage['message'] + "</h1>";
    botDiv.innerHTML = "<img src='" + imagesDataBase[botImageChoice] + "'height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243, 38, 24, 1);'>";
    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);
}