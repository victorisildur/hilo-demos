import * as Hilo from 'hilo';
import * as extend from 'extend';

export const TextBox = Hilo.Class.create({
    Extends: Hilo.Text,
    constructor: function (props) {
        const defaultProps = {
            font: '30px 微软雅黑 bold',
            color: '#fff',
            maxWidth: 700,
            textAlign: 'center'
        }
        TextBox.superclass.constructor.call(this, extend({}, props, defaultProps));
    },
    totalCnt: 0,
    idx: 0,
    degree: 0,
    radius: 0,
    centerX: 0,
    centerY: 0,
    getReady: function () {
        const radius = this.radius * (1 + 0.2 * Math.random());
        this.degree = this.idx / this.totalCnt * 2 * Math.PI;
        this.x = this.centerX + this.radius * Math.cos(this.degree);
        this.y = this.centerY + this.radius * Math.sin(this.degree);
    }
})