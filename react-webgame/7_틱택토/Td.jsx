import React, { useCallback, memo } from "react";
import { CLICK_CELL } from "./TicTacToe";

const Td = memo(({ rowIndex, cellIndex, dispatch, cellData }) => {

    const onClickTd = useCallback(() => {
        console.log(rowIndex, cellIndex);

        // 한번 클릭한 칸은 바뀌지 않도록 return
        if (cellData) {
            return;
        }
        dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex });
    }, [cellData]);
    return (
        <td onClick={onClickTd}>{cellData}</td>
    )
});


export default Td;