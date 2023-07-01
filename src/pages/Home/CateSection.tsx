import { CateBanner } from '@/components'
import { useCategoryBannerInfinityQuery, useViewport } from '@/hooks'

const CateSection = () => {
  const device = useViewport()

  const size = device === '' ? 0 : device === 'sm' ? 8 : 16

  const result = useCategoryBannerInfinityQuery(size)

  return <CateBanner header="DANH MỤC" grid {...result} size={size} />
}

export default CateSection
