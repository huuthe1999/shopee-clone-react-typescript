import { useCateCardBanner } from '@/hooks'

import CateBanner from './CateBanner'

interface Props {}

const BottomBanner = (props: Props) => {
  const result = useCateCardBanner()
  return <CateBanner {...result} />
}

export default BottomBanner
