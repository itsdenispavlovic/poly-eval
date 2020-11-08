import React from 'react';
import Sketch from "react-p5";
function App() {
    let WIDTH = 1000;
    let HEIGHT = 600;

    // CENTER | END | LEFT | RIGHT | START
    const TOP = "start"
    const CENTER = "center";
    const BOTTOM = "end";
    const LEFT = "left";
    const RIGHT = "right";
    // "center" | "end" | "left" | "right" | "start";

    // 2x^2 + 2x + 1
    const coefficienti = [2, 2, 1];
    const input = Array.from({length: 10}, (x, i) => i+1); // 1..10
    const output = [];

    let inputIndex = 0;

    let cells = coefficienti.map(c => ({
        a: c,
        xin: null,
        xout: null,
        pin: null,
        pout: null
    }));

    const step = () => {
        cells[0].pin = inputIndex < input.length ? 0 : null;
        cells[0].xin = inputIndex < input.length ? input[inputIndex] : null;
        inputIndex++;
        for (let i = 1; i < cells.length; i++) {
            cells[i].pin = cells[i-1].pout;
            cells[i].xin = cells[i-1].xout;
        }
        if (cells[cells.length-1].pout !== null)
            output.splice(0, 0, cells[cells.length-1].pout);
        for (let i = 0; i < cells.length; i++) {
            if (cells[i].xin !== null) {
                cells[i].pout = cells[i].pin * cells[i].xin + cells[i].a;
                cells[i].xout = cells[i].xin;
            } else {
                cells[i].pout = cells[i].xout = null;
            }
        }
    }


    let setup = (p5, canvasParentRef) => {
        //Canvas of size WIDTHxHEIGHT
        p5.createCanvas(WIDTH, HEIGHT).parent(canvasParentRef);

        p5.mouseClicked = () => {
            step();
        }
    };

    let draw = (p5) => {
        p5.clear();
        p5.textAlign(LEFT, BOTTOM)
        p5.textSize(32)
        p5.text('Input', 10, HEIGHT / 2 - 155)
        p5.textAlign(LEFT, TOP)
        p5.textSize(16)
        p5.text(input.slice(inputIndex).reverse().join(), 10, HEIGHT / 2 - 120)

        p5.textAlign(RIGHT, BOTTOM)
        p5.textSize(32)
        p5.text('Output', WIDTH - 10, HEIGHT / 2 - 155)
        p5.textAlign(RIGHT, TOP)
        p5.textSize(16)
        p5.text(output.join(), WIDTH - 10, HEIGHT / 2 - 120)

        cells.forEach((cell, index) => {
            const left = 50 + 200 * (index + 1), top = HEIGHT / 2 - 100;
            p5.fill(255);
            p5.rect(left, top, 100, 200)
            p5.fill(0);
            p5.textAlign(CENTER, CENTER)
            p5.textSize(32)
            p5.text('P' + index, left, top + 30, 100, 70);
            p5.textSize(20)
            p5.text(cell.a, left, top + 100, 100, 70);

            //noFill()
            p5.textSize(16)
            p5.line(left - 50, top + 30, left, top + 30)
            if (cell.pin !== null) {
                p5.textAlign(RIGHT, BOTTOM);
                p5.text(cell.pin, left - 5, top + 30)
            }
            p5.line(left - 50, top + 170, left, top + 170)
            if (cell.xin !== null) {
                p5.textAlign(RIGHT, BOTTOM);
                p5.text(cell.xin, left - 5, top + 170)
            }
            p5.line(left + 100, top + 30, left + 150, top + 30)
            if (cell.pout !== null) {
                p5.textAlign(LEFT, BOTTOM);
                p5.text(cell.pout, left + 105, top + 30)
            }
            p5.line(left + 100, top + 170, left + 150, top + 170)
            if (cell.xout !== null) {
                p5.textAlign(LEFT, BOTTOM);
                p5.text(cell.xout, left +105, top + 170)
            }
            if (index > 0) {
                p5.rect(left - 55, top + 20, 10, 20);
                p5.rect(left - 55, top + 160, 10, 20);
            }
        });

        p5.textAlign(CENTER, BOTTOM)
        p5.textSize(18)
        p5.text('Click to advance', WIDTH / 2, HEIGHT - 10)
    };

    return (
        <div className="App">
            <Sketch setup={setup} draw={draw} className="App" />
        </div>
    );
}

export default App;