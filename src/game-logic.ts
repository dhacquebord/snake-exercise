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

function moveSnake(state: GameLogicState){
    let xMod = 0;
    let yMod = 0;
    
    if (state.currentDirection == Direction.Right){
        xMod = 1;    
    }else if(state.currentDirection == Direction.Left){
        xMod = -1;
    }

    if (state.currentDirection == Direction.Down){
        yMod = 1;    
    }else if(state.currentDirection == Direction.Up){
        yMod = -1;
    }

    state.snake.unshift({
        
        x: state.snake[0].x + xMod,
        y: state.snake[0].y + yMod
    })
}

function snakeKillCheck(state: GameLogicState){
    if (state.snake[0].x < 0 ||
        state.snake[0].x > state.boardSize.columns ||
        state.snake[0].y < 0 ||
        state.snake[0].y > state.boardSize.rows){
            state.dead = true;
    }
}

function foodEatenCheck(state: GameLogicState){
    if (state.snake[0].x == state.food.x && state.snake[0].y == state.food.y){
        state.score++;
        return true;
    }else{
        state.snake.pop();
        return false;
    }
}

function generateNewFood(state: GameLogicState){
    do{
        let xRandom = Math.random();
        let yRandom = Math.random();
        state.food.x = Math.round(state.boardSize.columns * xRandom);
        state.food.y = Math.round(state.boardSize.columns * yRandom);
    }
    while(state.snake.find((segment)=>{
        return segment.x == state.food.x && segment.y == state.food.y;
    }))
}

export const handleGameTick = (state: GameLogicState): GameLogicState => {
    /**
     * TODO:
     * - 1 Move snake
     * - 1 Check if snake hits the border and die if this is the case
     * - 1 Check if food has been eaten
     * - 1 Raise score when food has been eaten
     * - 1 Grow snake when food has been eaten
     * - 1 Generate new food when it has been eaten
     * - Check if snake hits itself and die if this is the case
     */


    //Move snake
    moveSnake(state);
    

    //Check if snake must die
    snakeKillCheck(state);

    //Check if food is being eaten
    if (foodEatenCheck(state)){
        generateNewFood(state);
    }
    

    return state
}
