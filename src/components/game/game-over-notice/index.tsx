import { Anchor } from 'components'
import { useGameState } from 'components/context/game-state'
import styles from './game-over-notice.module.scss'

const Index = () => {
    const { handleNewGame, score } = useGameState()
    return (
        <div className={styles.gameOverNotice}>
            <div>
                <h1>Game Over!</h1>
                <div>You scored {score} points!</div>
                <Anchor onClick={handleNewGame}>Restart</Anchor>
            </div>
        </div>
    )
}

export default Index
