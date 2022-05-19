import React, { useRef, useState } from "react";

// 함수형 코드 작성
const SpeedCheck_hooks = () => {
    // state는 바뀌면 화면이 재랜더링 됨
    const [state, setState] = useState('waiting');
    const [message, setMessage] = useState('클릭해서 시작하세요.');
    const [result, setResult] = useState([]);

    // this.timeOut, this.startTime, this.endTime을 정의하기 위한 ref 
    // => 값이 바뀌어도 화면이 재랜더링 되지 않음
    const timeOut = useRef(null);
    const startTime = useRef(0);
    const endTime = useRef(0);

    const onClickScreen = () => {
        if (state === 'waiting') {
           setState('ready');
           setMessage('초록색이 되면 클릭하세요.');
         
            timeOut.current = setTimeout( () => {
                setState('now');
                setMessage('지금!!!');

                startTime.current = new Date();

            }, Math.floor(Math.random() * 1000) + 2000);

        } else if (state === 'ready') { // 성급하게 클릭한 경우
            clearTimeout(timeOut.current);

            setState('waiting');
            setMessage('너무 성급하시군요! 다시 클릭해서 시작하세요.');

        } else if (state === 'now') { // 알맞게 클릭한 경우 -> 반응 속도 체크

            endTime.current = new Date();
            
            setState('waiting');
            setMessage('클릭해서 시작하세요.');
            setResult((prevResult) => {
                return [...prevResult, endTime.current - startTime.current];
            });
        }
    };

    const onReset = () => {
        setResult([]);
    };

    const renderAverage = () => {
        return result.length === 0
            ? null
            : <>
                <div>평균 시간 : {result.reduce((a, c) => a + c) / result.length}ms</div>
                <button onClick={onReset}>Reset</button> 
            </>
    };

    return (
        <>
            <div id="screen"
                className={state}
                onClick={onClickScreen}
            >
                {message}
            </div>

            {() => {
                if (result.length === 0) {
                    return null;
                } else {
                    <>
                        <div>평균 시간 : {result.reduce((a, c) => a + c) / result.length}ms</div>
                        <button onClick={onReset}>Reset</button> 
                    </>
                }
            }}

            {renderAverage()}
            </>
    );
};





export default SpeedCheck_hooks;
