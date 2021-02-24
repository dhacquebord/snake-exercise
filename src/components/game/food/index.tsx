import { useGameState } from 'components/context/game-state'
import styles from './food.module.scss'

const Index = () => {
    const { food } = useGameState()

    const style = {
        gridArea: `${food.y} / ${food.x}`
    }

    return (
        <div
            className={styles.food}
            style={style}
        />
    )
}

export default Index
