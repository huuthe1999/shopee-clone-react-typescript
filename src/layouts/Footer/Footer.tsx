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
      className={classNames('sm:basis-1/3 lg:basis-1/5 px-2 text-neutral-500', {
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
          <div className="basis-1/3 max-md:basis-full text-center pr-1">
            © 2023 Shopee. Tất cả các quyền được bảo lưu.
          </div>
          <div className="flex flex-wrap basis-2/3 max-md:basis-full divide-x divide-neutral-300 text-right text-xs items-center px-1">
            Quốc gia & Khu vực:
            {renderCountries}
          </div>
          <div className="mx-auto py-6 uppercase flex divide-x divide-neutral-300 text-xs text-center">
            <span className="px-2">
              <Link to="#">CHÍNH SÁCH BẢO MẬT</Link>
            </span>
            <span className="px-2">
              <Link to="#">QUY CHẾ HOẠT ĐỘNG</Link>
            </span>
            <span className="px-2">
              <Link to="#">CHÍNH SÁCH VẬN CHUYỂN</Link>
            </span>
            <span className="px-2">
              <Link to="#">CHÍNH SÁCH TRẢ HÀNG VÀ HOÀN TIỀN</Link>
            </span>
          </div>
          <div className="mx-auto pt-6 flex flex-wrap flex-col basis-full text-center text-xs gap-2">
            <p>
              Địa chỉ: Tầng 4-5-6, Tòa nhà Capital Place, số 29 đường Liễu Giai, Phường Ngọc Khánh,
              Quận Ba Đình, Thành phố Hà Nội, Việt Nam. Tổng đài hỗ trợ: 19001221 - Email:
              cskh@hotro.shopee.vn
            </p>
            <p>
              Chịu Trách Nhiệm Quản Lý Nội Dung: Nguyễn Đức Trí - Điện thoại liên hệ: 024 73081221
              (ext 4678)
            </p>
            <p>
              Mã số doanh nghiệp: 0106773786 do Sở Kế hoạch & Đầu tư TP Hà Nội cấp lần đầu ngày
              10/02/2015
            </p>
            <p>© 2015 - Bản quyền thuộc về Công ty TNHH Shopee</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
