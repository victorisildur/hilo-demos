import * as Hilo from 'hilo';

import { initStage, initTicker, width, height } from './init';
import { WordCircle } from './WordCircle/WordCircle';
import { initBtn } from './Control/StartButton';
import { words, actions } from './words';

const stage = initStage();
const ticker = initTicker(stage);

const circleRatio = 0.65;

const wordCircle = new WordCircle(
    width / 4,
    height / 2,
    Math.min(width / 4, height / 2) * circleRatio,
    'word'
);

const actionCircle = new WordCircle(
    width * 3 / 4,
    height / 2,
    Math.min(width / 4, height / 2) * circleRatio,
    'action'
);

const words3 = [...words[0], ...words[1], ...words[2]];
wordCircle.fillWords(words3, stage);

const actions3 = [...actions[0], ...actions[1], ...actions[2]];
actionCircle.fillWords(actions3, stage);


stage.enableDOMEvent([Hilo.event.POINTER_START, Hilo.event.POINTER_MOVE, Hilo.event.POINTER_END]);

ticker.start();

let isRolling = false;

const btn = document.getElementById('btn');
btn.addEventListener('click', function (e) {
    if (isRolling) {
        wordCircle.stopRoll();
        actionCircle.stopRoll();
        btn.innerHTML = '开始';
    } else {
        btn.innerHTML = '暂停';
        wordCircle.roll();
        actionCircle.roll();
    }
    isRolling = !isRolling;
    btn.blur();
});
