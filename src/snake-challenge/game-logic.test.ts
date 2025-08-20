import test from 'ava'
import { GameLogicState, Direction } from './models'
const { handleGameTick: _handleGameTick } = require(process.env.NEXT_PUBLIC_USE_SOLUTION === 'true' ? 'solution' : 'game-logic')

const clone = obj => JSON.parse(JSON.stringify(obj))

const handleGameTick = (state: GameLogicState) => {
    const copiedState = clone(state)
    return _handleGameTick(copiedState)
}

const initialState: GameLogicState = {
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
    currentDirection: Direction.Up,
    dead: false,
    score: 0
}

test('Move the snake > Up when direction is "Up"', t => {
    const state = handleGameTick(initialState)
    const correctSnakePosition = [...initialState.snake]
    correctSnakePosition.unshift({
        x: initialState.snake[0].x,
        y: initialState.snake[0].y - 1
    })
    correctSnakePosition.pop()
    t.deepEqual(state.snake, correctSnakePosition)
})

test('Move the snake > Right when direction is "Right"', t => {
    const state = handleGameTick({
        ...initialState,
        currentDirection: Direction.Right
    })
    const correctSnakePosition = [...initialState.snake]
    correctSnakePosition.unshift({
        x: initialState.snake[0].x + 1,
        y: initialState.snake[0].y
    })
    correctSnakePosition.pop()
    t.deepEqual(state.snake, correctSnakePosition)
})

test('Move the snake > Down when direction is "Down"', t => {
    const state = handleGameTick({
        ...initialState,
        currentDirection: Direction.Down
    })
    const correctSnakePosition = [...initialState.snake]
    correctSnakePosition.unshift({
        x: correctSnakePosition[0].x,
        y: correctSnakePosition[0].y + 1
    })
    correctSnakePosition.pop()
    t.deepEqual(state.snake, correctSnakePosition)
})

test('Move the snake > Left when direction is "Left"', t => {
    const state = handleGameTick({
        ...initialState,
        snake: initialState.snake.sort(() => -1),
        currentDirection: Direction.Left
    })
    const correctSnakePosition = [...initialState.snake]
    correctSnakePosition.unshift({
        x: correctSnakePosition[0].x - 1,
        y: correctSnakePosition[0].y
    })
    correctSnakePosition.pop()
    t.deepEqual(state.snake, correctSnakePosition)
})

test('Die when the snake is hitting a wall > Upper wall', t => {
    const state = handleGameTick({
        ...initialState,
        snake: [{
            x: 0,
            y: 0
        }]
    })
    t.true(state.dead)
})

test('Die when the snake is hitting a wall > Right wall', t => {
    const state = handleGameTick({
        ...initialState,
        currentDirection: Direction.Right,
        snake: [{
            x: initialState.boardSize.columns,
            y: 0
        }]
    })
    t.true(state.dead)
})

test('Die when the snake is hitting a wall > Lower wall', t => {
    const state = handleGameTick({
        ...initialState,
        currentDirection: Direction.Down,
        snake: [{
            x: 0,
            y: initialState.boardSize.columns
        }]
    })
    t.true(state.dead)
})

test('Die when the snake is hitting a wall > Left wall', t => {
    const state = handleGameTick({
        ...initialState,
        currentDirection: Direction.Left,
        snake: [{
            x: 0,
            y: 0
        }]
    })
    t.true(state.dead)
})

test('Die when the snake is hitting itself', t => {
    const state = handleGameTick({
        ...initialState,
        snake: [{
            x: 2,
            y: 2
        }, {
            x: 1,
            y: 2
        }, {
            x: 1,
            y: 1
        }, {
            x: 2,
            y: 1
        }, {
            x: 3,
            y: 1
        }]
    })
    t.true(state.dead)
})

test('Grow the snake when it\'s eating food', t => {
    const state = handleGameTick({
        ...initialState,
        food: {
            x: initialState.snake[0].x,
            y: initialState.snake[0].y - 1
        }
    })
    const correctSnakePosition = [...initialState.snake]
    correctSnakePosition.unshift({
        x: correctSnakePosition[0].x,
        y: correctSnakePosition[0].y - 1
    })
    t.deepEqual(state.snake, correctSnakePosition)
})

test('Raise score when the snake is eating food', t => {
    const state = handleGameTick({
        ...initialState,
        food: {
            x: initialState.snake[0].x,
            y: initialState.snake[0].y - 1
        }
    })
    t.is(state.score, initialState.score + 1)
})

test('Generate new food when it has been eaten > Food is not underneath the snake', t => {
    for (let i = 0; i <= 10000; i++) {
        const state = handleGameTick({
            ...initialState,
            food: {
                x: initialState.snake[0].x,
                y: initialState.snake[0].y - 1
            }
        })
        state.snake.forEach(snakeCoordinate => t.notDeepEqual(state.food, snakeCoordinate))
    }
})

test('Generate new food when it has been eaten > Food is within the game board', t => {
    for (let i = 0; i <= 10000; i++) {
        const state = handleGameTick({
            ...initialState,
            food: {
                x: initialState.snake[0].x,
                y: initialState.snake[0].y - 1
            }
        })
        t.false(state.food.x < 0)
        t.false(state.food.x > initialState.boardSize.columns)
        t.false(state.food.y < 0)
        t.false(state.food.y > initialState.boardSize.rows)
    }
})
