import { useContext, createContext, ReactNode, useState, useEffect } from 'react'

const clone = obj => JSON.parse(JSON.stringify(obj))

type Props = {
    children: ReactNode
}

const initialState = {
    tickTime: 200,
    food: {},
    rows: 40,
    columns: 40,
    snake: [{
        x: 7,
        y: 20
    }, {
        x: 6,
        y: 20
    }, {
        x: 5,
        y: 20
    }],
    currentDirection: 'right',
    die: false,
    score: 0,
    handleRestart: () => {}
}

export const GameStateContext = createContext(clone(initialState))

export const useGameState = () => useContext(GameStateContext)

export const GameStateProvider = ({ children }: Props) => {
    const [gameState, setGameState] = useState(clone(initialState))
    let tickInterval

    const handleRestart = () => {
        setGameState(clone(initialState))
        startGame()
    }

    const startGame = () => {
        tickInterval = setInterval(() => {
            setGameState(state => {
                const { snake } = state
                snake.unshift({
                    x: state.snake[0].x + 1,
                    y: state.snake[0].y
                })

                const die = checkIfKilled(state)

                return { ...state, snake, die }
            })
        }, 200)
    }

    const checkIfKilled = (state) => {
        const die = state.snake[0].x < 0
            || state.snake[0].x > state.columns
            || state.snake[0].y < 0
            || state.snake[0].y > state.rows
        
        if (die) {
            clearInterval(tickInterval)
        }

        return die
    }

    useEffect(() => {
        startGame()
        return () => clearInterval(tickInterval)
    }, [])

    return (
        <GameStateContext.Provider value={{ ...gameState, handleRestart }}>
            {children}
        </GameStateContext.Provider>
    )
}

export default GameStateProvider
