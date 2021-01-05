import { FunctionComponent } from 'react'
import Link from 'next/link'
import classnames from 'classnames'
import styles from './anchor.module.scss'

type Props = {
    href?: string
    onClick?: () => void
    className?: string
}

const Index: FunctionComponent<Props> = ({
    href,
    onClick,
    className,
    children
}) => {
    const a = (
        <a onClick={onClick} className={classnames(styles.anchor, className)}>
            {children}
        </a>
    )

    return href ? (
        <Link href={href}>
            {a}
        </Link>
    ) : a
}

export default Index
