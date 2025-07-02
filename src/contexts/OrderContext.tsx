'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem } from './CartContext';

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    company?: string;
  };
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentMethod: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  billingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  trackingNumber?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  estimatedDelivery?: string;
}

export interface WarrantyRecord {
  id: string;
  productId: string;
  productName: string;
  serialNumber: string;
  orderId: string;
  customerId: string;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
  };
  purchaseDate: string;
  warrantyStart: string;
  warrantyEnd: string;
  warrantyType: string;
  coverage: string[];
  status: 'active' | 'expired' | 'claimed' | 'void';
  claims: WarrantyClaim[];
}

export interface WarrantyClaim {
  id: string;
  warrantyId: string;
  claimDate: string;
  issue: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected' | 'resolved';
  resolution?: string;
  resolvedDate?: string;
}

interface OrderContextType {
  orders: Order[];
  warrantyRecords: WarrantyRecord[];
  createOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt'>) => string;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  updatePaymentStatus: (orderId: string, status: Order['paymentStatus']) => void;
  getOrderById: (id: string) => Order | undefined;
  getOrdersByCustomer: (customerId: string) => Order[];
  getOrdersByStatus: (status: Order['status']) => Order[];
  registerWarranty: (productId: string, serialNumber: string, orderId: string) => void;
  checkWarranty: (serialNumber: string) => WarrantyRecord | undefined;
  createWarrantyClaim: (warrantyId: string, issue: string, description: string) => void;
  getWarrantyBySerial: (serialNumber: string) => WarrantyRecord | undefined;
}

