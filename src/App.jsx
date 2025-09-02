/* eslint-disable no-unused-vars */
import { useState } from 'react'
import './App.css'

const TURNS = {
  x: "X",
  o: "O"
}

const WINNER_COMBOS = [
  [0, 1, 2], // fila superior
  [3, 4, 5], // fila media
  [6, 7, 8], // fila inferior
  [0, 3, 6], // columna izquierda
  [1, 4, 7], // columna central
  [2, 5, 8], // columna derecha
  [0, 4, 8], // diagonal principal
  [2, 4, 6]  // diagonal secundaria
]

const Square = ({ children, isSelected, updateBoard, index}) => {
  const className = `square ${isSelected ? "is-selected": ""}`

  const handleClick = () =>{
    updateBoard(index)
  }
  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}
// Función principal 
function App() {
  // Creamos un estado que genera un array de longitud 9 con elementos null para el tablero
  const [board, setBoard] = useState(Array(9).fill(null)) 
  // Creamos un estado para gestionar los turnos con estado inicial 'X'
  const [turn, setTurn] = useState(TURNS.x)

  const [winner, setWinner] = useState(null)
  console.log(turn)
  const updateBoard = (index) => {
    if (board[index]) return    // Si la casilla (board[index] === false) está vacío no hace nada
    // Creamos un nuevo tablero a partir del tablero actual
    const newBoard = [...board]
    newBoard[index] = turn    // Pintamos la casilla con el 'string' del turno actual 'X' u 'O'
    setBoard(newBoard)    // Modificamos el tablero actual


    const newWinner = checWinner(board)

    if (newWinner) {
      setWinner(newWinner)
    }
    else {
    const newTurn = turn === TURNS.x ? TURNS.o: TURNS.x   // Creamos una nueva variable para cambiar el turno actual
    setTurn(newTurn)    // Modificamos el turno
      
    }
  }

  const checWinner = (checkBoard) => {

    for (const combo of WINNER_COMBOS){
      const [a,b,c] = combo
      if (
        checkBoard[a] &&
        checkBoard[a] === checkBoard[b] &&
        checkBoard[a] === checkBoard[c]
      ){
        return checkBoard[a]
      }
    }
  }

  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <section className='game'>
        {board.map((_,index) => {
          return (
            <Square
            key={index}
            index={index}
            updateBoard={updateBoard}
            >
              {board[index]}
            </Square>
          )
        })}
      </section>
      <section className='turn'>
        <Square isSelected={turn === TURNS.x}>{TURNS.x}</Square>
        <Square isSelected={turn === TURNS.o}>{TURNS.o}</Square>
      </section>

      {winner && (
        <section className="winner">
          <h2>Ganó: {winner}</h2>
          <button onClick={() => {
            setBoard(Array(9).fill(null))
            setTurn(TURNS.x)
            setWinner(null)
          }}>
            Reiniciar juego
          </button>
        </section>
      )}
    </main>
  )
}

export default App
