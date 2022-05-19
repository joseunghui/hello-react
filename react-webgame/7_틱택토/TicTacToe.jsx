import React, { useEffect, useReducer, useCallback } from "react";
import Table from "./Table";

const initialState = {
    winner: '',
    turn: 'o',
    tableData: [
        ['', '', ''], 
        ['', '', ''], 
        ['', '', ''],
    ],
    recentCell: [-1, -1],
};

// export 를 붙여서 모듈로 만들기
export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const SET_TURN = 'SET_TURN';
export const RESET_DATA = 'RESET_DATA';

const reducer = (state, action) => {
    switch (action.type) {
        case SET_WINNER: {
            return {
                ...state,
                winner: action.winner,
            };
        }
        case CLICK_CELL: {
            // 기존 테이블 데이터를 얕은 복사 해주기(불변성을 유지하기 위해서 얕은 복사)
            const tableData = [...state.tableData];
            tableData[action.row] = [...tableData[action.row]];
            // 만들어준 객체 껍데기에 turn 값 넣어주기
            tableData[action.row][action.cell] = state.turn;

            return {
                ...state,
                tableData,
                recentCell: [action.row, action.cell],
            };
        }
        case SET_TURN: {
            return {
                ...state,
                turn: state.turn === 'o' ? 'x' : 'o',
            };
        }
        case RESET_DATA: {
            return {
                ...state,
                turn: 'o',
                tableData: [
                    ['', '', ''], 
                    ['', '', ''], 
                    ['', '', ''],
                ],
                recentCell: [-1, -1],
            };
        }
        default:
            return state;
    }
};


const TicTacToe = () => {
    // useReducer를 사용해보자!
    const [state, dispatch] = useReducer(reducer, initialState);
    const { tableData, turn, winner, recentCell } = state;

    const onClickTable = useCallback( () => {
        // action 객체인 winner로 action을 dispatch가 실행하는 것
        // action을 해석해서 state를 바꿔주는 것 = Reducer
        dispatch({ type: SET_WINNER, winner: 'o'});
    }, []);

    useEffect(() => {
        const [row, cell] = recentCell;

        // 조기 값인 -1 인 경우 승자 체크 X
        if (row < 0) {
            return;
        }
        let win = false;

        if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) {
            win = true;
        }
        if (tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) {
            win = true;
        }
        if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) {
            win = true;
        }
        if (tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) {
            win = true;
        }

        if (win) { // 승리
            dispatch({ type: SET_WINNER, winner: turn });
            dispatch({ type: RESET_DATA });
        } else { // 무승부
            let all = true;
            tableData.forEach((row) => {
                row.forEach((cell) => {
                    if (!cell) {
                        all = false;
                    }
                });
            });
            if (all) {
                dispatch({ type: RESET_DATA });
            } else {
                dispatch({ type: SET_TURN });
            } 
        }
    }, [recentCell]);

    return (
        <>
            <Table onClick={onClickTable} tableData={tableData} dispatch={dispatch} />
            {winner && <div>{winner}님의 승리!</div>}
        </>
    )
};

export default TicTacToe;