import { useGameState } from 'components/context/game-state'
import styles from './snake.module.scss'

const Index = () => {
    const { snake, dead } = useGameState()

    const headStyle = {
        gridArea: `${snake[0].y} / ${snake[0].x}`,
        ...(dead && { backgroundColor: 'red' })
    }

    return (
        <>
            {snake.slice(1).map(coordinate => {
                const style = {
                    gridArea: `${coordinate.y} / ${coordinate.x}`,
                }
                return (
                    <div
                        className={styles.snake}
                        key={`${coordinate.y}-${coordinate.x}`}
                        style={style}
                    />
                )
            })}
            
            <div
                className={styles.snake}
                style={headStyle}
            />
        </>
    )
}

export default Index
