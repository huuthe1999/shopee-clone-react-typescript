import { Rating } from '@smastrom/react-rating'

import { customItemStyles } from '@/components'
export const DEFAULT_FILTER_DATA = [
  'facet',
  'locations',
  'maxPrice',
  'minPrice',
  'filters',
  'status',
  'ratingFilter'
]

export const SORT_BY_LIST = [
  {
    type: 'popular',
    text: {
      vi: 'Phổ biến'
    }
  },
  {
    type: 'newest',
    text: {
      vi: 'Mới nhất'
    }
  },
  {
    type: 'sales',
    text: {
      vi: 'Bán chạy'
    }
  },
  {
    type: 'price',
    isDropdown: true,
    text: {
      vi: 'Giá'
    }
  }
]

export const ORDER_LIST = [
  {
    type: 'asc',
    text: {
      vi: 'Thấp đến Cao'
    }
  },
  {
    type: 'desc',
    text: {
      vi: 'Cao đến Thấp'
    }
  }
] as const

export const FILTER_LIST = [
  {
    type: 'filters',
    name: 'Loại Shop',
    data: [
      {
        _id: 1,
        name: 'Shopee Mall'
      },
      {
        _id: 2,
        name: 'Shop Yêu thích'
      }
    ]
  },
  {
    type: 'status',
    name: 'Tình Trạng',
    data: [
      {
        _id: 0,
        name: 'Đã sử dụng'
      },
      {
        _id: 1,
        name: 'Mới'
      }
    ]
  },
  {
    type: 'shippingOptions',
    name: 'Đơn vị vận chuyển',
    data: [
      {
        _id: 0,
        name: 'Hỏa tốc'
      },
      {
        _id: 1,
        name: 'Nhanh'
      },
      {
        _id: 2,
        name: 'Tiết kiệm'
      }
    ]
  },
  {
    type: 'ratingFilter',
    name: 'Đánh Giá',
    data: [
      {
        _id: 5,
        name: (
          <div className="flex gap-x-2">
            <Rating readOnly value={5} itemStyles={customItemStyles} style={{ maxWidth: 100 }} />
            <span className="invisible shrink-0">trở lên</span>
          </div>
        )
      },
      {
        _id: 4,
        name: (
          <div className="flex gap-x-2">
            <Rating readOnly value={4} itemStyles={customItemStyles} style={{ maxWidth: 100 }} />
            <span className="shrink-0">trở lên</span>
          </div>
        )
      },
      {
        _id: 3,
        name: (
          <div className="flex gap-x-2">
            <Rating readOnly value={3} itemStyles={customItemStyles} style={{ maxWidth: 100 }} />
            <span className="shrink-0">trở lên</span>
          </div>
        )
      },
      {
        _id: 2,
        name: (
          <div className="flex gap-x-2">
            <Rating readOnly value={2} itemStyles={customItemStyles} style={{ maxWidth: 100 }} />
            <span className="shrink-0">trở lên</span>
          </div>
        )
      },
      {
        _id: 1,
        name: (
          <div className="flex gap-x-2">
            <Rating readOnly value={1} itemStyles={customItemStyles} style={{ maxWidth: 100 }} />
            <span className="shrink-0">trở lên</span>
          </div>
        )
      }
    ]
  }
]
