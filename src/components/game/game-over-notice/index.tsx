import { Anchor } from 'components'
import { useGameState } from 'components/context/game-state'
import styles from './game-over-notice.module.scss'

const Index = () => {
    const { handleRestart } = useGameState()
    return (
        <div className={styles.gameOverNotice}>
            <div>
                <h1>Game Over!</h1>
                <Anchor onClick={handleRestart}>Restart</Anchor>
            </div>
        </div>
    )
}

export default Index
