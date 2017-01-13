import * as Hilo from 'hilo';

export const Box = Hilo.Class.create({
    Extends: Hilo.Graphics,
    constructor: function (props) {
        Box.superclass.constructor.call(this, props);
        this.lineStyle(5, '#fff')
            .beginFill('transparent')
            .drawRoundRect(0, 0, this.width, this.height, 10)
            .endFill();
    }
})