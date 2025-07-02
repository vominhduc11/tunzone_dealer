'use client';

import { useProducts } from '@/contexts/ProductContext';

export default function ProductFilters() {
  const {
    filters,
    setFilters,
    resetFilters,
    getCategories,
    getSubcategories,
    getBrands,
    getTags
  } = useProducts();

  const categories = getCategories();
  const subcategories = getSubcategories(filters.category);
  const brands = getBrands();
  const tags = getTags();

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg shadow-xl p-6 animate-slide-right hover:shadow-2xl hover:border-gray-600 transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-100">Bộ Lọc</h3>
        <button
          onClick={resetFilters}
          className="text-sm text-blue-400 hover:text-blue-300 hover:underline transition-all duration-300 hover:scale-105 active:scale-95"
        >
          Xóa Tất Cả
        </button>
      </div>

      <div className="space-y-6">
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Danh Mục
          </label>
          <select
            value={filters.category}
            onChange={(e) => setFilters({ category: e.target.value, subcategory: '' })}
            className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-gray-700/50 backdrop-blur-sm text-gray-100 transition-all duration-300 hover:border-gray-500 focus:scale-105"
          >
            <option value="">Tất Cả Danh Mục</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Subcategory Filter */}
        {filters.category && subcategories.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Danh Mục Con
            </label>
            <select
              value={filters.subcategory}
              onChange={(e) => setFilters({ subcategory: e.target.value })}
              className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-gray-700/50 backdrop-blur-sm text-gray-100 transition-all duration-300 hover:border-gray-500 focus:scale-105"
            >
              <option value="">Tất Cả Danh Mục Con</option>
              {subcategories.map((subcategory) => (
                <option key={subcategory} value={subcategory}>
                  {subcategory}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Brand Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Thương Hiệu
          </label>
          <select
            value={filters.brand}
            onChange={(e) => setFilters({ brand: e.target.value })}
            className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-gray-700/50 backdrop-blur-sm text-gray-100 transition-all duration-300 hover:border-gray-500 focus:scale-105"
          >
            <option value="">Tất Cả Thương Hiệu</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Khoảng Giá Bán Sỉ
          </label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <input
                type="number"
                placeholder="Tối thiểu"
                value={filters.priceRange[0]}
                onChange={(e) => setFilters({ 
                  priceRange: [Number(e.target.value), filters.priceRange[1]] 
                })}
                className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-gray-700/50 backdrop-blur-sm text-gray-100 placeholder-gray-400 transition-all duration-300 hover:border-gray-500 focus:scale-105"
              />
              <span className="text-gray-300">to</span>
              <input
                type="number"
                placeholder="Tối đa"
                value={filters.priceRange[1]}
                onChange={(e) => setFilters({ 
                  priceRange: [filters.priceRange[0], Number(e.target.value)] 
                })}
                className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-gray-700/50 backdrop-blur-sm text-gray-100 placeholder-gray-400 transition-all duration-300 hover:border-gray-500 focus:scale-105"
              />
            </div>
            <div className="text-xs text-gray-300">
              Khoảng hiện tại: ${filters.priceRange[0]} - ${filters.priceRange[1]}
            </div>
          </div>
        </div>

        {/* Rating Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Đánh Giá Tối Thiểu
          </label>
          <select
            value={filters.minRating}
            onChange={(e) => setFilters({ minRating: Number(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-gray-700/50 backdrop-blur-sm text-gray-100 transition-all duration-300 hover:border-gray-500 focus:scale-105"
          >
            <option value={0}>Bất Kỳ Đánh Giá</option>
            <option value={4}>4+ Sao</option>
            <option value={4.5}>4.5+ Sao</option>
            <option value={4.8}>4.8+ Sao</option>
          </select>
        </div>

        {/* In Stock Filter */}
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.inStock}
              onChange={(e) => setFilters({ inStock: e.target.checked })}
              className="h-4 w-4 text-blue-400 focus:ring-blue-400 border-gray-600 rounded bg-gray-700/50 transition-all duration-300 hover:scale-110 focus:scale-110"
            />
            <span className="ml-2 text-sm text-gray-200">
              Chỉ Còn Hàng
            </span>
          </label>
        </div>

        {/* Tags Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Thẻ
          </label>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {tags.map((tag, index) => (
              <label key={`tag-${index}-${tag}`} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.tags.includes(tag)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFilters({ tags: [...filters.tags, tag] });
                    } else {
                      setFilters({ tags: filters.tags.filter(t => t !== tag) });
                    }
                  }}
                  className="h-4 w-4 text-blue-400 focus:ring-blue-400 border-gray-600 rounded bg-gray-700/50 transition-all duration-300 hover:scale-110 focus:scale-110"
                />
                <span className="ml-2 text-sm text-gray-200 capitalize">
                  {tag}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