// Sample data - Dealer orders from distributor
const sampleOrders: Order[] = [
  {
    id: 'order-1',
    orderNumber: 'WS-2024-001',
    customerId: 'dealer@tunezone.com',
    customerInfo: {
      name: 'TuneZone Audio Solutions',
      email: 'dealer@tunezone.com',
      phone: '(555) 123-4567',
      company: 'TuneZone Audio Solutions'
    },
    items: [
      {
        id: 'prod-1',
        name: 'Premium Car Speaker Set - 6.5"',
        price: 299.99,
        wholesalePrice: 179.99,
        quantity: 25,
        image: '/api/placeholder/100/100',
        category: 'Car Audio',
        sku: 'TZ-CS-6.5-PRO',
        minOrderQty: 10,
        inStock: 150
      },
      {
        id: 'prod-2',
        name: 'Car Audio Amplifier 500W',
        price: 399.99,
        wholesalePrice: 239.99,
        quantity: 15,
        image: '/api/placeholder/100/100',
        category: 'Amplifiers',
        sku: 'TZ-AMP-500W',
        minOrderQty: 5,
        inStock: 80
      }
    ],
    subtotal: 8099.60,
    tax: 647.97,
    shipping: 0.00,
    total: 8747.57,
    status: 'processing',
    paymentStatus: 'paid',
    paymentMethod: 'Net 30 Terms',
    shippingAddress: {
      street: '123 Audio Street',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90210',
      country: 'USA'
    },
    billingAddress: {
      street: '123 Audio Street',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90210',
      country: 'USA'
    },
    trackingNumber: 'TZ-WS-123456789',
    createdAt: '2024-06-28T10:00:00Z',
    updatedAt: '2024-06-29T14:30:00Z',
    estimatedDelivery: '2024-07-02T18:00:00Z',
    notes: 'Bulk order for summer promotion'
  },
  {
    id: 'order-2',
    orderNumber: 'WS-2024-002',
    customerId: 'dealer@tunezone.com',
    customerInfo: {
      name: 'TuneZone Audio Solutions',
      email: 'dealer@tunezone.com',
      phone: '(555) 123-4567',
      company: 'TuneZone Audio Solutions'
    },
    items: [
      {
        id: 'prod-3',
        name: 'Marine Waterproof Speakers 8"',
        price: 249.99,
        wholesalePrice: 149.99,
        quantity: 30,
        image: '/api/placeholder/100/100',
        category: 'Marine Audio',
        sku: 'TZ-MS-8-WP',
        minOrderQty: 10,
        inStock: 200
      },
      {
        id: 'prod-4',
        name: 'Marine Tower Speaker Pods',
        price: 449.99,
        wholesalePrice: 269.99,
        quantity: 12,
        image: '/api/placeholder/100/100',
        category: 'Marine Audio',
        sku: 'TZ-MS-TWR-POD',
        minOrderQty: 6,
        inStock: 50
      }
    ],
    subtotal: 7739.58,
    tax: 619.17,
    shipping: 150.00,
    total: 8508.75,
    status: 'delivered',
    paymentStatus: 'paid',
    paymentMethod: 'Credit Card',
    shippingAddress: {
      street: '123 Audio Street',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90210',
      country: 'USA'
    },
    billingAddress: {
      street: '123 Audio Street',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90210',
      country: 'USA'
    },
    trackingNumber: 'TZ-WS-987654321',
    createdAt: '2024-06-20T14:30:00Z',
    updatedAt: '2024-06-25T16:45:00Z',
    estimatedDelivery: '2024-06-25T18:00:00Z'
  },
  {
    id: 'order-3',
    orderNumber: 'WS-2024-003',
    customerId: 'dealer@tunezone.com',
    customerInfo: {
      name: 'TuneZone Audio Solutions',
      email: 'dealer@tunezone.com',
      phone: '(555) 123-4567',
      company: 'TuneZone Audio Solutions'
    },
    items: [
      {
        id: 'prod-5',
        name: 'Professional Subwoofer 12"',
        price: 699.99,
        wholesalePrice: 419.99,
        quantity: 20,
        image: '/api/placeholder/100/100',
        category: 'Subwoofers',
        sku: 'TZ-SUB-12-PRO',
        minOrderQty: 5,
        inStock: 75
      }
    ],
    subtotal: 8399.80,
    tax: 671.98,
    shipping: 0.00,
    total: 9071.78,
    status: 'shipped',
    paymentStatus: 'paid',
    paymentMethod: 'Net 30 Terms',
    shippingAddress: {
      street: '123 Audio Street',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90210',
      country: 'USA'
    },
    billingAddress: {
      street: '123 Audio Street',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90210',
      country: 'USA'
    },
    trackingNumber: 'TZ-WS-456789123',
    createdAt: '2024-06-25T09:15:00Z',
    updatedAt: '2024-06-28T11:20:00Z',
    estimatedDelivery: '2024-07-01T18:00:00Z'
  },
  {
    id: 'order-4',
    orderNumber: 'WS-2024-004',
    customerId: 'dealer@tunezone.com',
    customerInfo: {
      name: 'TuneZone Audio Solutions',
      email: 'dealer@tunezone.com',
      phone: '(555) 123-4567',
      company: 'TuneZone Audio Solutions'
    },
    items: [
      {
        id: 'prod-6',
        name: 'Home Theater Speaker Package 5.1',
        price: 1299.99,
        wholesalePrice: 779.99,
        quantity: 8,
        image: '/api/placeholder/100/100',
        category: 'Home Theater',
        sku: 'TZ-HT-5.1-DLX',
        minOrderQty: 2,
        inStock: 25
      },
      {
        id: 'prod-7',
        name: 'Wireless Audio Receiver',
        price: 199.99,
        wholesalePrice: 119.99,
        quantity: 20,
        image: '/api/placeholder/100/100',
        category: 'Receivers',
        sku: 'TZ-RX-WL-HD',
        minOrderQty: 10,
        inStock: 100
      }
    ],
    subtotal: 8639.72,
    tax: 691.18,
    shipping: 0.00,
    total: 9330.90,
    status: 'confirmed',
    paymentStatus: 'paid',
    paymentMethod: 'Wire Transfer',
    shippingAddress: {
      street: '123 Audio Street',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90210',
      country: 'USA'
    },
    billingAddress: {
      street: '123 Audio Street',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90210',
      country: 'USA'
    },
    createdAt: '2024-06-29T16:45:00Z',
    updatedAt: '2024-06-30T08:30:00Z',
    estimatedDelivery: '2024-07-05T18:00:00Z'
  },
  {
    id: 'order-5',
    orderNumber: 'WS-2024-005',
    customerId: 'dealer@tunezone.com',
    customerInfo: {
      name: 'TuneZone Audio Solutions',
      email: 'dealer@tunezone.com',
      phone: '(555) 123-4567',
      company: 'TuneZone Audio Solutions'
    },
    items: [
      {
        id: 'prod-8',
        name: 'Installation Accessories Kit',
        price: 89.99,
        wholesalePrice: 53.99,
        quantity: 50,
        image: '/api/placeholder/100/100',
        category: 'Installation',
        sku: 'TZ-KIT-INST-PRO',
        minOrderQty: 25,
        inStock: 300
      },
      {
        id: 'prod-9',
        name: 'Premium Audio Cables Set',
        price: 49.99,
        wholesalePrice: 29.99,
        quantity: 100,
        image: '/api/placeholder/100/100',
        category: 'Cables',
        sku: 'TZ-CBL-PREM-SET',
        minOrderQty: 50,
        inStock: 500
      }
    ],
    subtotal: 5698.50,
    tax: 455.88,
    shipping: 75.00,
    total: 6229.38,
    status: 'pending',
    paymentStatus: 'pending',
    paymentMethod: 'Net 30 Terms',
    shippingAddress: {
      street: '123 Audio Street',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90210',
      country: 'USA'
    },
    billingAddress: {
      street: '123 Audio Street',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90210',
      country: 'USA'
    },
    createdAt: '2024-06-30T13:20:00Z',
    updatedAt: '2024-06-30T13:20:00Z',
    estimatedDelivery: '2024-07-08T18:00:00Z'
  },
  {
    id: 'order-6',
    orderNumber: 'WS-2024-006',
    customerId: 'dealer@tunezone.com',
    customerInfo: {
      name: 'TuneZone Audio Solutions',
      email: 'dealer@tunezone.com',
      phone: '(555) 123-4567',
      company: 'TuneZone Audio Solutions'
    },
    items: [
      {
        id: 'prod-10',
        name: 'Bluetooth Audio Modules',
        price: 129.99,
        wholesalePrice: 77.99,
        quantity: 40,
        image: '/api/placeholder/100/100',
        category: 'Electronics',
        sku: 'TZ-BT-MOD-V2',
        minOrderQty: 20,
        inStock: 150
      }
    ],
    subtotal: 3119.60,
    tax: 249.57,
    shipping: 50.00,
    total: 3419.17,
    status: 'cancelled',
    paymentStatus: 'refunded',
    paymentMethod: 'Credit Card',
    shippingAddress: {
      street: '123 Audio Street',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90210',
      country: 'USA'
    },
    billingAddress: {
      street: '123 Audio Street',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90210',
      country: 'USA'
    },
    createdAt: '2024-06-15T11:30:00Z',
    updatedAt: '2024-06-16T14:15:00Z',
    notes: 'Cancelled due to inventory shortage at supplier'
  }
];

