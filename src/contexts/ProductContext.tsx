'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  wholesalePrice: number;
  category: string;
  subcategory: string;
  brand: string;
  sku: string;
  images: string[];
  features: string[];
  specifications: Record<string, string>;
  inStock: number;
  minOrderQty: number;
  maxOrderQty?: number;
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  warranty: {
    duration: number;
    type: string;
    coverage: string[];
  };
  tags: string[];
  rating: number;
  reviewCount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ProductFilters {
  category: string;
  subcategory: string;
  brand: string;
  priceRange: [number, number];
  inStock: boolean;
  minRating: number;
  tags: string[];
}

interface ProductContextType {
  products: Product[];
  filteredProducts: Product[];
  searchTerm: string;
  filters: ProductFilters;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  setSearchTerm: (term: string) => void;
  setFilters: (filters: Partial<ProductFilters>) => void;
  setSortBy: (sortBy: string) => void;
  setSortOrder: (order: 'asc' | 'desc') => void;
  resetFilters: () => void;
  getProductById: (id: string) => Product | undefined;
  getProductsByCategory: (category: string) => Product[];
  getBrands: () => string[];
  getCategories: () => string[];
  getSubcategories: (category?: string) => string[];
  getTags: () => string[];
}

// Sample product data
const sampleProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'Premium Car Speaker Set',
    description: 'High-quality 6.5-inch car speakers with crystal clear sound reproduction',
    price: 299.99,
    wholesalePrice: 199.99,
    category: 'Car Audio',
    subcategory: 'Speakers',
    brand: 'AudioMax',
    sku: 'AM-CS-6.5-PRO',
    images: ['/api/placeholder/400/300', '/api/placeholder/400/300'],
    features: ['6.5 inch drivers', '100W RMS', 'Silk dome tweeters', 'Weather resistant'],
    specifications: {
      'Power Handling': '100W RMS / 200W Peak',
      'Frequency Response': '35Hz - 20kHz',
      'Impedance': '4 Ohms',
      'Sensitivity': '92dB',
      'Mounting Depth': '2.5 inches'
    },
    inStock: 150,
    minOrderQty: 5,
    maxOrderQty: 50,
    weight: 2.5,
    dimensions: { length: 7, width: 7, height: 3 },
    warranty: {
      duration: 24,
      type: 'Limited Warranty',
      coverage: ['Manufacturing defects', 'Material defects']
    },
    tags: ['premium', 'car audio', 'speakers', 'high-power'],
    rating: 4.8,
    reviewCount: 124,
    isActive: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-06-20'
  },
  {
    id: 'prod-2',
    name: 'Home Theater 5.1 System',
    description: 'Complete surround sound system with wireless subwoofer',
    price: 1299.99,
    wholesalePrice: 899.99,
    category: 'Home Theater',
    subcategory: 'Complete Systems',
    brand: 'SoundPro',
    sku: 'SP-HT-5.1-WL',
    images: ['/api/placeholder/400/300', '/api/placeholder/400/300'],
    features: ['5.1 Channel', 'Wireless subwoofer', '4K passthrough', 'Bluetooth connectivity'],
    specifications: {
      'Total Power': '500W RMS',
      'Subwoofer': '10 inch wireless',
      'Connectivity': 'HDMI, Optical, Bluetooth',
      'Supported Formats': 'Dolby Digital, DTS'
    },
    inStock: 75,
    minOrderQty: 2,
    maxOrderQty: 20,
    weight: 15.5,
    dimensions: { length: 24, width: 18, height: 12 },
    warranty: {
      duration: 36,
      type: 'Comprehensive Warranty',
      coverage: ['Manufacturing defects', 'Electronic components', 'Remote control']
    },
    tags: ['home theater', 'surround sound', '5.1', 'wireless'],
    rating: 4.6,
    reviewCount: 89,
    isActive: true,
    createdAt: '2024-02-10',
    updatedAt: '2024-06-18'
  },
  {
    id: 'prod-3',
    name: 'Marine Amplifier 4-Channel',
    description: 'Weather-resistant marine amplifier with corrosion protection',
    price: 449.99,
    wholesalePrice: 299.99,
    category: 'Marine Audio',
    subcategory: 'Amplifiers',
    brand: 'MarineTech',
    sku: 'MT-AMP-4CH-WR',
    images: ['/api/placeholder/400/300', '/api/placeholder/400/300'],
    features: ['IPX6 rated', '4-channel', 'Corrosion resistant', 'Variable crossover'],
    specifications: {
      'Power Output': '75W x 4 @ 4 ohms',
      'Signal to Noise': '>95dB',
      'Frequency Response': '10Hz - 50kHz',
      'Protection': 'IPX6 waterproof rating'
    },
    inStock: 45,
    minOrderQty: 3,
    maxOrderQty: 25,
    weight: 4.2,
    dimensions: { length: 12, width: 8, height: 2.5 },
    warranty: {
      duration: 24,
      type: 'Marine Warranty',
      coverage: ['Water damage', 'Corrosion', 'Manufacturing defects']
    },
    tags: ['marine', 'amplifier', 'waterproof', '4-channel'],
    rating: 4.7,
    reviewCount: 67,
    isActive: true,
    createdAt: '2024-03-05',
    updatedAt: '2024-06-15'
  },
  {
    id: 'prod-4',
    name: 'Professional PA System',
    description: 'Commercial-grade PA system for venues and events',
    price: 899.99,
    wholesalePrice: 649.99,
    category: 'Professional Audio',
    subcategory: 'PA Systems',
    brand: 'ProSound',
    sku: 'PS-PA-1000-PRO',
    images: ['/api/placeholder/400/300', '/api/placeholder/400/300'],
    features: ['1000W output', 'Bluetooth connectivity', 'Mixer included', 'Portable design'],
    specifications: {
      'Power Output': '1000W Peak',
      'Frequency Range': '40Hz - 18kHz',
      'Inputs': '4 XLR/TRS combo, 2 RCA',
      'Bluetooth': 'Version 5.0'
    },
    inStock: 25,
    minOrderQty: 1,
    maxOrderQty: 10,
    weight: 28.5,
    dimensions: { length: 18, width: 14, height: 24 },
    warranty: {
      duration: 12,
      type: 'Professional Warranty',
      coverage: ['Manufacturing defects', 'Electronic components']
    },
    tags: ['professional', 'PA system', 'commercial', 'portable'],
    rating: 4.9,
    reviewCount: 156,
    isActive: true,
    createdAt: '2024-01-20',
    updatedAt: '2024-06-22'
  }
];

