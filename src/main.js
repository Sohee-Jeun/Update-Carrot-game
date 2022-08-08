'use strict';
import { GameBuilder, Reason } from './game.js';
import PopUp from './popup.js';
import * as sound from './sound.js';

const gameFinishBanner = new PopUp();
const game = new GameBuilder()
.withGameDuration(20)
.withCarrotCount(20)
.withBugCount(25)
.build();

game.setGameStopListener(reason=>{
    let message;
    switch(reason){
        case Reason.cancel:
            message = 'Replay?'
            sound.playAlert();
            break;
        case Reason.win:
            message = 'You Won!'
            sound.playWin();
            break;
        case Reason.lose:
            message = 'You lose!'
            sound.playBug();
            break;
            default:
                throw new Error('now valid Error');
    }
    gameFinishBanner.showWithText(message);
});

gameFinishBanner.setClickListener(()=>{
    game.start();
    }); 










