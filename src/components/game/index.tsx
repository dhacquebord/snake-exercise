import { Square, Snake, GameOverNotice } from 'components'
import { useGameState } from 'components/context/game-state'
import styles from './game.module.scss'

const Index = () => {
    const { die, columns, rows } = useGameState()

    const style = {
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`
    }

    return (
        <Square className={styles.boardWrapper}>
            <div style={style} className={styles.board}>
                {die && <GameOverNotice />}
                <Snake />
            </div>
        </Square>
    )
}

export default Index
