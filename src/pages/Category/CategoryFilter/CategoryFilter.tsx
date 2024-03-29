import { HTMLAttributes, useMemo } from 'react'

import classNames from 'classnames'
import { Filter } from 'react-feather'
import { useSearchParams } from 'react-router-dom'

import { Button, CateSection, PingIcon } from '@/components'
import { FILTER_LIST, TFilterType } from '@/data/category'
import { useProvincesQuery, useSubCategoryBySlugQuery } from '@/hooks'
import { IBaseItem } from '@/types'
import { SearchParamsProps } from '@/utils'

import CategoryFilterPrice from './CategoryFilterPrice'
interface Props extends HTMLAttributes<HTMLDivElement> {
  headerText: string
  hasFilter: boolean
  onChangeParam: (params?: SearchParamsProps) => void
}

function CategoryFilter({ headerText, hasFilter, className, onChangeParam }: Props) {
  const [searchParams] = useSearchParams()

  const { data: categoryData } = useSubCategoryBySlugQuery()

  const { data: provincesData } = useProvincesQuery()

  const subCategories = categoryData?.data.data?.subCategories.filter(
    (subCate) => subCate.name !== 'Mặc định'
  )

  const locationData = provincesData?.data.data

  // Filter data
  const subCategoriesObject = {
    type: 'facet' as TFilterType,
    name: 'Theo Danh Mục',
    data: subCategories || []
  }

  // Location data
  const provincesObject = useMemo(() => {
    const locationParams = searchParams.get('locations')?.split(',')

    const sortLocationSelected: IBaseItem[] = []

    locationData?.forEach(({ _id, name }) => {
      if (locationParams?.includes(_id)) {
        sortLocationSelected.unshift({ _id, name })
      } else {
        sortLocationSelected.push({ _id, name })
      }
    }) || []

    return {
      type: 'locations' as TFilterType,
      name: 'Nơi bán',
      data: sortLocationSelected
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.get('locations'), locationData])

  return (
    <div className={classNames('relative flex flex-col gap-y-2', [className])}>
      {/* Header name */}
      <div className="flex gap-x-2 py-2 pt-5 max-sm:hidden">
        <span className="relative">
          {hasFilter && <PingIcon />}
          <Filter size={16} />
        </span>

        <h2 className="font-bold uppercase">{headerText}</h2>
      </div>

      {/* Subcategory filter */}
      {subCategories && <CateSection {...subCategoriesObject} onChangeParam={onChangeParam} />}

      {/* Location filter */}
      <CateSection
        {...provincesObject}
        onChangeParam={onChangeParam}
        className="mb-1 max-h-44 overflow-y-auto"
      />

      {/* Range price */}
      <CategoryFilterPrice />

      {FILTER_LIST.map((cateSection) => {
        return (
          <CateSection
            key={cateSection.type}
            {...cateSection}
            type={cateSection.type as TFilterType}
            onChangeParam={onChangeParam}
          />
        )
      })}

      <Button
        className="mx-auto mt-2 w-full rounded-sm bg-primary py-1 text-sm uppercase text-white max-lg:hidden"
        disabled={!hasFilter}
        onClick={() => onChangeParam()}>
        Xoá tất cả
      </Button>
    </div>
  )
}
export default CategoryFilter
