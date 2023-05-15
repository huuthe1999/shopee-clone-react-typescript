import { CateBanner } from '@/components'
import { useCategoryBannerInfinityQuery } from '@/hooks'

const CateSection = () => {
  const result = useCategoryBannerInfinityQuery(16)

  return <CateBanner header="DANH MỤC" grid {...result} />
}

export default CateSection
