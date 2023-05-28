import { Loader } from 'react-feather'
import { Link, To } from 'react-router-dom'

export interface BreadCrumbItem {
  path?: To
  name: string
}

interface BreadCrumbProps {
  data: BreadCrumbItem[] | null
  isLoading?: boolean
}

export const BreadCrumb = ({ data, isLoading }: BreadCrumbProps) => {
  const renderBreadCrumb = isLoading
    ? Array(3)
        .fill(null)
        .map((_, index) => (
          <li className="inline-flex items-center gap-x-4" key={index}>
            <svg
              aria-hidden="true"
              className="h-6 w-6 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"></path>
            </svg>
            <Loader className="animate-spin" />
          </li>
        ))
    : data
    ? data.map(({ path, name }, index) => {
        return (
          <li className="inline-flex items-center" key={name}>
            {index !== 0 && (
              <svg
                aria-hidden="true"
                className="h-6 w-6 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"></path>
              </svg>
            )}
            {path ? (
              <Link
                to={path}
                className="text-md inline-flex items-center font-medium text-blue-800">
                {name}
              </Link>
            ) : (
              <span className="text-md line-clamp-1 font-medium text-gray-500">{name}</span>
            )}
          </li>
        )
      })
    : null

  return (
    <nav className="flex text-sm" aria-label="Breadcrumb">
      <ol className="inline-flex flex-wrap items-center">{renderBreadCrumb}</ol>
    </nav>
  )
}
