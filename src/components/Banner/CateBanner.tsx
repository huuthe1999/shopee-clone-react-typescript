import { useEffect, useRef } from 'react'

import { UseInfiniteQueryResult } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import classNames from 'classnames'

import { Carousel, CateCard, Skeleton } from '@/components'
import { CateCardBanner, ICategory, IDataPaginationResponse, isCategoryResponse } from '@/types'

type Props<T> = UseInfiniteQueryResult<AxiosResponse<T>> & {
  header?: string
  grid?: boolean
  size: number
}

const CateBanner = ({
  size,
  header,
  grid,
  isFetching,
  isInitialLoading,
  data,
  isStale,
  remove,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage
}: Props<IDataPaginationResponse<CateCardBanner[]> | IDataPaginationResponse<ICategory[]>>) => {
  const refMaxSlideIndex = useRef(0)

  // Check if the desired pageParam value is already in the cache
  const pageParamExists = (pageParam: any) => {
    return data?.pageParams.includes(pageParam)
  }

  const renderSkeleton = (
    <div
      className={classNames(
        'grid h-full grid-cols-4 place-items-center gap-2 sm:grid-cols-6 md:grid-cols-9',
        {
          'grid-rows-2': grid
        }
      )}>
      {[...Array(size)].map((_, index) => (
        <Skeleton key={index} />
      ))}
    </div>
  )

  useEffect(() => {
    if (isStale) {
      remove()
    }
  }, [isStale, remove])

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
      <div className="px-6 py-2">
        {/* Header */}
        {header && (
          <h1 className="bg-transparent py-4 text-lg uppercase text-black/50">{header}</h1>
        )}
        {isInitialLoading && renderSkeleton}
        {data?.pages.length && (
          <Carousel
            swiping
            cellSpacing={8}
            afterSlide={(index) => handleFetchNextPage(index)}
            defaultControlsConfig={{
              pagingDotsContainerClassName: isFetching ? '!invisible' : '!top-0 -bottom-3',
              pagingDotsClassName: 'relative translate-y-2',
              nextButtonClassName:
                'relative border-2 border-gray-400 translate-x-1/2 rounded-full bg-white hover:bg-white text-primary p-2 shadow-[0_1px_12px_0px_rgba(0,0,0,0.12)] scale-55 hover:scale-75 transition-all',
              prevButtonClassName:
                'relative border-2 border-gray-400 -translate-x-1/2 rounded-full bg-white hover:bg-white text-primary p-2 shadow-[0_1px_12px_0px_rgba(0,0,0,0.12)] scale-55 hover:scale-75 transition-all'
            }}>
            {data?.pages.map((page) => (
              <div
                key={page.data.data.nextPage}
                className={classNames(
                  'grid h-full grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-9',
                  {
                    'grid-rows-2 place-items-start': grid,
                    'place-items-baseline': !grid
                  }
                )}>
                {page.data.data.items.map((item) =>
                  isCategoryResponse(item) ? (
                    <CateCard
                      key={item._id}
                      name={item.name}
                      link={`${item.slug}-${item._id}`}
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
        )}
      </div>
    </>
  )
}

export default CateBanner
