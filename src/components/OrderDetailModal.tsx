'use client';

import { Order } from '@/contexts/OrderContext';

interface OrderDetailModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function OrderDetailModal({ order, isOpen, onClose }: OrderDetailModalProps) {
  if (!isOpen || !order) return null;

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

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 text-2xl z-10 transition-colors duration-200"
        aria-label="Đóng"
      >
        ×
      </button>

      {/* Modal */}
      <div className="relative bg-gray-800/90 backdrop-blur-md border border-gray-700 rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gray-800/95 backdrop-blur-md border-b border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-100">Wholesale Order #{order.orderNumber}</h2>
              <p className="text-gray-400">{formatDate(order.createdAt)}</p>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
              <span className="mr-1">{getStatusIcon(order.status)}</span>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Order Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-700/50 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-400 mb-1">
                ${order.total.toFixed(2)}
              </div>
              <div className="text-gray-300">Total Amount</div>
            </div>
            <div className="bg-gray-700/50 rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-400 mb-1">
                {order.items.reduce((sum, item) => sum + item.quantity, 0)}
              </div>
              <div className="text-gray-300">Total Items</div>
            </div>
            <div className="bg-gray-700/50 rounded-lg p-4">
              <div className="text-2xl font-bold text-purple-400 mb-1">
                {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
              </div>
              <div className="text-gray-300">Payment Status</div>
            </div>
          </div>

          {/* Customer & Shipping Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-100 mb-4">Dealer Information</h3>
              <div className="bg-gray-700/30 rounded-lg p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Company:</span>
                  <span className="text-gray-100">{order.customerInfo.company}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Contact:</span>
                  <span className="text-gray-100">{order.customerInfo.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Email:</span>
                  <span className="text-gray-100">{order.customerInfo.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Phone:</span>
                  <span className="text-gray-100">{order.customerInfo.phone}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-100 mb-4">Delivery Address</h3>
              <div className="bg-gray-700/30 rounded-lg p-4">
                <div className="text-gray-100 space-y-1">
                  <div>{order.shippingAddress.street}</div>
                  <div>
                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                  </div>
                  <div>{order.shippingAddress.country}</div>
                </div>
                {order.trackingNumber && (
                  <div className="mt-3 pt-3 border-t border-gray-600">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Tracking:</span>
                      <span className="text-blue-400 font-mono">{order.trackingNumber}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div>
            <h3 className="text-lg font-semibold text-gray-100 mb-4">Wholesale Products</h3>
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div key={index} className="bg-gray-700/30 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gray-600 rounded-lg flex items-center justify-center">
                        <span className="text-xs text-gray-400">IMG</span>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-100">{item.name}</div>
                        <div className="text-sm text-gray-400">SKU: {item.sku}</div>
                        <div className="text-sm text-gray-400">Category: {item.category}</div>
                        <div className="text-sm text-green-400">
                          Wholesale: ${item.wholesalePrice.toFixed(2)} (MSRP: ${item.price.toFixed(2)})
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-100">
                        ${(item.wholesalePrice * item.quantity).toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-400">
                        ${item.wholesalePrice.toFixed(2)} × {item.quantity} units
                      </div>
                      <div className="text-xs text-gray-500">
                        Potential Profit: ${((item.price - item.wholesalePrice) * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Details */}
          <div>
            <h3 className="text-lg font-semibold text-gray-100 mb-4">Payment Details</h3>
            <div className="bg-gray-700/30 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Payment Method:</span>
                    <span className="text-gray-100">{order.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Payment Status:</span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      order.paymentStatus === 'paid' ? 'bg-green-900/50 text-green-300' :
                      order.paymentStatus === 'pending' ? 'bg-yellow-900/50 text-yellow-300' :
                      order.paymentStatus === 'failed' ? 'bg-red-900/50 text-red-300' :
                      'bg-gray-900/50 text-gray-300'
                    }`}>
                      {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Subtotal:</span>
                    <span className="text-gray-100">${order.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Tax:</span>
                    <span className="text-gray-100">${order.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Shipping:</span>
                    <span className="text-gray-100">
                      {order.shipping === 0 ? 'FREE' : `$${order.shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-gray-100 pt-2 border-t border-gray-600">
                    <span>Total:</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Notes */}
          {order.notes && (
            <div>
              <h3 className="text-lg font-semibold text-gray-100 mb-4">Order Notes</h3>
              <div className="bg-gray-700/30 rounded-lg p-4">
                <p className="text-gray-100">{order.notes}</p>
              </div>
            </div>
          )}

          {/* Timeline */}
          <div>
            <h3 className="text-lg font-semibold text-gray-100 mb-4">Order Timeline</h3>
            <div className="bg-gray-700/30 rounded-lg p-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <div>
                    <div className="text-gray-100">Order Created</div>
                    <div className="text-sm text-gray-400">{formatDate(order.createdAt)}</div>
                  </div>
                </div>
                {order.updatedAt !== order.createdAt && (
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <div>
                      <div className="text-gray-100">Last Updated</div>
                      <div className="text-sm text-gray-400">{formatDate(order.updatedAt)}</div>
                    </div>
                  </div>
                )}
                {order.estimatedDelivery && (
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                    <div>
                      <div className="text-gray-100">Estimated Delivery</div>
                      <div className="text-sm text-gray-400">{formatDate(order.estimatedDelivery)}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-gray-800/95 backdrop-blur-md border-t border-gray-700 p-6">
          <div className="flex justify-end space-x-3">
            <button className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700/50 transition-colors duration-200">
              Download Invoice
            </button>
            {order.trackingNumber && (
              <button className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700/50 transition-colors duration-200">
                Track Shipment
              </button>
            )}
            {order.status === 'delivered' && (
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                Reorder Items
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
