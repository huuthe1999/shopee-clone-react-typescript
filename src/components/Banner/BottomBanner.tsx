import { useCardBannerInfinityQuery, useViewport } from '@/hooks'

import CateBanner from './CateBanner'

const BottomBanner = () => {
  const device = useViewport()

  const size = device === '' ? 0 : device === 'sm' ? 4 : device === 'md' ? 6 : 8
  const result = useCardBannerInfinityQuery(size)
  return <CateBanner {...result} size={size} />
}

export default BottomBanner
