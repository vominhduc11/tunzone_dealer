'use client';

import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useOrders } from '@/contexts/OrderContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import QRPayment from '@/components/QRPayment';
import { useRouter } from 'next/navigation';

export default function Checkout() {
  const router = useRouter();
  const { user } = useAuth();
  const { items, getWholesaleTotal, clearCart } = useCart();
  const { createOrder } = useOrders();
  
  const [step, setStep] = useState(1); // 1: Info, 2: Payment, 3: Confirmation
  const [paymentMethod, setPaymentMethod] = useState('qr');
  const [orderData, setOrderData] = useState({
    customerInfo: {
      name: user?.name || '',
      email: user?.email || '',
      phone: '',
      company: ''
    },
    shippingAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'USA'
    },
    billingAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'USA'
    },
    notes: ''
  });
  const [sameAsBilling] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState('');

  if (user?.isGuest || items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="text-6xl mb-4">
              {user?.isGuest ? '🔒' : '🛒'}
            </div>
            <h1 className="text-3xl font-bold text-gray-100 mb-4">
              {user?.isGuest ? 'Access Restricted' : 'Cart is Empty'}
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              {user?.isGuest 
                ? 'Checkout is only available to authorized dealers.'
                : 'Add some products to your cart before checking out.'
              }
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const subtotal = getWholesaleTotal();
  const tax = subtotal * 0.08;
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + tax + shipping;

  const handleInputChange = (section: string, field: string, value: string) => {
    if (section) {
      setOrderData(prev => ({
        ...prev,
        [section]: {
          ...((prev[section as keyof typeof prev] as object) || {}),
          [field]: value
        }
      }));
    } else {
      setOrderData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSubmitInfo = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePaymentSuccess = async () => {
    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newOrderId = createOrder({
        customerId: user?.email || '',
        customerInfo: orderData.customerInfo,
        items: items,
        subtotal,
        tax,
        shipping,
        total,
        status: 'confirmed',
        paymentStatus: 'paid',
        paymentMethod: paymentMethod === 'qr' ? 'QR Code Payment' : 'Credit Card',
        shippingAddress: orderData.shippingAddress,
        billingAddress: sameAsBilling ? orderData.shippingAddress : orderData.billingAddress,
        notes: orderData.notes
      });

      setOrderId(newOrderId);
      clearCart();
      setStep(3);
    } catch (error) {
      console.error('Order creation failed:', error);
      alert('Order creation failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-8">
            {[
              { step: 1, title: 'Information', icon: '📋' },
              { step: 2, title: 'Payment', icon: '💳' },
              { step: 3, title: 'Confirmation', icon: '✅' }
            ].map((item) => (
              <div key={item.step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                  step >= item.step 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-400'
                }`}>
                  {step > item.step ? '✓' : item.step}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  step >= item.step 
                    ? 'text-blue-400' 
                    : 'text-gray-500'
                }`}>
                  {item.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg shadow-xl p-6">
                <h2 className="text-2xl font-bold text-gray-100 mb-6">
                  Shipping Information
                </h2>
                
                <form onSubmit={handleSubmitInfo} className="space-y-6">
                  {/* Customer Info */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-100 mb-4">
                      Contact Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={orderData.customerInfo.name}
                          onChange={(e) => handleInputChange('customerInfo', 'name', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700 text-gray-100 placeholder-gray-400"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={orderData.customerInfo.email}
                          onChange={(e) => handleInputChange('customerInfo', 'email', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700 text-gray-100 placeholder-gray-400"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Phone *
                        </label>
                        <input
                          type="tel"
                          required
                          value={orderData.customerInfo.phone}
                          onChange={(e) => handleInputChange('customerInfo', 'phone', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700 text-gray-100 placeholder-gray-400"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Company
                        </label>
                        <input
                          type="text"
                          value={orderData.customerInfo.company}
                          onChange={(e) => handleInputChange('customerInfo', 'company', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700 text-gray-100 placeholder-gray-400"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-100 mb-4">
                      Shipping Address
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Street Address *
                        </label>
                        <input
                          type="text"
                          required
                          value={orderData.shippingAddress.street}
                          onChange={(e) => handleInputChange('shippingAddress', 'street', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700 text-gray-100 placeholder-gray-400"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            City *
                          </label>
                          <input
                            type="text"
                            required
                            value={orderData.shippingAddress.city}
                            onChange={(e) => handleInputChange('shippingAddress', 'city', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700 text-gray-100 placeholder-gray-400"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            State *
                          </label>
                          <input
                            type="text"
                            required
                            value={orderData.shippingAddress.state}
                            onChange={(e) => handleInputChange('shippingAddress', 'state', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700 text-gray-100 placeholder-gray-400"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            ZIP Code *
                          </label>
                          <input
                            type="text"
                            required
                            value={orderData.shippingAddress.zipCode}
                            onChange={(e) => handleInputChange('shippingAddress', 'zipCode', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700 text-gray-100 placeholder-gray-400"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Notes */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Order Notes (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={orderData.notes}
                      onChange={(e) => handleInputChange('', 'notes', e.target.value)}
                      placeholder="Special delivery instructions, preferred delivery time, etc."
                      className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700 text-gray-100 placeholder-gray-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Continue to Payment
                  </button>
                </form>
              </div>
            )}

            {step === 2 && (
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg shadow-xl p-6">
                <h2 className="text-2xl font-bold text-gray-100 mb-6">
                  Payment Method
                </h2>

                <div className="space-y-4 mb-6">
                  <label className="flex items-center p-4 border border-gray-600 rounded-lg cursor-pointer hover:bg-gray-700/50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="qr"
                      checked={paymentMethod === 'qr'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-100">
                        QR Code Payment
                      </div>
                      <div className="text-sm text-gray-400">
                        Scan QR code with your mobile payment app
                      </div>
                    </div>
                  </label>

                  <label className="flex items-center p-4 border border-gray-600 rounded-lg cursor-pointer hover:bg-gray-700/50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-100">
                        Credit Card
                      </div>
                      <div className="text-sm text-gray-400">
                        Pay with Visa, MasterCard, or American Express
                      </div>
                    </div>
                  </label>
                </div>

                {paymentMethod === 'qr' ? (
                  <QRPayment
                    amount={total}
                    orderId={`ORDER-${Date.now()}`}
                    onSuccess={handlePaymentSuccess}
                    onError={(error) => alert(`Payment failed: ${error}`)}
                  />
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Card Number
                      </label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700 text-gray-100 placeholder-gray-400"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700 text-gray-100 placeholder-gray-400"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700 text-gray-100 placeholder-gray-400"
                        />
                      </div>
                    </div>
                    <button
                      onClick={handlePaymentSuccess}
                      disabled={isProcessing}
                      className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                      {isProcessing ? 'Processing...' : `Pay $${total.toFixed(2)}`}
                    </button>
                  </div>
                )}

                <button
                  onClick={() => setStep(1)}
                  className="w-full mt-4 border border-gray-600 text-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-700/50 transition-colors"
                >
                  Back to Information
                </button>
              </div>
            )}

            {step === 3 && (
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg shadow-xl p-6 text-center">
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-2xl font-bold text-gray-100 mb-4">
                  Order Confirmed!
                </h2>
                <p className="text-gray-400 mb-6">
                  Thank you for your order. We&#39;ll send you a confirmation email shortly.
                </p>
                <div className="bg-gray-700/50 rounded-lg p-4 mb-6">
                  <div className="text-sm text-gray-400">Order ID</div>
                  <div className="text-lg font-semibold text-gray-100">{orderId}</div>
                </div>
                <div className="space-y-3">
                  <button
                    onClick={() => router.push('/orders')}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    View Order Details
                  </button>
                  <button
                    onClick={() => router.push('/products')}
                    className="w-full border border-gray-600 text-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-700/50 transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg shadow-xl p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-100 mb-4">
                Order Summary
              </h3>

              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <div className="flex-1">
                      <div className="font-medium text-gray-100">
                        {item.name}
                      </div>
                      <div className="text-gray-400">
                        Qty: {item.quantity}
                      </div>
                    </div>
                    <div className="text-gray-100">
                      ${(item.wholesalePrice * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-600 pt-4 space-y-2">
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-100 pt-2 border-t border-gray-600">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
