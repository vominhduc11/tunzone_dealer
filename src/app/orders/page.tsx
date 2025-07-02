'use client';

import { useState, useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useOrders, Order } from '@/contexts/OrderContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import OrderDetailModal from '@/components/OrderDetailModal';
import Link from 'next/link';

type OrderStatus = 'all' | 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
type SortOption = 'date-desc' | 'date-asc' | 'amount-desc' | 'amount-asc' | 'status';

export default function OrdersPage() {
  const { user } = useAuth();
  const { orders } = useOrders();
  const [statusFilter, setStatusFilter] = useState<OrderStatus>('all');
  const [sortBy, setSortBy] = useState<SortOption>('date-desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter and sort orders
  const filteredAndSortedOrders = useMemo(() => {
    let filtered = orders;

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(order => 
        order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.items.some(item => 
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Sort orders
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date-desc':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'date-asc':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'amount-desc':
          return b.total - a.total;
        case 'amount-asc':
          return a.total - b.total;
        case 'status':
          return a.status.localeCompare(b.status);
        default:
          return 0;
      }
    });

    return filtered;
  }, [orders, statusFilter, sortBy, searchTerm]);

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-900/50 border-yellow-700 text-yellow-300';
      case 'confirmed':
        return 'bg-blue-900/50 border-blue-700 text-blue-300';
      case 'processing':
        return 'bg-purple-900/50 border-purple-700 text-purple-300';
      case 'shipped':
        return 'bg-indigo-900/50 border-indigo-700 text-indigo-300';
      case 'delivered':
        return 'bg-green-900/50 border-green-700 text-green-300';
      case 'cancelled':
        return 'bg-red-900/50 border-red-700 text-red-300';
      default:
        return 'bg-gray-900/50 border-gray-700 text-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return '⏳';
      case 'confirmed':
        return '✅';
      case 'processing':
        return '⚙️';
      case 'shipped':
        return '🚚';
      case 'delivered':
        return '📦';
      case 'cancelled':
        return '❌';
      default:
        return '📋';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (user?.isGuest) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="text-6xl mb-4">🔒</div>
            <h1 className="text-3xl font-bold text-gray-100 mb-4">Access Restricted</h1>
            <p className="text-xl text-gray-400 mb-8">
              Wholesale order history is only available to authorized dealers.
            </p>
            <Link
              href="/dealer-login"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
            >
              Sign In as Dealer
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-100 mb-2">My Wholesale Orders</h1>
          <p className="text-gray-400">Track your orders from TuneZone Distributors</p>
        </div>

        {/* Filters and Search */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg shadow-xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Search Orders
              </label>
              <input
                type="text"
                placeholder="Search by order number, product name, or SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700 text-gray-100 placeholder-gray-400"
              />
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as OrderStatus)}
                className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700 text-gray-100"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700 text-gray-100"
              >
                <option value="date-desc">Newest First</option>
                <option value="date-asc">Oldest First</option>
                <option value="amount-desc">Highest Amount</option>
                <option value="amount-asc">Lowest Amount</option>
                <option value="status">Status</option>
              </select>
            </div>
          </div>
        </div>

        {/* Orders Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg shadow-xl p-6">
            <div className="text-2xl font-bold text-blue-400 mb-2">{orders.length}</div>
            <div className="text-gray-300">Total Orders</div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg shadow-xl p-6">
            <div className="text-2xl font-bold text-green-400 mb-2">
              {orders.filter(o => o.status === 'delivered').length}
            </div>
            <div className="text-gray-300">Delivered</div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg shadow-xl p-6">
            <div className="text-2xl font-bold text-yellow-400 mb-2">
              {orders.filter(o => ['pending', 'confirmed', 'processing', 'shipped'].includes(o.status)).length}
            </div>
            <div className="text-gray-300">In Progress</div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg shadow-xl p-6">
            <div className="text-2xl font-bold text-purple-400 mb-2">
              ${orders.reduce((sum, order) => sum + order.total, 0).toLocaleString()}
            </div>
            <div className="text-gray-300">Total Invested</div>
          </div>
        </div>

        {/* Orders List */}
        {filteredAndSortedOrders.length === 0 ? (
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg shadow-xl p-12 text-center">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-xl font-semibold text-gray-100 mb-2">No Orders Found</h3>
            <p className="text-gray-400 mb-6">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your filters or search terms.'
                : 'You haven\'t placed any wholesale orders yet.'
              }
            </p>
            {!searchTerm && statusFilter === 'all' && (
              <Link
                href="/products"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
              >
                Browse Wholesale Catalog
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredAndSortedOrders.map((order) => (
              <div
                key={order.id}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg shadow-xl hover:shadow-2xl hover:border-gray-600 transition-all duration-300"
              >
                {/* Order Header */}
                <div className="p-6 border-b border-gray-700">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex items-center space-x-4 mb-4 md:mb-0">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-100">
                          Order #{order.id}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {formatDate(order.createdAt)}
                        </p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                        <span className="mr-1">{getStatusIcon(order.status)}</span>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-xl font-bold text-green-400">
                          ${order.total.toFixed(2)}
                        </div>
                        <div className="text-sm text-gray-400">
                          {order.items.reduce((sum, item) => sum + item.quantity, 0)} items
                        </div>
                      </div>
                      <button
                        onClick={() => handleOrderClick(order)}
                        className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* Pagination (if needed) */}
        {filteredAndSortedOrders.length > 10 && (
          <div className="mt-8 flex justify-center">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg shadow-xl p-4">
              <div className="flex items-center space-x-2">
                <button className="px-3 py-2 border border-gray-600 text-gray-300 rounded hover:bg-gray-700/50 transition-colors duration-200">
                  Previous
                </button>
                <span className="px-4 py-2 text-gray-100">Page 1 of 1</span>
                <button className="px-3 py-2 border border-gray-600 text-gray-300 rounded hover:bg-gray-700/50 transition-colors duration-200">
                  Next
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Order Detail Modal */}
        <OrderDetailModal
          order={selectedOrder}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>

      <Footer />
    </div>
  );
}
