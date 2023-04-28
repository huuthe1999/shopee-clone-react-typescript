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
