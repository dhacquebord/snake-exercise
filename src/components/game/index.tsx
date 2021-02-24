import { Square, Snake, Food, Score, GameOverNotice, PauseNotice, DirectionMarker } from 'components'
import { useGameState } from 'components/context/game-state'
import styles from './game.module.scss'

const Index = () => {
    const { dead, paused, boardSize } = useGameState()

    const style = {
        gridTemplateColumns: `repeat(${boardSize.columns}, 1fr)`,
        gridTemplateRows: `repeat(${boardSize.rows}, 1fr)`
    }

    return (
        <Square className={styles.boardWrapper}>
            <div>
                <Score className={styles.score} />
                <div style={style} className={styles.board}>
                    {dead && <GameOverNotice />}
                    {paused && <PauseNotice />}
                    {dead || <DirectionMarker />}
                    <Food />
                    <Snake />
                </div>
            </div>
        </Square>
    )
}

export default Index
