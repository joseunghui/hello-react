import React, { useState} from "react";
import Try from "./Try_hooks";

// class 안에 속하지 않기 때문에 Hooks로 변경해도 바뀌지 않는 부분!!!
function getNumbers() {
    const candidate = [1,2,3,4,5,6,7,8,9];
    const array = [];
    for (let i = 0; i < 4; i += 1) {
        const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        array.push(chosen);
    }
    return array;
}

// Hooks형 코드 작성
const NumberBaseball = () => {
    const [result, setResult ] = useState('');
    const [value, setValue ] = useState('');
    const [answer, setAnswer ] = useState(getNumbers);
    const [ tries, setTries ] = useState([]);

    const onSubmitForm = (e) => {
        e.preventDefault();
        if (value === answer.join('')) { 
            setResult('홈런!!!');
            setTries((prevTries) =>  [prevTries, { try: value, result: '홈런!!!' }]);
            alert('게임을 다시 시작합니다!'); 
            setValue('');
            setAnswer(getNumbers());
            setTries([]);
        } else { 
            const answerArray = value.split('').map( (v) => parseInt(v));
            let strike = 0;
            let ball = 0;
            if (tries.length >= 9) { 
                setResult(`10번 넘게 틀려서 실패! 답은 ${answer.join(',')} 였습니다!`);
                alert('게임을 다시 시작합니다!'); 
                setValue('');
                setAnswer(getNumbers());
                setTries([]);
            } else {
                for (let i = 0; i < 4; i += 1) {
                    if (answerArray[i] === answer[i]) { 
                        strike += 1;
                    } else if (answer.includes(answerArray[i])) { 
                        ball += 1;
                    }
                }
            setTries((prevTries) =>  [...prevTries, {try: value, result: `${strike} strike, ${ball} ball 입니다.`}]);
            setValue('');
            }
        }
    };

    const onChangeInput = (e) => {
        setValue(e.target.value);
    };

    return(
        <>
            <h1>{result}</h1>
            <form onSubmit={onSubmitForm}>
                <input maxLength={4} value={value} onChange={onChangeInput} />
            </form>
            <div>try : {tries.length}</div>
            <ul>
                {tries.map((v, i) => {
                    return (
                        <Try key={`${i + 1}차 시도 : `} tryInfo={v} />
                    );
                })}
            </ul>
        </>
    );
}

export default NumberBaseball;