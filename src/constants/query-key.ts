export const QUERY_KEYS = {
  order: {
    list: 'order/list',
    complete: 'order/complete',
    briefList: 'order/brief-list',
    update: 'order/update-or-delete'
  },
  favProducts: 'favorite-products',
  address: {
    list: 'address/list',
    province: 'province',
    district: 'district',
    ward: 'ward'
  },
  subCategory: 'sub-category',
  product: {
    list: 'product/list',
    suggest: 'product/suggest',
    detail: 'product-detail'
  },
  category: {
    list: 'category/list',
    banner: 'category/banner'
  },
  profile: 'profile',
  refreshToken: 'refreshToken'
} as const