const defaultFilters: ProductFilters = {
  category: '',
  subcategory: '',
  brand: '',
  priceRange: [0, 2000],
  inStock: false,
  minRating: 0,
  tags: []
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products] = useState<Product[]>(sampleProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFiltersState] = useState<ProductFilters>(defaultFilters);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Filter and search products
  const filteredProducts = products.filter(product => {
    // Search term filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = 
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.brand.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchLower));
      
      if (!matchesSearch) return false;
    }

    // Category filter
    if (filters.category && product.category !== filters.category) return false;
    
    // Subcategory filter
    if (filters.subcategory && product.subcategory !== filters.subcategory) return false;
    
    // Brand filter
    if (filters.brand && product.brand !== filters.brand) return false;
    
    // Price range filter
    if (product.wholesalePrice < filters.priceRange[0] || product.wholesalePrice > filters.priceRange[1]) return false;
    
    // In stock filter
    if (filters.inStock && product.inStock <= 0) return false;
    
    // Rating filter
    if (product.rating < filters.minRating) return false;
    
    // Tags filter
    if (filters.tags.length > 0 && !filters.tags.some(tag => product.tags.includes(tag))) return false;

    return product.isActive;
  }).sort((a, b) => {
    let aValue: string | number, bValue: string | number;
    
    switch (sortBy) {
      case 'price':
        aValue = a.wholesalePrice;
        bValue = b.wholesalePrice;
        break;
      case 'rating':
        aValue = a.rating;
        bValue = b.rating;
        break;
      case 'stock':
        aValue = a.inStock;
        bValue = b.inStock;
        break;
      case 'name':
      default:
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
        break;
    }

    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const setFilters = (newFilters: Partial<ProductFilters>) => {
    setFiltersState(prev => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setFiltersState(defaultFilters);
    setSearchTerm('');
  };

  const getProductById = (id: string) => {
    return products.find(product => product.id === id);
  };

  const getProductsByCategory = (category: string) => {
    return products.filter(product => product.category === category && product.isActive);
  };

  const getBrands = () => {
    return [...new Set(products.map(product => product.brand))].sort();
  };

  const getCategories = () => {
    return [...new Set(products.map(product => product.category))].sort();
  };

  const getSubcategories = (category?: string) => {
    const filtered = category 
      ? products.filter(product => product.category === category)
      : products;
    return [...new Set(filtered.map(product => product.subcategory))].sort();
  };

  const getTags = () => {
    const allTags = products.flatMap(product => product.tags);
    return [...new Set(allTags)].sort();
  };

  return (
    <ProductContext.Provider value={{
      products,
      filteredProducts,
      searchTerm,
      filters,
      sortBy,
      sortOrder,
      setSearchTerm,
      setFilters,
      setSortBy,
      setSortOrder,
      resetFilters,
      getProductById,
      getProductsByCategory,
      getBrands,
      getCategories,
      getSubcategories,
      getTags
    }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}
