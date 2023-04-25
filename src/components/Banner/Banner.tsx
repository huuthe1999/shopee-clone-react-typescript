import { CardBanner, Carousel } from '@/components'
import { BANNERS } from '@/data/banner'

import BottomBanner from './BottomBanner'

interface Props {}

const Banner = (props: Props) => {
  return (
    <>
      {/* Top banner */}
      <div className="flex flex-row flex-1 items-end gap-x-2">
        {/* Top left banner */}
        <div className="basis-2/3 bg-transparent max-sm:basis-full h-full flex-shrink-0">
          <Carousel
            autoplay
            wrapAround
            defaultControlsConfig={{
              nextButtonClassName:
                'bg-black/10 px-2 py-4 rounded-r-sm hover:bg-black/25 text-white',
              prevButtonClassName: 'bg-black/10 px-2 py-4 rounded-r-sm hover:bg-black/25 text-white'
            }}>
            {BANNERS.map((item, index) => (
              <CardBanner key={index} image={item} />
            ))}
          </Carousel>
        </div>
        {/* Top right banner */}
        <div className="basis-1/3 flex flex-col max-sm:basis-0 gap-y-[5px]">
          <div className="bg-red-400 flex-shrink">
            <img
              className="w-full h-full"
              src="https://res.cloudinary.com/dknvhah81/image/upload/v1682264292/category-banner/vn-50009109-5ac166c8551a403fb209c8e7b7f593f1_xhdpi_fngeqh.jpg"
              alt=""
            />
          </div>
          <div className="bg-yellow-200">
            <img
              className="w-full h-full"
              src="https://res.cloudinary.com/dknvhah81/image/upload/v1682264327/category-banner/vn-50009109-6377f701bb7902c943f995f1acfb969a_xhdpi_pdzlcr.png"
              alt=""
            />
          </div>
        </div>
      </div>
      {/* Bottom banner */}
      <BottomBanner />
    </>
  )
}

export default Banner
