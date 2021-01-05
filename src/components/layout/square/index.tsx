import { FunctionComponent } from 'react'
import classnames from 'classnames'
import styles from './square.module.scss'

type Props = {
    className?: string
}

const Index: FunctionComponent<Props> = ({ children, className }) => (
    <div className={classnames(styles.square, className)}>
        {children}
    </div>
)

export default Index
