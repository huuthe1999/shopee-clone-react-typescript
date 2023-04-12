import classNames from 'classnames'

interface Props {
  text: string
  className?: string
}

const Button = ({ text, className }: Props) => {
  return (
    <button
      className={classNames('px-4 py-2 text-white bg-primary rounded-sm hover:opacity-90', {
        [className ?? '']: className
      })}>
      {text}
    </button>
  )
}

export default Button
