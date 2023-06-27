import classNames from 'classnames'

interface Props {
  className?: string
}

const PingIcon = ({ className }: Props) => {
  return (
    <span className={classNames('absolute bottom-0 right-0 flex h-2 w-2', [className])}>
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-75" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
    </span>
  )
}

export default PingIcon