const sampleWarrantyRecords: WarrantyRecord[] = [
  {
    id: 'warranty-1',
    productId: 'prod-1',
    productName: 'Premium Car Speaker Set',
    serialNumber: 'AM-CS-001234567',
    orderId: 'order-1',
    customerId: 'dealer@tunezone.com',
    customerInfo: {
      name: 'John Smith',
      email: 'john@example.com',
      phone: '(555) 123-4567'
    },
    purchaseDate: '2024-06-25',
    warrantyStart: '2024-06-25',
    warrantyEnd: '2026-06-25',
    warrantyType: 'Limited Warranty',
    coverage: ['Manufacturing defects', 'Material defects'],
    status: 'active',
    claims: []
  }
];

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(sampleOrders);
  const [warrantyRecords, setWarrantyRecords] = useState<WarrantyRecord[]>(sampleWarrantyRecords);

  const createOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt'>) => {
    const newOrder: Order = {
      ...orderData,
      id: Date.now().toString(),
      orderNumber: `ORD-${new Date().getFullYear()}-${String(orders.length + 1).padStart(3, '0')}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setOrders(prev => [newOrder, ...prev]);
    return newOrder.id;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, status, updatedAt: new Date().toISOString() }
        : order
    ));
  };

  const updatePaymentStatus = (orderId: string, newStatus: Order['paymentStatus']) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, paymentStatus: newStatus, updatedAt: new Date().toISOString() }
        : order
    ));
  };

  const getOrderById = (id: string) => {
    return orders.find(order => order.id === id);
  };

  const getOrdersByCustomer = (customerId: string) => {
    return orders.filter(order => order.customerId === customerId);
  };

  const getOrdersByStatus = (status: Order['status']) => {
    return orders.filter(order => order.status === status);
  };

  const registerWarranty = (productId: string, serialNumber: string, orderId: string) => {
    const order = getOrderById(orderId);
    if (!order) return;

    const product = order.items.find(item => item.id === productId);
    if (!product) return;

    const warrantyRecord: WarrantyRecord = {
      id: Date.now().toString(),
      productId,
      productName: product.name,
      serialNumber,
      orderId,
      customerId: order.customerId,
      customerInfo: order.customerInfo,
      purchaseDate: order.createdAt.split('T')[0],
      warrantyStart: order.createdAt.split('T')[0],
      warrantyEnd: new Date(new Date(order.createdAt).getTime() + 2 * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      warrantyType: 'Limited Warranty',
      coverage: ['Manufacturing defects', 'Material defects'],
      status: 'active',
      claims: []
    };

    setWarrantyRecords(prev => [...prev, warrantyRecord]);
  };

  const checkWarranty = (serialNumber: string) => {
    return warrantyRecords.find(record => record.serialNumber === serialNumber);
  };

  const createWarrantyClaim = (warrantyId: string, issue: string, description: string) => {
    const claim: WarrantyClaim = {
      id: Date.now().toString(),
      warrantyId,
      claimDate: new Date().toISOString(),
      issue,
      description,
      status: 'pending'
    };

    setWarrantyRecords(prev => prev.map(record => 
      record.id === warrantyId
        ? { ...record, claims: [...record.claims, claim] }
        : record
    ));
  };

  const getWarrantyBySerial = (serialNumber: string) => {
    return warrantyRecords.find(record => record.serialNumber === serialNumber);
  };

  return (
    <OrderContext.Provider value={{
      orders,
      warrantyRecords,
      createOrder,
      updateOrderStatus,
      updatePaymentStatus,
      getOrderById,
      getOrdersByCustomer,
      getOrdersByStatus,
      registerWarranty,
      checkWarranty,
      createWarrantyClaim,
      getWarrantyBySerial
    }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
}
