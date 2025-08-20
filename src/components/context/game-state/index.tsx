import { useContext, createContext, ReactNode, useState, useEffect } from 'react'
import { CODE_LEFT, CODE_UP, CODE_RIGHT, CODE_DOWN, CODE_ESCAPE } from 'keycode-js'
import { GameState, Direction } from 'snake-challenge/models'
const { handleGameTick } = require(process.env.NEXT_PUBLIC_USE_SOLUTION === 'true' ? 'solution' : 'snake-challenge/game-logic')

const clone = obj => JSON.parse(JSON.stringify(obj))

type Props = {
    children: ReactNode
}

const initialState: GameState = {
    tickTime: 200,
    food: {
        x: 20,
        y: 20
    },
    boardSize: {
        columns: 40,
        rows: 40
    },
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
    currentDirection: Direction.Right,
    lastDirection: Direction.Right,
    dead: false,
    paused: false,
    score: 0,
    handleRestart: () => null,
    handleNewGame: () => null,
    handleStart: () => null
}

export const GameStateContext = createContext(initialState)
export const useGameState = () => useContext(GameStateContext)

export const GameStateProvider = ({ children }: Props) => {
    const [gameState, setGameState] = useState(initialState)
    let tickInterval

    const handleNewGame = () => {
        setGameState(initialState)
        handleStart()
    }

    const enableControls = () => {
        window.addEventListener('keydown', function({ code }) {
            switch(code) {
                case CODE_LEFT:
                    setGameState(state => {
                        if (state.lastDirection !== Direction.Right) {
                            state.currentDirection = Direction.Left
                        }
                        return { ...state }
                    })
                    break
                case CODE_UP:
                    setGameState(state => {
                        if (state.lastDirection !== Direction.Down) {
                            state.currentDirection = Direction.Up
                        }
                        return { ...state }
                    })
                    break
                case CODE_RIGHT:
                    setGameState(state => {
                        if (state.lastDirection !== Direction.Left) {
                            state.currentDirection = Direction.Right
                        }
                        return { ...state }
                    })
                    break
                case CODE_DOWN:
                    setGameState(state => {
                        if (state.lastDirection !== Direction.Up) {
                            state.currentDirection = Direction.Down
                        }
                        return { ...state }
                    })
                    break
                case CODE_ESCAPE:
                    pauseGame()
                    break
            }
        });
    }

    const handleStart = () => {
        enableControls()
        setGameState(state => ({
            ...state,
            paused: false
        }))
        clearInterval(tickInterval)
        tickInterval = setInterval(handleTick, 200 * Math.pow(0.9, gameState.score))
    }
    
    const raiseGameSpeed = (state) => {
        clearInterval(tickInterval)
        tickInterval = setInterval(handleTick, 200 * Math.pow(0.9, state.score))
    }

    const handleTick = () => {
        setGameState(_state => {
            let state = clone(_state)

            state = handleGameTick(state)

            state.lastDirection = state.currentDirection

            if (state.score > _state.score) {
                raiseGameSpeed(state)
            }

            if (state.dead) {
                endGame()
            }

            return state
        })
    }

    const endGame = () => {
        clearInterval(tickInterval)
    }

    const pauseGame = () => {
        clearInterval(tickInterval)
        setGameState(state => ({
            ...state,
            paused: true
        }))
    }

    useEffect(() => {
        handleStart()
        return () => clearInterval(tickInterval)
    }, [])

    return (
        <GameStateContext.Provider value={{ ...gameState, handleNewGame, handleStart }}>
            {children}
        </GameStateContext.Provider>
    )
}

export default GameStateProvider
