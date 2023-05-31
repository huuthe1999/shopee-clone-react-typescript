import { MouseEvent, useRef, useState } from 'react'

import classNames from 'classnames'

import { Carousel } from '@/components'
import { ISingleProduct } from '@/types'

interface Props {
  images?: ISingleProduct['images']
  isLoading?: boolean
}

export const ProductCarousel = ({ images, isLoading }: Props) => {
  const zoomImageRef = useRef<HTMLImageElement>(null)
  const [slideIndex, setSlideIndex] = useState(images ? 0 : undefined)
  const [currentImage, setCurrentImage] = useState(images ? images?.[0] : undefined)

  const renderProductImages = images?.map(({ uid, url, name }, index) => {
    return (
      <img
        aria-hidden="true"
        src={url}
        alt={name}
        key={uid}
        className={classNames('border-4 hover:border-primary', {
          'border-primary': index === slideIndex
        })}
        onMouseEnter={() => {
          setSlideIndex(index)
          setCurrentImage(images[index])
        }}
      />
    )
  })

  const handleMouseMove = (e: MouseEvent<HTMLImageElement>) => {
    const imageZoom = zoomImageRef.current
    const image = e.currentTarget

    if (imageZoom) {
      image.style.cursor = 'zoom-in'
      imageZoom.style.opacity = '1'

      // Calculate position of cursor in element
      const offsetX = e.pageX - (image.getBoundingClientRect().x + window.scrollX)
      const offsetY = e.pageY - (image.getBoundingClientRect().y + window.scrollY)

      // Percent position of cursor in element
      const percentOffsetX = (offsetX / image.getBoundingClientRect().width) * 100
      const percentOffsetY = (offsetY / image.getBoundingClientRect().height) * 100

      // Move cursor to edge of image ==> re-calculate position transform
      const transformX = -(percentOffsetX - 50) / 3.5
      const transformY = -(percentOffsetY - 50) / 3.5

      imageZoom.style.transform = `scale(1.5) translateX(${transformX}%) translateY(${transformY}%)`
      imageZoom.style.setProperty('--zoom-x', percentOffsetX + '%')
      imageZoom.style.setProperty('--zoom-y', percentOffsetY + '%')
    }
  }

  const handleMouseLeave = (e: MouseEvent<HTMLImageElement>) => {
    const imageZoom = zoomImageRef.current
    const image = e.currentTarget

    if (imageZoom) {
      image.style.cursor = 'initial'
      imageZoom.style.opacity = '0'
      imageZoom.style.setProperty('--zoom-x', 50 + '%')
      imageZoom.style.setProperty('--zoom-y', 50 + '%')
    }
  }

  return (
    <>
      {isLoading ? (
        <div className={classNames('relative w-full animate-pulse overflow-hidden pt-[100%]')}>
          <img
            src={'/images/loading-image-product.png'}
            alt={'default_image'}
            className="absolute left-0 top-0 h-full w-full object-cover"
          />
        </div>
      ) : currentImage ? (
        <>
          {/* Image preview */}
          <div
            className={classNames('relative w-full overflow-hidden pt-[100%]', {
              'animate-pulse': !currentImage
            })}>
            <img
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              src={
                currentImage ? currentImage.url.split('_')[0] : '/images/loading-image-product.png'
              }
              alt={currentImage ? currentImage.name : 'default_image'}
              className="absolute left-0 top-0 h-full w-full object-cover"
            />
            <img
              ref={zoomImageRef}
              src={currentImage.url.split('_')[0]}
              alt={'zoom_image'}
              className="clip-circle pointer-events-none absolute left-0 top-0 z-10 h-full w-full scale-150 opacity-0"
            />
          </div>
          {/* Carousel */}
          <Carousel
            hoverHiddenControls={false}
            autoplayReverse
            slideIndex={slideIndex}
            className="mt-4"
            cellSpacing={2}
            slidesToShow={5}
            renderBottomCenterControls={null}
            defaultControlsConfig={{
              nextButtonClassName:
                'bg-black/10 px-2 py-4 rounded-r-sm hover:bg-black/25 text-white',
              prevButtonClassName:
                'bg-black/10 px-2 py-4 rounded-r-sm hover:bg-black/25 text-white',
              pagingDotsContainerClassName: 'hidden'
            }}>
            {renderProductImages}
          </Carousel>
        </>
      ) : null}
    </>
  )
}
