import { lazy } from 'react'

import classNames from 'classnames'

import emptyCheckout from '@/assets/images/emptyCheckout.png'
import { Button } from '@/components'
import { useOrderInfinityQuery } from '@/hooks'
const UserPurchaseRow = lazy(() => import('./components/UserPurchaseRow'))

const UserPurchase = () => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useOrderInfinityQuery()

  if (!data?.pages[0].data.totalItems) {
    return (
      <div className="my-4 flex flex-col items-center gap-y-4">
        <img src={emptyCheckout} alt="empty-order" className="aspect-square w-fit max-w-xs" />
        <p className="text-md line-clamp-2 lg:text-xl">Chưa có đơn hàng</p>
      </div>
    )
  }

  return (
    <>
      <div
        className={classNames('flex flex-col gap-y-2 bg-neutral-100', {
          'last-of-type:pb-2': hasNextPage
        })}>
        {data?.pages.map((currentPage) => (
          <div
            className="flex flex-col gap-y-2 divide-y divide-gray-200  last-of-type:divide-transparent"
            key={currentPage.data.nextPage}>
            {currentPage.data.items.map((order) => {
              return <UserPurchaseRow key={order._id} {...order} />
            })}
          </div>
        ))}
      </div>
      {hasNextPage && (
        <Button
          isLoading={isFetchingNextPage}
          disabled={!hasNextPage || isFetchingNextPage}
          onClick={() => fetchNextPage()}
          className={classNames(
            'm-auto my-6 block w-fit border border-gray-200 bg-white px-6 py-2 text-black/80 transition-colors',
            {
              'hover:bg-neutral-200': hasNextPage
            }
          )}>
          {isFetchingNextPage ? 'Đang tải' : hasNextPage ? 'Tải thêm' : 'Hết'}
        </Button>
      )}
    </>
  )
}

export default UserPurchase
