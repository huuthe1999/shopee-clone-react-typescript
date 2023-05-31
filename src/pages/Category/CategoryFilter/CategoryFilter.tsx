import { HTMLAttributes, memo, useMemo } from 'react'

import classNames from 'classnames'
import { Filter } from 'react-feather'
import { useParams, useSearchParams } from 'react-router-dom'

import { Button, CateSection, PingIcon } from '@/components'
import { FILTER_LIST } from '@/data/category'
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
  const { categorySlug } = useParams()
  const [searchParams] = useSearchParams()

  const { data: categoryData } = useSubCategoryBySlugQuery({
    categorySlug,
    select: ['subCategories']
  })

  const { data: provincesData } = useProvincesQuery()

  const subCategories = categoryData?.data.data?.subCategories.filter(
    (subCate) => subCate.name !== 'Mặc định'
  )

  const locationData = provincesData?.data.data

  // Filter data
  const subCategoriesObject = {
    type: 'facet',
    name: 'Theo Danh Mục',
    data: subCategories || []
  }

  // Location data
  const provincesObject = useMemo(() => {
    const locationParams = searchParams.get('locations')?.split(',')

    const sortLocationSelected: IBaseItem[] = []

    locationData?.forEach(({ idProvince, name }) => {
      if (locationParams?.includes(idProvince)) {
        sortLocationSelected.unshift({ _id: idProvince, name })
      } else {
        sortLocationSelected.push({ _id: idProvince, name })
      }
    }) || []

    return {
      type: 'locations',
      name: 'Nơi bán',
      data: sortLocationSelected
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.get('locations'), locationData])

  return (
    <div className={classNames('flex flex-col gap-y-2', [className])}>
      {/* Header name */}
      <div className="flex gap-x-2 py-2 pt-5">
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

      {/* Default filter */}

      {/* Range price */}
      <CategoryFilterPrice />

      {FILTER_LIST.map((cateSection) => (
        <CateSection key={cateSection.type} {...cateSection} onChangeParam={onChangeParam} />
      ))}

      <Button
        className="mx-auto mt-2 w-full rounded-sm bg-primary py-1 text-sm uppercase text-white"
        disabled={!hasFilter}
        onClick={() => onChangeParam()}>
        Xoá tất cả
      </Button>
    </div>
  )
}
export default memo(CategoryFilter)
