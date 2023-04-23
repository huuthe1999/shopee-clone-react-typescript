import { CardBanner, Carousel } from '@/components'

import BottomBanner from './BottomBanner'

interface Props {}

const Banner = (props: Props) => {
  return (
    <div className="bg-white pt-8">
      {/* Banner */}
      <div className="max-w-6xl flex flex-col mx-auto">
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
                prevButtonClassName:
                  'bg-black/10 px-2 py-4 rounded-r-sm hover:bg-black/25 text-white'
              }}>
              {[1, 2, 3, 4, 5, 6].map((item, index) => (
                <CardBanner key={index} index={index} />
              ))}
            </Carousel>
          </div>
          {/* Top right banner */}
          <div className="basis-1/3 flex flex-col max-sm:basis-0 gap-y-[5px]">
            <div className="bg-red-400 flex-shrink">
              <img
                className="w-full h-full"
                src="https://cf.shopee.vn/file/vn-50009109-c00fd9fc83395ea9001c8f9ec1230a1b_xhdpi"
                alt=""
              />
            </div>
            <div className="bg-yellow-200">
              <img
                className="w-full h-full"
                src="https://cf.shopee.vn/file/vn-50009109-5ac166c8551a403fb209c8e7b7f593f1_xhdpi"
                alt=""
              />
            </div>
          </div>
        </div>
        {/* Bottom banner */}
        <div className="pb-4 px-6">
          <BottomBanner />
        </div>
      </div>
    </div>
  )
}

export default Banner
