import { GithubIcon } from 'components'
import Link from 'next/link'
import styles from './header.module.scss'

const Index = () => (
    <div className={styles.headerWrapper}>
        <div className={styles.header}>
            <div>
                <span className={styles.title}>
                    Snake
                </span>
            </div>
            <div>
                <Link href="https://github.com/dhacquebord/snake">
                    <a target="__blank">
                        <GithubIcon className={styles.githubIcon} />
                    </a>
                </Link>
            </div>
        </div>
    </div>
)

export default Index
