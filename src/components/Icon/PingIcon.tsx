import classNames from 'classnames'

interface Props {
  className?: string
}

const PingIcon = () => {
  return (
    <span className={classNames('absolute flex w-2 h-2 bottom-0 right-0')}>
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-secondary" />
      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
    </span>
  )
}

export default PingIcon
