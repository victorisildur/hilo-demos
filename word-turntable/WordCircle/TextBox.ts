import * as Hilo from 'hilo';
import * as extend from 'extend';
import { random } from '../util';

export const TextBox = Hilo.Class.create({
    Extends: Hilo.Text,
    constructor: function (props) {
        const defaultProps = {
            font: '30px YaHei bold',
            color: '#fff',
            maxWidth: 300,
            textAlign: 'center'
        }
        TextBox.superclass.constructor.call(this, extend({}, defaultProps, props));
        this.cache();
    },
    totalCnt: 0,
    idx: 0,
    degree: 0,
    radius: 0,
    centerX: 0,
    centerY: 0,
    shakeRange: 0.05,
    growRatio: 2,
    tween: null,
    growTween: null,
    isRolling: false,
    rollSpeed: Math.PI / 90,
    getReady: function () {
        const radius = this.radius * random(0.9, 1.1);
        this.degree = this.idx / this.totalCnt * 2 * Math.PI - Math.PI / 2;
        this.x = this.centerX + this.radius * Math.cos(this.degree);
        this.y = this.centerY + this.radius * Math.sin(this.degree);
        this.shake();
    },
    shake: function () {
        if (!this.tween) {
            const randomX = this.x + this.radius * random(-1 * this.shakeRange, this.shakeRange);
            const randomY = this.y + this.radius * random(-1 * this.shakeRange, this.shakeRange);
            this.tween = Hilo.Tween.to(this,
                {
                    x: randomX,
                    y: randomY
                },
                {
                    duration: 2000,
                    loop: true,
                    reverse: true
                });
        }
    },
    stopShake: function () {
        if (this.tween) {
            Hilo.Tween.remove(this.tween);
            this.tween = null;
        }
    },
    grow: function () {
        if (!this.growTween) {
            this.growTween = Hilo.Tween.to(this,
                {
                    scaleX: this.growRatio,
                    scaleY: this.growRatio,
                },
                {
                    duration: 20
                });
        }
    },
    shrink: function () {
        if (this.growTween) {
            Hilo.Tween.remove(this.growTween);
            this.growTween = null;
        }
        this.scaleX = 1;
        this.scaleY = 1;
    },
    roll: function () {
        this.isRolling = true;
    },
    stopRoll: function () {
        this.isRolling = false;
    },
    onUpdate: function () {
        // grow
        const normalDegree = (this.degree + Math.PI / 2) % (Math.PI * 2),
            oneShare = 2 * Math.PI / this.totalCnt,
            halfShare = Math.PI / this.totalCnt;
        const isBig = Math.abs(normalDegree) <= halfShare || normalDegree > (2 * Math.PI - halfShare);
        if (isBig) {
            this.grow();
        } else {
            this.shrink();
        }
        if (this.isRolling) {
            this.stopShake();
            this.degree += this.rollSpeed;
            this.x = this.centerX + this.radius * Math.cos(this.degree);
            this.y = this.centerY + this.radius * Math.sin(this.degree) - (isBig ? 70 : 0);
        } else {
            this.shake();
        }
    }
})