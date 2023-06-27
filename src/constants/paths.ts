export const PATHS = {
  HOME_PATH: '/',
  LOGIN_PATH: '/login',
  REGISTER_PATH: '/register',
  CART_PATH: '/cart',
  CHECKOUT_PATH: '/checkout',
  CHECKOUT_SUCCESS_PATH: '/checkout-success',
  SEARCH_PATH: '/search',
  USER_PATH: '/user',
  USER_PURCHASE_PATH: '/user/purchase',
  USER_ACCOUNT_PATH: '/user/account',
  USER_PROFILE_PATH: '/user/account/profile',
  USER_ADDRESS_PATH: '/user/account/address',
  USER_PASSWORD_PATH: '/user/account/password',
  CATEGORY_PATH: '/:categorySlug',
  PRODUCT_DETAIL_PATH: '/:categorySlug/:productSlug',
  NOT_FOUND_PATH: '/not-found',
  CATCH_ALL_PATH: '*'
}

export const PATHNAMES = {
  [PATHS.HOME_PATH]: 'Trang chủ',
  [PATHS.LOGIN_PATH]: 'Đăng nhập',
  [PATHS.REGISTER_PATH]: 'Đăng kí',
  [PATHS.CART_PATH]: 'Giỏ hàng',
  [PATHS.CHECKOUT_PATH]: 'Thanh toán',
  [PATHS.CHECKOUT_SUCCESS_PATH]: 'Thanh toán thành công',
  [PATHS.SEARCH_PATH]: 'Tìm kiếm',
  [PATHS.USER_PATH]: 'Tôi',
  [PATHS.USER_PURCHASE_PATH]: 'Đơn hàng',
  [PATHS.USER_ACCOUNT_PATH]: 'Tài khoản',
  [PATHS.USER_PROFILE_PATH]: 'Tôi',
  [PATHS.USER_ADDRESS_PATH]: 'Địa chỉ',
  [PATHS.USER_PASSWORD_PATH]: 'Quản lí mật khẩu',
  [PATHS.CATEGORY_PATH]: 'Sản phẩm',
  [PATHS.PRODUCT_DETAIL_PATH]: 'Chi tiết sản phẩm',
  [PATHS.NOT_FOUND_PATH]: 'Trang web không tìm thấy',
  [PATHS.CATCH_ALL_PATH]: 'Trang web không tồn tại'
} as const
