import { stat } from 'fs';
import { GameLogicState, Direction, Coordinate } from 'models' // eslint-disable-line no-unused-vars
import { parseBody } from 'next/dist/next-server/server/api-utils';

/**
 * Updates the gamestate for every game tick
 * @param state The last state of the game
 * @returns The updated game state
 *
 * The state object has the following properties:
 * - food: Coordinate
 * - rows: number
 * - columns: number
 * - snake: Coordinate[] (The first entry of the array represents the snake head)
 * - currentDirection: Direction (Either "Up", "Right", "Down" or "Left". `src/models.ts` exports an enum for these values)
 * - dead: boolean
 * - score: number
 *
 * An Coordinate is an object containing an x and y property
 */
export const handleGameTick = (state: GameLogicState) => {
    /**
     * TODO:
     * - [x] Move snake
     * - [x] Check if food has been eaten
     * - [x] Grow snake when food has been eaten
     * - [x] Raise score when food has been eaten
     * - [x] Generate new food when it has been eaten
     * - [x] Check if snake hits the border
     * - [x] Check if snake hits itself
     */
    state.snake = moveSnakeHead(state.currentDirection, state.snake)

    if (didHitSelf(state.snake)) {
        state.dead = true
        return state
    }

    if (didHitBorder(state.boardSize.columns, state.boardSize.rows, state.snake[0])) {
        state.dead = true
        return state
    }

    if (hasEatenFood(state.food, state.snake[0]) ) {
        state.score++
        state.food = generateFood(state.boardSize.columns, state.boardSize.rows, state.snake)
    } else {
        state.snake = moveSnakeBody(state.snake)
    }

    return state
}

function didHitSelf (snake: Coordinate[]): boolean {
    const snakeHead = snake[0]
    const snakeBody = snake.slice(1)

    return !!snakeBody.find(bodyCoordinate => {
        return bodyCoordinate.x === snakeHead.x && bodyCoordinate.y === snakeHead.y
    })
}

function didHitBorder(maxX: number, maxY: number, snakeHead: Coordinate): boolean {
    return (maxX < snakeHead.x || maxY < snakeHead.y) ||
        (0 >= snakeHead.x || 0 >= snakeHead.y)
}

function generateFood(maxX: number, maxY: number, snake: Coordinate[]): Coordinate {
    const randomX = Math.floor(Math.random() * maxX)
    const randomY = Math.floor(Math.random() * maxY)

    if (!!snake.find(bodyCoordinate => bodyCoordinate.x === randomX && bodyCoordinate.y === randomY))
        return generateFood(maxY, maxY, snake)

    return {
        x: randomX,
        y: randomY
    }
}

function moveSnakeBody(snake: Coordinate[]): Coordinate[] {
    snake.pop()
    return snake
}

function hasEatenFood(food: Coordinate, snakeHead: Coordinate): boolean {
    return food.x == snakeHead.x && food.y === snakeHead.y
}

function moveSnakeHead(currentDirection: Direction, snake: Coordinate[]): Coordinate[] {
    switch (currentDirection) {
        case Direction.Up:
            snake.unshift({
                x: snake[0].x,
                y: snake[0].y - 1
            })
            break;

        case Direction.Down:
            snake.unshift({
                x: snake[0].x,
                y: snake[0].y + 1
            })
            break;

        case Direction.Left:
            snake.unshift({
                x: snake[0].x - 1,
                y: snake[0].y
            })
            break;

        case Direction.Right:
            snake.unshift({
                x: snake[0].x + 1,
                y: snake[0].y
            })
            break;
    }

    return snake
}
