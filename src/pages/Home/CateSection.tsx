import { CateBanner } from '@/components'
import { useCateCardBanner } from '@/hooks'

interface Props {}

const CateSection = (props: Props) => {
  const result = useCateCardBanner(10)
  return <CateBanner header="DANH MỤC" grid {...result} />
}

export default CateSection
