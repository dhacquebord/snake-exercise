import { useGameState } from 'components/context/game-state'

type Props = {
    className?: string
}

const Index = ({ className }: Props) => {
    const { score } = useGameState()

    return (
        <div className={className}>
            Score: {score}
        </div>
    )
}

export default Index
