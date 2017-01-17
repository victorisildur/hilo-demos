import * as Hilo from 'hilo';
import * as extend from 'extend';
import { TextBox } from './TextBox';

export class WordCircle {
    icon = null;
    words = [];
    constructor(private x, private y, private r, private theme) {
        const iconS = 200;
        const iconProps = {
            id: theme,
            x: x,
            y: y - iconS / 2,
            width: iconS,
            height: iconS
        }
        if (theme === 'word') {
            this.icon = new Hilo.Bitmap(extend({}, iconProps, {
                image: 'images/mouth2.png'
            }));
        } else {
            this.icon = new Hilo.Bitmap(extend({}, iconProps, {
                image: 'images/hand.png'
            }));
        }
    }
    fillWords(words: string[], stage: any) {
        const cnt = words.length;
        // build icon
        this.icon.addTo(stage);
        // build words
        this.words = words.map((word, idx) => {
            return new TextBox({
                text: word,
                totalCnt: cnt,
                idx: idx,
                centerX: this.x,
                centerY: this.y,
                radius: this.r
            });
        })
        this.words.forEach(wordBox => {
            wordBox.addTo(stage);
            wordBox.getReady();
        });
    }
    roll() {
        this.words.forEach(word => word.roll());
    }
    stopRoll() {
        this.words.forEach(word => word.stopRoll());
    }
}