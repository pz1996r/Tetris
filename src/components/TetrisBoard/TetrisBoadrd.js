import React, { useEffect, useState } from 'react';

const createTetrisBoard = (rows, columns) => {
    const row = [];
    const board = [];
    row.length = rows;
    board.length = columns;
    row.fill(null, 0, row.length);
    board.fill(row, 0, columns.length);
    return board;
}

// finalnie pobrać rows i columns z redaxa !!!
// initialboard przechowywujemy w reduxie jako obiekt do manipulacji boardem 

export default ({ rows, columns }) => {
    const [board, setBoard] = useState([]);

    useEffect(() => {
        setBoard(createTetrisBoard(rows, columns))
    }, [columns, rows])

    return (
        <div>
            {
                board.map((row, ix) => {
                    return row.map((field, iy) => {
                        return (<p>{ix}/{iy}</p>)
                    })
                })
            }
        </div>
    )
}

// klocek przyjmuje wartość odpowiadającą za kolor, 