import { TextBox } from './TextBox';
import { Circle } from './Circle';

export class WordCircle {
    constructor(private x, private y, private r) { }
    fillWords(words: string[], stage: any) {
        const cnt = words.length;
        // build circle
        // build words
        words.map((word, idx) => {
            return new TextBox({
                text: word,
                totalCnt: cnt,
                idx: idx,
                centerX: this.x,
                centerY: this.y,
                radius: this.r
            });
        }).forEach(wordBox => {
            wordBox.addTo(stage);
            wordBox.getReady();
        });
    }
}