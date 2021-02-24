import { Anchor } from 'components'
import { useGameState } from 'components/context/game-state'
import styles from './pause-notice.module.scss'

const Index = () => {
    const { handleStart } = useGameState()
    return (
        <div className={styles.gameOverNotice}>
            <div>
                <h1>Paused</h1>
                <Anchor onClick={handleStart}>Continue</Anchor>
            </div>
        </div>
    )
}

export default Index
