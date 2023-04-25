import { useState } from 'react'

import classNames from 'classnames'
import { AnimatePresence } from 'framer-motion'
import NukaCarousel, { InternalCarouselProps } from 'nuka-carousel'
import { ChevronLeft, ChevronRight } from 'react-feather'

import ButtonControl from './ButtonControl'

interface CarouselProps extends Partial<InternalCarouselProps> {}

const Carousel = ({
  cellSpacing,
  wrapAround,
  children,
  withoutControls: hiddenControls,
  slidesToShow,
  slidesToScroll,
  autoplay,
  defaultControlsConfig,
  beforeSlide,
  afterSlide
}: CarouselProps) => {
  const [withoutControls, setWithoutControls] = useState(hiddenControls ?? false)

  return (
    <div
      onMouseEnter={() => {
        setWithoutControls(true)
      }}
      onMouseLeave={() => {
        setWithoutControls(false)
      }}
      role="button"
      tabIndex={0}>
      <NukaCarousel
        cellSpacing={cellSpacing}
        beforeSlide={beforeSlide}
        afterSlide={afterSlide}
        slidesToScroll={slidesToScroll}
        wrapAround={wrapAround}
        autoplay={autoplay}
        slidesToShow={slidesToShow}
        autoplayInterval={2000}
        pauseOnHover={false}
        speed={500}
        renderCenterLeftControls={({ previousSlide, previousDisabled }) => (
          <AnimatePresence>
            {!wrapAround ? ( // Trường hợp disabled infinitely navigate forwards and backwards
              <ButtonControl
                previousSlide={previousSlide}
                previousDisabled={previousDisabled}
                className={classNames(
                  {
                    hidden: previousDisabled
                  },
                  defaultControlsConfig?.prevButtonClassName
                )}>
                <ChevronLeft strokeWidth={3} size={28} />
              </ButtonControl>
            ) : withoutControls ? ( // Trường hợp hover ẩn/hiện next/previous button
              <ButtonControl
                previousSlide={previousSlide}
                previousDisabled={previousDisabled}
                className={classNames(defaultControlsConfig?.prevButtonClassName)}>
                <ChevronLeft strokeWidth={3} size={28} />
              </ButtonControl>
            ) : null}
          </AnimatePresence>
        )}
        renderCenterRightControls={({ nextSlide, nextDisabled }) => {
          return (
            <AnimatePresence>
              {!wrapAround ? (
                <ButtonControl
                  nextSlide={nextSlide}
                  nextDisabled={nextDisabled}
                  className={classNames(
                    {
                      hidden: nextDisabled
                    },
                    defaultControlsConfig?.nextButtonClassName
                  )}>
                  <ChevronRight strokeWidth={3} size={28} />
                </ButtonControl>
              ) : withoutControls ? (
                <ButtonControl
                  nextSlide={nextSlide}
                  nextDisabled={nextDisabled}
                  className={classNames(defaultControlsConfig?.nextButtonClassName)}>
                  <ChevronRight strokeWidth={3} size={28} />
                </ButtonControl>
              ) : null}
            </AnimatePresence>
          )
        }}
        defaultControlsConfig={{
          pagingDotsContainerClassName: `gap-3 ${defaultControlsConfig?.pagingDotsContainerClassName}`,
          pagingDotsClassName: `w-2 h-2 border border-neutral-300 ${defaultControlsConfig?.pagingDotsClassName}`
        }}
        withoutControls={hiddenControls}>
        {children}
      </NukaCarousel>
    </div>
  )
}

export default Carousel
