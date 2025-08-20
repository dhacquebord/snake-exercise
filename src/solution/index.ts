import { GameLogicState, Direction, Coordinate } from 'snake-challenge/models'

const coordinatesEqual = (a, b) => a.y === b.y && a.x === b.x

export const handleGameTick = (state: GameLogicState) => {
    moveSnakeHead(state)
            
    if (checkIfHittingBorder(state)) {
        undoSnakeHeadMove(state)
        die(state)
        return state
    }

    if (isEatingFood(state)) {
        raiseScore(state)
        generateNewFood(state)
    } else {
        moveSnakeTail(state)
    }

    checkIfHittingSelf(state)

    return state
}

const isEatingFood = (state: GameLogicState) =>
    state.snake[0].y === state.food.y && state.snake[0].x === state.food.x

const moveSnakeHead = (state: GameLogicState) => {
    switch(state.currentDirection) {
        case Direction.Left:
            state.snake.unshift({
                x: state.snake[0].x - 1,
                y: state.snake[0].y
            })
            break
        case Direction.Up:
            state.snake.unshift({
                x: state.snake[0].x,
                y: state.snake[0].y - 1
            })
            break
        case Direction.Right:
            state.snake.unshift({
                x: state.snake[0].x + 1,
                y: state.snake[0].y
            })
            break
        case Direction.Down:
            state.snake.unshift({
                x: state.snake[0].x,
                y: state.snake[0].y + 1
            })
            break
    }
}

const undoSnakeHeadMove = (state: GameLogicState) => {
    state.snake.shift()
}

const moveSnakeTail = (state: GameLogicState) => {
    state.snake.pop()
}

const generateNewFood = (state: GameLogicState) => {
    const boardFields: Coordinate[] = []
    for (let x = 0; x <= state.boardSize.columns; x++) {
        for (let y = 0; y <= state.boardSize.columns; y++) {
            if (!state.snake.find(snake => coordinatesEqual(snake, { x, y }))) {
                boardFields.push({ x, y })
            }
        }
    }
    state.food = boardFields[Math.floor(Math.random() * boardFields.length)]
}

const raiseScore = (state: GameLogicState) => {
    state.score += 1
}

const die = (state: GameLogicState) => {
    state.dead = true
}

const checkIfHittingBorder = (state: GameLogicState) =>
    state.snake[0].x <= 0 ||
    state.snake[0].x > state.boardSize.columns ||
    state.snake[0].y <= 0 ||
    state.snake[0].y > state.boardSize.rows

const checkIfHittingSelf = (state: GameLogicState) => {
    if (state.snake.slice(1).find(snakeCoordinate => 
        coordinatesEqual(snakeCoordinate, state.snake[0])
    )) {
        state.dead = true
    }
}
