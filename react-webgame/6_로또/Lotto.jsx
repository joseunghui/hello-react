import React, { Component } from "react";
import Ball from './Ball';

// 로또 당첨 숫자 7개를 미리 뽑기 -> hooks로 변경 되어도 동일함
function getWinNumbers() {
    console.log('getWinNumbers');
    const candidate = Array(45).fill().map((v, i) => i + 1 );
    const shuffle = [];
    while (candidate.length > 0) {
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }
    const bonusNumber = shuffle[shuffle.length - 1];
    const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
    
    return [...winNumbers, bonusNumber];
}

class Lotto extends Component {
    state = {
        winNumbers: getWinNumbers(), // 당첨 숫자들 6개
        winBalls: [],
        bonus: null, // 보너스 공(마지막 7번째 공)
        redo: false,
    }

    timeouts = [];

    runTimeouts = () => {
        const { winNumbers } = this.state;
        // let을 쓰면 클로저 문제가 발생하지 않음 => for문 안에 i는 써도 OK
        for (let i = 0; i < winNumbers.length - 1; i++) {
            this.timeouts[i] = setTimeout(() => {
                this.setState( (prevState) => {
                    return {
                        winBalls: [...prevState.winBalls, winNumbers[i]],
                    };
                });
            }, (i + 1) * 1000);
        }
        this.timeouts[6] = setTimeout(() => {
            this.setState({
                bonus: winNumbers[6],
                redo: true,
            });
        }, 7000);
    }

    componentDidMount() {
        this.runTimeouts();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.winBalls.length === 0) {
           this.runTimeouts();
        }
    }

    componentWillUnmount() {
        this.timeouts.forEach((v) => {
            clearTimeout(v);
        });
    }

    onClickRedo = () => {
        this.setState({
            winNumbers: getWinNumbers(), // 당첨 숫자들 6개
            winBalls: [],
            bonus: null, // 보너스 공(마지막 7번째 공)
            redo: false,
        });
        this.timeouts = [];
    }

    render() {
        const { winBalls, bonus, redo } = this.state;
        return (
            <>
                <div>당첨 숫자</div>
                <div id="결과창">
                    {winBalls.map( (v) => <Ball key={v} number={v} />)}
                </div>
                <div>BONUS!</div>
                {bonus && <Ball number={bonus} />}
                {redo && <button onClick={this.onClickRedo}>한번 더!</button>}
            </>
        );
    }
}
export default Lotto;