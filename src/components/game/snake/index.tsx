import { useGameState } from 'components/context/game-state'
import styles from './snake.module.scss'

const Index = () => {
    const { snake } = useGameState()

    return (
        <>
            {snake.map(coordinate => {
                const style = {
                    gridArea: `${coordinate.y} / ${coordinate.x}`
                }
                return (
                    <div
                        className={styles.snake}
                        key={`${coordinate.y}-${coordinate.x}`}
                        style={style}
                    />
                )
            })}
        </>
    )
}

export default Index
