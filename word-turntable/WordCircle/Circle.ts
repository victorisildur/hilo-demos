import * as Hilo from 'hilo';

export const Circle = Hilo.Class.create({
    Extends: Hilo.Graphics,
    constructor: function (props) {
        Circle.superclass.constructor.call(this, props);
        this.lineStyle(5, '#fff')
            .beginFill()
            .drawCircle(-0.5 * this.r, -1 * this.r, this.r)
            .endFill();
    },
    x: 0,
    y: 0,
    r: 0,
})