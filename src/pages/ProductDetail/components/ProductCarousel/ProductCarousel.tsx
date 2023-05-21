import { useState } from 'react'

import classNames from 'classnames'

import { Carousel } from '@/components'
import { ISingleProduct } from '@/types'

interface Props {
  images?: ISingleProduct['images']
}

export const ProductCarousel = ({ images }: Props) => {
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
        onClick={() => {
          setSlideIndex(index)
          setCurrentImage({ uid, url, name })
        }}
        onMouseEnter={() => {
          setSlideIndex(index)
          setCurrentImage(images[index])
        }}
      />
    )
  })

  return (
    <>
      {/* Image preview */}
      <div
        className={classNames('relative w-full pt-[100%]', {
          'animate-pulse': !currentImage
        })}>
        <img
          src={currentImage ? currentImage?.url : '/images/loading-image-product.png'}
          alt={currentImage ? currentImage?.name : 'default_image'}
          className="absolute left-0 top-0 h-full w-full object-cover"
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
          nextButtonClassName: 'bg-black/10 px-2 py-4 rounded-r-sm hover:bg-black/25 text-white',
          prevButtonClassName: 'bg-black/10 px-2 py-4 rounded-r-sm hover:bg-black/25 text-white',
          pagingDotsContainerClassName: 'hidden'
        }}>
        {renderProductImages}
      </Carousel>
    </>
  )
}
