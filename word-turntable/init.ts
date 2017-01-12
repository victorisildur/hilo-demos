import * as Hilo from 'hilo';

export const width = window.innerWidth;
export const height = window.innerHeight;

export const initStage = () => {
    let stage = new Hilo.Stage({
        renderType: 'canvas',
        container: document.getElementById('game-container'),
        width: width,
        height: height
    });
    return stage;
}

export const initTicker = (stage) => {
    let ticker = new Hilo.Ticker(60);
    ticker.addTick(stage);
    ticker.addTick(Hilo.Tween);
    return ticker;
}