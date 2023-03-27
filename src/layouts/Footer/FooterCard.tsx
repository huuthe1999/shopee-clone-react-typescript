import classNames from 'classnames'
import { Link } from 'react-router-dom'

import { CardFooter } from './type'
interface Props {
  isLastItem?: boolean
  cardItem: CardFooter
}

const FooterCard = ({ cardItem, isLastItem }: Props) => {
  const renderChildren = cardItem.children.map((item, index) => (
    <li
      key={index}
      className={classNames('text-xs mb-3', {
        'mx-auto': isLastItem,
        'flex p-1 bg-white gap-2': item.image,
        'flex basis-full': !item.image,
        'basis-full bg-inherit': item.image && item.title
      })}>
      {item.image && <img src={item.image} alt="social" className="max-w-full max-h-full" />}
      {item.title && (
        <Link to="#" className="hover:text-orange">
          {item.title}
        </Link>
      )}
    </li>
  ))
  return (
    <>
      <section>
        <h6 className="font-bold text-xs my-6 text-neutral-700">{cardItem.title}</h6>
        <ul className="flex flex-wrap gap-x-2">{renderChildren}</ul>
      </section>
    </>
  )
}

export default FooterCard
