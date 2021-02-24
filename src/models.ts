/* eslint-disable no-unused-vars */

export enum Direction {
    Left = 'left',
    Up = 'up',
    Right = 'right',
    Down = 'down'
}

export type Coordinate = {
    x: number
    y: number
}

export type GameLogicState = {
    food: Coordinate
    boardSize: {
        columns: number
        rows: number
    },
    snake: Coordinate[]
    currentDirection: Direction
    dead: boolean
    score: number
}

export type GameState = GameLogicState & {
    tickTime: number
    lastDirection: Direction
    paused: boolean
    handleStart: () => void
    handleRestart: () => void
    handleNewGame: () => void
}
