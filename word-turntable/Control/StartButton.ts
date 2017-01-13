import * as Hilo from 'hilo';
export const initBtn = (x: number, y: number) => {
    let btn = new Hilo.Button({
        id: 'blueBtn',
        image: 'images/btn.png',
        width: 64,
        height: 64,
        upState: { rect: [0, 0, 64, 64] },
        overState: { rect: [64, 0, 64, 64] },
        downState: { rect: [128, 0, 64, 64] },
        disabledState: { rect: [192, 0, 64, 64] },
        x: x - 32,
        y: y - 32
    });
    return btn;
}