import { useCardBannerInfinityQuery } from '@/hooks'

import CateBanner from './CateBanner'

interface Props {}

const BottomBanner = (props: Props) => {
  const result = useCardBannerInfinityQuery()
  return <CateBanner {...result} />
}

export default BottomBanner
