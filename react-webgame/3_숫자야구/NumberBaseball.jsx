import React, { Component} from "react";
import Try from "./Try";

function getNumbers() {
    // 숫자 네개를 겹치지 않고 랜덤하게 뽑는 함수
    const candidate = [1,2,3,4,5,6,7,8,9];
    const array = [];
    for (let i = 0; i < 4; i += 1) {
        const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        array.push(chosen);
    }
    return array;
}

// class형 코드 작성
class NumberBaseball extends Component {
    state = {
        result: '',
        value: '',
        answer: getNumbers(),  // 이게 배열로 뽑아져 나옴
        tries: [], // push 쓰면 안됨
    };

    onSubmitForm = (e) => {
        // setState를 연달아 쓰는 것 고치기 위함
        const { value, tries, answer } = this.state;

        e.preventDefault();
        if (this.state.value === this.state.answer.join('')) { // 정답일 경우
            this.setState((prevState) => {
                return {
                    result: '홈런!!!',
                    tries: [...prevState.tries, { try: value, result: '홈런!!!' }]
                }  
            });
            alert('게임을 다시 시작합니다!'); // 문제 새로고침
                this.setState({
                    value: '',
                    answer: getNumbers(),
                    tries: [],
                });
        } else { // 오답일 경우
            const answerArray = value.split('').map( (v) => parseInt(v));
            let strike = 0;
            let ball = 0;
            if (tries.length >= 9) { // 10번 이상 틀린 경우(tries.length == 오답수)
                this.setState({
                    result: `10번 넘게 틀려서 실패! 답은 ${answer.join(',')} 였습니다!`,
                })
                alert('게임을 다시 시작합니다!'); // 문제 새로고침
                this.setState({
                    value: '',
                    answer: getNumbers(),
                    tries: [],
                });
            } else {
                for (let i = 0; i < 4; i += 1) {
                    if (answerArray[i] === answer[i]) { // 그 위치, 그 숫자가 맞은 경우
                        strike += 1;
                    } else if (answer.includes(answerArray[i])) { // 그 숫자만 맞은 경우
                        ball += 1;
                    }
                }
            }
            this.setState( (prevState) =>{
                return {
                    tries: [...prevState.tries, {try: value, result: `${strike} strike, ${ball} ball 입니다.`}],
                    value: '', 
                }
            });
        }
    };

    onChangeInput = (e) => {
        console.log(this.state.answer);
        this.setState({
            value: e.target.value,
        });
    };

    // fruits = [
    //         {fruit: '사과', taste: '맛있다'},
    //         {fruit: '딸기', taste: '시다'},
    //         {fruit: '배', taste: '맛없다'},
    //         {fruit: '키위', taste: '달다'},
    //         {fruit: '복숭아', taste: '고소하다'},
    // ];

    render() {
        return(
            <>
                <h1>{this.state.result}</h1>
                <form onSubmit={this.onSubmitForm}>
                    <input maxLength={4} value={this.state.value} onChange={this.onChangeInput} />
                </form>
                <div>try : {this.state.tries.length}</div>
                <ul>
                    {this.state.tries.map((v, i) => {
                        return (
                            <Try key={`${i + 1}차 시도 : `} tryInfo={v} />
                        );
                    })}
                </ul>

                {/* <ul>
                    {this.fruits.map((v, i) => {
                        return (
                            <Try key={v.fruit + v.taste} value={v} index={i} />
                        );
                    })}
                </ul> */}
            </>
        );
    }
}

export default NumberBaseball;