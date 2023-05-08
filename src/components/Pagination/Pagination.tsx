import { useEffect, useState } from 'react'

import { ChevronLeft, ChevronRight } from 'react-feather'
import ReactPaginate, { ReactPaginateProps } from 'react-paginate'
import { useSearchParams } from 'react-router-dom'

interface Props extends ReactPaginateProps {}

const Pagination = ({ pageCount, onPageChange }: Props) => {
  const [searchParams] = useSearchParams()
  const pageParam = searchParams.get('page')
  const [page, setPage] = useState<number>(0)

  useEffect(() => {
    if (pageParam) {
      setPage(Number(pageParam))
    }
  }, [pageParam])

  return (
    <ReactPaginate
      breakLabel="..."
      previousLabel={
        <div className="h-10 w-10 mr-1 flex justify-center items-center rounded-full bg-gray-200">
          <ChevronLeft size={24} />
        </div>
      }
      nextLabel={
        <div className="h-10 w-10 ml-1 flex justify-center items-center rounded-full bg-gray-200">
          <ChevronRight size={24} />
        </div>
      }
      onPageChange={onPageChange}
      forcePage={page}
      pageRangeDisplayed={3}
      marginPagesDisplayed={2}
      className="flex items-center my-12 justify-center text-black/40 gap-x-2"
      breakClassName="hidden sm:list-item self-stretch w-10 rounded-full transition duration-150 ease-in"
      pageClassName="hidden sm:list-item self-stretch w-10 rounded-full transition duration-150 ease-in"
      breakLinkClassName="h-full flex items-center justify-center"
      pageLinkClassName="h-full flex items-center justify-center"
      // sm:flex justify-center items-center hidden text-center
      activeClassName="bg-primary text-white"
      // pageLinkClassName="text-white"
      disabledLinkClassName="opacity-40 cursor-not-allowed"
      pageCount={pageCount}
      // pageLabelBuilder={(page) => `<${page}>`}
      renderOnZeroPageCount={null}
    />
  )
}

export default Pagination
