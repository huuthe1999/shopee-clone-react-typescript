import classNames from 'classnames'
import { Link } from 'react-router-dom'

import aboutMe from '@/data/footer/aboutMe.json'
import careCustomer from '@/data/footer/careCustomer.json'
import countries from '@/data/footer/countries.json'
import download from '@/data/footer/download.json'
import followMe from '@/data/footer/followMe.json'
import payment from '@/data/footer/payment.json'

import FooterCard from './FooterCard'

const data = [careCustomer, aboutMe, payment, followMe, download]
const Footer = () => {
  const renderItems = data.map((cardItem, cardIndex) => (
    <div
      key={cardIndex}
      className={classNames('sm:basis-1/3 lg:basis-1/5 px-2', {
        'max-sm:basis-1/2': cardItem.length === 1,
        'basis-auto': cardItem.length !== 1
      })}>
      {cardItem.map((item, index) => (
        <FooterCard cardItem={item} key={index} isLastItem={cardIndex === data.length - 1} />
      ))}
    </div>
  ))

  const renderCountries = countries.map((country, index) => (
    <span key={index} className="text-center pl-1">
      <Link to="#">{country.name}</Link>
    </span>
  ))
  return (
    <footer className="shrink-0 bg-neutral-100 p-1">
      <div className="mx-auto max-w-6xl flex flex-row flex-wrap">
        {renderItems}
        <div className="border-t-2 border-zinc-300 w-full flex flex-wrap py-8 text-neutral-500 text-sm">
          <div className="basis-1/3">© 2023 Shopee. Tất cả các quyền được bảo lưu.</div>
          <div className="flex flex-wrap basis-2/3 divide-x divide-neutral-300 justify-between">
            Quốc gia & Khu vực:
            {renderCountries}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
