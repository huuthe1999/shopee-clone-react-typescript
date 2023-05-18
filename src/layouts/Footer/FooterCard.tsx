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
      className={classNames('mb-3 text-xs', {
        'mx-auto': isLastItem,
        'flex gap-2 bg-white p-1': item.image,
        'flex basis-full': !item.image,
        'basis-full bg-transparent': item.image && item.title
      })}>
      {item.image && <img src={item.image} alt="social" className="max-h-full max-w-full" />}
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
        <h6 className="my-6 text-xs font-bold text-neutral-700">{cardItem.title}</h6>
        <ul className="flex flex-wrap gap-x-2">{renderChildren}</ul>
      </section>
    </>
  )
}

export default FooterCard
