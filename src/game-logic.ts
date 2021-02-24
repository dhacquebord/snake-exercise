import { GameLogicState, Direction } from 'models' // eslint-disable-line no-unused-vars

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
     * - Move snake
     * - Check if food has been eaten
     * - Grow snake when food has been eaten
     * - Raise score when food has been eaten
     * - Generate new food when it has been eaten
     * - Check if snake hits the border
     * - Check if snake hits itself
     */
    return state
}
