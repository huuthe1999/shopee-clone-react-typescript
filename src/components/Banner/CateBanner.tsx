import { useEffect, useMemo, useRef } from 'react'

import { UseInfiniteQueryResult } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import classNames from 'classnames'

import { Carousel, CateCard, Skeleton } from '@/components'
import { SIZE } from '@/constants'
import { CateCardBannerSuccessResponse, ICategoryResponse, isCategoryResponse } from '@/types'

type Props<T> = UseInfiniteQueryResult<AxiosResponse<T>> & {
  header?: string
  grid?: boolean
}

const CateBanner = ({
  header,
  grid,
  isLoading,
  data,
  isStale,
  remove,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage
}: Props<CateCardBannerSuccessResponse | ICategoryResponse>) => {
  const refMaxSlideIndex = useRef(0)

  // Check if the desired pageParam value is already in the cache
  const pageParamExists = (pageParam: any) => {
    return data?.pageParams.includes(pageParam)
  }

  const renderSkeleton = useMemo(
    () => (
      <div className="grid grid-cols-8 py-2 gap-2">
        {[...Array(SIZE)].map((_, index) => (
          <Skeleton key={index} />
        ))}
      </div>
    ),
    []
  )
  useEffect(() => {
    if (isStale) {
      remove()
    }
  }, [])

  const handleFetchNextPage = (index: number) => {
    // Kiểm tra xem nếu next page index > current index ==> Tiếp tục cho fetch data
    // Kiểm tra xem trong cache có chứa pageParam đã fetch rồi hay chưa, tránh fetch lại data khi chuyển trang
    if (index > refMaxSlideIndex.current && !pageParamExists(index + 1)) {
      refMaxSlideIndex.current = Math.max(refMaxSlideIndex.current, index)
      fetchNextPage()
    }
  }
  return (
    <>
      {data?.pages.length && (
        <div className="pb-4 px-6">
          {/* Header */}
          {header && (
            <h1 className="bg-transparent text-lg py-4 uppercase text-black/50">{header}</h1>
          )}
          <Carousel
            cellSpacing={4}
            afterSlide={(index) => handleFetchNextPage(index)}
            defaultControlsConfig={{
              pagingDotsContainerClassName: '!top-0 -bottom-3',
              pagingDotsClassName: 'relative translate-y-2',
              nextButtonClassName:
                'relative border-2 border-gray-400 translate-x-1/2 rounded-full bg-white hover:bg-white text-primary p-2 shadow-[0_1px_12px_0px_rgba(0,0,0,0.12)] scale-55 hover:scale-75 transition-all',
              prevButtonClassName:
                'relative border-2 border-gray-400 -translate-x-1/2 rounded-full bg-white hover:bg-white text-primary p-2 shadow-[0_1px_12px_0px_rgba(0,0,0,0.12)] scale-55 hover:scale-75 transition-all'
            }}>
            {isLoading
              ? renderSkeleton
              : data?.pages.map((page) => (
                  <div
                    key={page.data.data.nextPage}
                    className={classNames('grid grid-cols-8', {
                      'grid-rows-2': grid
                    })}>
                    {page.data.data.items.map((item) =>
                      isCategoryResponse(item) ? (
                        <CateCard
                          key={item._id}
                          name={item.name}
                          link={item.slug}
                          image={item.images[0].url}
                        />
                      ) : (
                        <CateCard key={item._id} image={item.image} name={item.text} />
                      )
                    )}
                  </div>
                ))}
            {(hasNextPage || isFetchingNextPage) && renderSkeleton}
          </Carousel>
        </div>
      )}
    </>
  )
}

export default CateBanner
