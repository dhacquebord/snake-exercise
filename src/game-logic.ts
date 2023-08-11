import { GameLogicState, Direction } from 'models' // eslint-disable-line no-unused-vars

/**
 * This function updates the gamestate for every game tick
 * @param state The last state of the game
 * @returns The updated state of the game
 * 
 * The state object has the following properties:
 * - food: Coordinate describing the position of the food.
 * - boardSize: {
 *      - rows: Integer describing number of rows of the gameboard.
 *      - columns: Integer describing number of columns of the gameboard.
 *      # NOTE: 0 is included as a valid position.
 * }
 * - snake: Coordinate[] describing the position of the snake. The first entry of the array represents the snake head.
 * - currentDirection: Direction (Either "Up", "Right", "Down" or "Left". `src/models.ts` exports an enum for these values)
 * - dead: Boolean Indicating if the snake had died and it's game-over.
 * - score: Integer Indicating the amount of times food has been eaten.
 * 
 * A Coordinate is an object containing an x and y property
 */
export const handleGameTick = (state: GameLogicState): GameLogicState => {
    /**
     * TODO:
     * - Move snake
     * - Check if snake hits the border and die if this is the case
     * - Check if food has been eaten
     * - Raise score when food has been eaten
     * - Grow snake when food has been eaten
     * - Generate new food when it has been eaten
     * - Check if snake hits itself and die if this is the case
     */

    // Example
    state.snake.unshift({
        x: state.snake[0].x + 1,
        y: state.snake[0].y
    })
    state.snake.pop()


    return state
}
