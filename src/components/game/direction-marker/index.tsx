import { useGameState } from 'components/context/game-state'
import { Direction } from 'models'
import styles from './direction-marker.module.scss'

const Index = () => {
    const { snake, currentDirection } = useGameState()

    const getNextCoordinates = () => {
        switch (currentDirection) {
            case Direction.Left:
                return ({
                    x: snake[0].x - 1,
                    y: snake[0].y
                })
            case Direction.Up:
                return ({
                    x: snake[0].x,
                    y: snake[0].y - 1
                })
            case Direction.Right:
                return ({
                    x: snake[0].x + 1,
                    y: snake[0].y
                })
            case Direction.Down:
                return ({
                    x: snake[0].x,
                    y: snake[0].y + 1
                })
        }
    }

    const editedBorder = {
        [Direction.Left]: 'Right',
        [Direction.Up]: 'Bottom',
        [Direction.Right]: 'Left',
        [Direction.Down]: 'Top',
    }

    const nextCoordinates = getNextCoordinates()
    const style = {
        gridArea: `${nextCoordinates.y} / ${nextCoordinates.x}`,
    }

    const arrowStyle = {
        [`border${editedBorder[currentDirection]}Color`]: 'white'
    }

    return (
        <div
            className={styles.directionMarker}
            style={style}
        >
            <div style={arrowStyle} />
        </div>
    )
}

export default Index
