'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function DealerDashboard() {
  const { user } = useAuth();

  if (user?.isGuest) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="text-6xl mb-4">🔒</div>
            <h1 className="text-3xl font-bold text-gray-100 mb-4">Access Restricted</h1>
            <p className="text-xl text-gray-400 mb-8">
              This page is only available to authorized dealers. Please sign in with your dealer credentials.
            </p>
            <button
              onClick={() => window.location.href = '/become-dealer'}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Apply to Become a Dealer
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Header />
      
      {/* Welcome Section */}
      <section className="bg-blue-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Welcome back, {user?.name || 'Dealer'}!
          </h1>
          <p className="text-xl text-blue-100">
            Manage your dealership and access exclusive resources
          </p>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-6 rounded-lg shadow-xl">
              <div className="text-3xl font-bold text-blue-400 mb-2">24</div>
              <div className="text-gray-300">Active Orders</div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-6 rounded-lg shadow-xl">
              <div className="text-3xl font-bold text-green-400 mb-2">$12,450</div>
              <div className="text-gray-300">Monthly Revenue</div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-6 rounded-lg shadow-xl">
              <div className="text-3xl font-bold text-purple-400 mb-2">156</div>
              <div className="text-gray-300">Products Sold</div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-6 rounded-lg shadow-xl">
              <div className="text-3xl font-bold text-orange-400 mb-2">4.8</div>
              <div className="text-gray-300">Customer Rating</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Orders */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg shadow-xl p-6">
              <h2 className="text-xl font-bold text-gray-100 mb-4">Recent Orders</h2>
              <div className="space-y-4">
                {[
                  { id: '#ORD-001', customer: 'John Smith', product: 'Car Audio System', status: 'Processing', amount: '$899.99' },
                  { id: '#ORD-002', customer: 'Sarah Johnson', product: 'Home Theater', status: 'Shipped', amount: '$1,299.99' },
                  { id: '#ORD-003', customer: 'Mike Wilson', product: 'Marine Speakers', status: 'Delivered', amount: '$449.99' }
                ].map((order) => (
                  <div key={order.id} className="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg">
                    <div>
                      <div className="font-semibold text-gray-100">{order.id}</div>
                      <div className="text-sm text-gray-400">{order.customer} - {order.product}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-100">{order.amount}</div>
                      <div className={`text-sm px-2 py-1 rounded-full ${
                        order.status === 'Processing' ? 'bg-yellow-900/50 text-yellow-300 border border-yellow-700' :
                        order.status === 'Shipped' ? 'bg-blue-900/50 text-blue-300 border border-blue-700' :
                        'bg-green-900/50 text-green-300 border border-green-700'
                      }`}>
                        {order.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 text-blue-400 hover:text-blue-300 font-medium transition-colors">
                View All Orders →
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg shadow-xl p-6">
              <h2 className="text-xl font-bold text-gray-100 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4">
                <Link href="/orders" className="p-4 bg-blue-900/30 border border-blue-700 rounded-lg hover:bg-blue-900/50 transition-colors text-center block">
                  <div className="text-2xl mb-2">📦</div>
                  <div className="font-medium text-gray-100">Đơn Hàng</div>
                </Link>
                <Link href="/sales" className="p-4 bg-green-900/30 border border-green-700 rounded-lg hover:bg-green-900/50 transition-colors text-center block">
                  <div className="text-2xl mb-2">💰</div>
                  <div className="font-medium text-gray-100">Bán Hàng</div>
                </Link>
                <Link href="/products" className="p-4 bg-purple-900/30 border border-purple-700 rounded-lg hover:bg-purple-900/50 transition-colors text-center block">
                  <div className="text-2xl mb-2">🛍️</div>
                  <div className="font-medium text-gray-100">Sản Phẩm</div>
                </Link>
                <Link href="/inventory" className="p-4 bg-orange-900/30 border border-orange-700 rounded-lg hover:bg-orange-900/50 transition-colors text-center block">
                  <div className="text-2xl mb-2">📊</div>
                  <div className="font-medium text-gray-100">Kho Hàng</div>
                </Link>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="mt-8 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg shadow-xl p-6">
            <h2 className="text-xl font-bold text-gray-100 mb-4">Notifications</h2>
            <div className="space-y-3">
              <div className="flex items-center p-3 bg-blue-900/30 border border-blue-700 rounded-lg">
                <div className="text-blue-400 mr-3">📢</div>
                <div>
                  <div className="font-medium text-gray-100">New Product Launch</div>
                  <div className="text-sm text-gray-400">Check out the latest marine audio systems now available</div>
                </div>
              </div>
              <div className="flex items-center p-3 bg-green-900/30 border border-green-700 rounded-lg">
                <div className="text-green-400 mr-3">✅</div>
                <div>
                  <div className="font-medium text-gray-100">Training Complete</div>
                  <div className="text-sm text-gray-400">You&apos;ve completed the Advanced Installation certification</div>
                </div>
              </div>
              <div className="flex items-center p-3 bg-yellow-900/30 border border-yellow-700 rounded-lg">
                <div className="text-yellow-400 mr-3">⚠️</div>
                <div>
                  <div className="font-medium text-gray-100">Inventory Alert</div>
                  <div className="text-sm text-gray-400">Some popular items are running low in stock</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
