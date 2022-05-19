import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import Ball from './Ball';

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

const Lotto_hooks = () => {

    
    // useMemo : 복잡한 함수의 결과값을 기억하는 것 
    // -> getWinNumbers()에서 return [...winNumbers, bonusNumber]; 를 기억하고 있음
    const lottoNumbers = useMemo(() => getWinNumbers(), [])

    const [winNumbers, setWinNumbers] = useState(lottoNumbers);
    const [winBalls, setWinBalls] = useState([]);
    const [bonus, setBonus] = useState(null);
    const [redo, SetRedo] = useState(false);

    // useRef : 일반 값을 기억하는 것
    const timeouts = useRef([]);

    // useEffect(() => {}, []) 기본 형태
    useEffect(() => {
        for (let i = 0; i < winNumbers.length - 1; i++) {
            timeouts.current[i] = setTimeout(() => { // timeouts.current 가 변경되는 부분이 아니고 그 값을 확인하는 부분.
                setWinBalls((prevWinBalls) => [...prevWinBalls, winNumbers[i]] );
            }, (i + 1) * 1000);
        }
        timeouts.current[6] = setTimeout(() => { // timeouts.current 가 변경되는 부분이 아니고 그 값을 확인하는 부분.
            setBonus(winNumbers[6]);
            SetRedo(true);
        }, 7000);
        return () => {
            timeouts.current.forEach((v) => { 
                clearTimeout(v);
            });
        };
    }, [timeouts.current]); // []이 비어있으면 componentDidMount 와 동일함
    // 배열에 요소가 있으면 componentDidMount 와 componentDidUpdate 둘 다 수행

    const onClickRedo = useCallback(() => {
        // useCallback()을 사용하면 전체가 재시작되는 함수 컴포넌트에서 그 함수 자체를 기억해서,
        // onClickRedo 자체를 다시 생산하지 않음( 함수 자체를 기억! )
        setWinNumbers(getWinNumbers());
        setWinBalls([]);
        setBonus(null);
        SetRedo(false);
        
        timeouts.current = [];
    }, [winNumbers]);

    return (
        <>
            <div>당첨 숫자</div>
            <div id="결과창">
                {winBalls.map( (v) => <Ball key={v} number={v} />)}
            </div>
            <div>BONUS!</div>
            {bonus && <Ball number={bonus} />}
            {redo && <button onClick={onClickRedo}>한번 더!</button>}
        </>
    );
}
export default Lotto_hooks;