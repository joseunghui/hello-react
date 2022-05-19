import React, { useState, useRef, useEffect } from "react";

// 함수형 코드 작성
const rspCoords = {
    바위: '0',
    가위: '-142px',
    보: '-284px',
}

const scores = {
    가위: 1,
    바위: 0,
    보: -1,
}

const computerChoice = (imgCoord) => {
    return Object.entries(rspCoords).find( function(v) {
        return v[1] === imgCoord;
    })[0];
};

const RSP_hooks = () => {
    const [result, setResult] = useState('');
    const [imgCoord, setImgCoord] = useState(rspCoords.바위);
    const [score, setScore] = useState(0);
    
    const interval = useRef();

    // useEffect 를 사용해서 class형의 LifeCycle 이용하기
    useEffect(() => { // componentDidMount, componentDidUpdate 역할 수행(1:1 대응은 아님!)
        // componentDidMount + componentDidUpdate + componentWillUnmount 와 동일한 효과

        interval.current = setInterval(changeHand, 100);
        return () => { // 여기가 componentWillUnmount 역할
            clearInterval(interval.current);
        }
    }, [imgCoord] /* 빈 배열을 하나 넣어두기 -> 클로저 에러를 해결해주는 역할!, 내가 Effect에서 바꿀 대상을 넣어주기*/ );

    // changeHand 
    const changeHand = () => {
        if (imgCoord === rspCoords.바위) {
            setImgCoord(rspCoords.가위);
        } else if (imgCoord === rspCoords.가위) {
            setImgCoord(rspCoords.보);
        } else if (imgCoord === rspCoords.보) {
            setImgCoord(rspCoords.바위);
        }
    }

    // onClickBtn
    const onClickBtn = (choice) => () => {
        clearInterval(interval.current);

        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(imgCoord)];
        const diff = myScore - cpuScore;

        if (diff === 0) {
            setResult('비겼습니다.');
        } else if ([-1, 2].includes(diff)) {
            setResult('이겼습니다!!!');
            setScore((prevScore) => prevScore + 1);
        } else {
            setResult('졌습니다ㅜㅜ');
            setScore((prevScore) => prevScore - 1);
        }
        setTimeout( () => {
            interval.current = setInterval(changeHand, 100);
        }, 2000);  
    };
  
    return (
        <>
            <div id="computer" style={{ background: `url(http://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
            <div>
                <button id="rock" className="btn" onClick={onClickBtn('바위')}>바위</button>
                <button id="scissor" className="btn" onClick={onClickBtn('가위')}>가위</button>
                <button id="paper" className="btn" onClick={onClickBtn('보')}>보</button>
            </div>
            <div>{result}</div>
            <div>현재 {score} 점</div>
        </>
    );
}
export default RSP_hooks;