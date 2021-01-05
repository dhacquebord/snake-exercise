import { Header, Footer } from 'components'
import { FunctionComponent } from 'react'
import classnames from 'classnames'
import styles from './standard-layout.module.scss'

type Props = {
    alignCenter?: boolean
}

const Index: FunctionComponent<Props> = ({ children, alignCenter }) => (
    <>
        <Header />
        <div
            className={classnames(styles.content, {
                [styles.alignCenter]: alignCenter
            })}
        >
            {children}
        </div>
        <Footer />
    </>
)

export default Index
