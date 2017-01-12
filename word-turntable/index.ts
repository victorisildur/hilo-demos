import * as Hilo from 'hilo';

import { initStage, initTicker, width, height } from './init';
import { WordCircle } from './WordCircle/WordCircle';
import { words, actions } from './words';

const stage = initStage();
const ticker = initTicker(stage);

const wordCircle = new WordCircle(
    width / 4,
    height / 2,
    Math.min(width / 4, height / 2) * 0.8
);

const actionCircle = new WordCircle(
    width * 3 / 4,
    height / 2,
    Math.min(width / 4, height / 2) * 0.8
);

const words3 = [...words[0], ...words[1], ...words[2]];
wordCircle.fillWords(words3, stage);

const actions3 = [...actions[0], ...actions[1], ...actions[2]];
actionCircle.fillWords(actions3, stage);

ticker.start();
