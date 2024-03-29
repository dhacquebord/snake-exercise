import styles from './footer.module.scss'

type Props = {
    maxWidth?: number
}

const Index = ({ maxWidth }: Props) => {
    const footerStyle = {
        maxWidth,
    }

    return (
        <div className={styles.footer} style={footerStyle}>
            By dhacquebord
        </div>
    )
}

export default Index
