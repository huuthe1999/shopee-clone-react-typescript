import Product from './Product'

interface Props {}

const ProductList = (props: Props) => {
  return (
    <div className="mt-14" id="product-list">
      <nav className="sticky top-0 z-50 bg-white">
        <ul className="border-b-4 border-primary">
          <li className="text-primary text-center text-base uppercase cursor-pointer font-semibold tracking-wide">
            <button
              className="w-full py-4 px-5"
              onClick={(e) => {
                e.preventDefault()
                const target = document.getElementById('product-list')
                if (target) {
                  target.scrollIntoView()
                }
              }}>
              GỢI Ý HÔM NAY
            </button>
          </li>
        </ul>
      </nav>
      {/* List */}
      <div className="grid grid-cols-6 gap-2 mt-2">
        {[...new Array(48)].map((product, index) => (
          <Product key={index} index={index} />
        ))}
      </div>
    </div>
  )
}

export default ProductList
