'use client';

import { useState, useEffect } from 'react';

interface QRPaymentProps {
  amount: number;
  orderId: string;
  onSuccess: () => void;
  onError: (error: string) => void;
}

export default function QRPayment({ amount, orderId, onSuccess, onError }: QRPaymentProps) {
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'processing' | 'success' | 'failed'>('pending');
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes

  // Generate QR code data (in real implementation, this would come from payment processor)
  useEffect(() => {
    const paymentData = {
      amount: amount.toFixed(2),
      orderId,
      merchant: 'TuneZone Distributors',
      timestamp: Date.now().toString()
    };
    
    // In real implementation, you would generate actual QR code
    // For demo, we'll create a mock QR code string
    const qrData = `tunezone://pay?${new URLSearchParams(paymentData).toString()}`;
    console.log('QR Data:', qrData); // Use the qrData instead of storing it
  }, [amount, orderId]);

  // Countdown timer
  useEffect(() => {
    if (timeLeft > 0 && paymentStatus === 'pending') {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      onError('Payment timeout. Please try again.');
    }
  }, [timeLeft, paymentStatus, onError]);

  // Simulate payment status checking
  useEffect(() => {
    if (paymentStatus === 'pending') {
      const checkPayment = setInterval(() => {
        // Simulate random payment success for demo
        if (Math.random() > 0.95) {
          setPaymentStatus('success');
          clearInterval(checkPayment);
          setTimeout(onSuccess, 1000);
        }
      }, 2000);

      return () => clearInterval(checkPayment);
    }
  }, [paymentStatus, onSuccess]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleManualConfirm = () => {
    setPaymentStatus('processing');
    // Simulate payment processing
    setTimeout(() => {
      setPaymentStatus('success');
      setTimeout(onSuccess, 1000);
    }, 2000);
  };

  return (
    <div className="text-center">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-100 mb-2">
          Scan QR Code to Pay
        </h3>
        <p className="text-sm text-gray-400">
          Use your mobile payment app to scan the QR code below
        </p>
      </div>

      {/* QR Code Display */}
      <div className="flex justify-center mb-6">
        <div className="bg-white p-6 rounded-lg shadow-xl">
          {/* Mock QR Code - In real implementation, use a QR code library */}
          <div className="w-48 h-48 bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">📱</div>
              <div className="text-xs text-gray-500 px-4">
                QR Code for ${amount.toFixed(2)}
              </div>
              <div className="text-xs text-gray-400 mt-2">
                Order: {orderId}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Status */}
      <div className="mb-6">
        {paymentStatus === 'pending' && (
          <div className="flex items-center justify-center space-x-2 text-blue-400">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400"></div>
            <span>Waiting for payment...</span>
          </div>
        )}
        
        {paymentStatus === 'processing' && (
          <div className="flex items-center justify-center space-x-2 text-yellow-400">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-400"></div>
            <span>Processing payment...</span>
          </div>
        )}
        
        {paymentStatus === 'success' && (
          <div className="flex items-center justify-center space-x-2 text-green-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Payment successful!</span>
          </div>
        )}
      </div>

      {/* Timer */}
      {paymentStatus === 'pending' && (
        <div className="mb-6">
          <div className="text-sm text-gray-400 mb-2">
            QR code expires in:
          </div>
          <div className="text-2xl font-mono font-bold text-red-400">
            {formatTime(timeLeft)}
          </div>
        </div>
      )}

      {/* Payment Instructions */}
      <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4 mb-6">
        <h4 className="text-sm font-semibold text-blue-300 mb-2">
          How to pay:
        </h4>
        <ol className="text-xs text-blue-400 text-left space-y-1">
          <li>1. Open your mobile payment app (PayPal, Venmo, etc.)</li>
          <li>2. Scan the QR code above</li>
          <li>3. Confirm the payment amount: ${amount.toFixed(2)}</li>
          <li>4. Complete the payment in your app</li>
          <li>5. Wait for confirmation</li>
        </ol>
      </div>

      {/* Manual Confirmation (for demo purposes) */}
      <div className="border-t border-gray-700 pt-4">
        <p className="text-xs text-gray-400 mb-3">
          Demo: Click below to simulate successful payment
        </p>
        <button
          onClick={handleManualConfirm}
          disabled={paymentStatus !== 'pending'}
          className="bg-green-600 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Simulate Payment Success
        </button>
      </div>

      {/* Supported Payment Methods */}
      <div className="mt-6 pt-4 border-t border-gray-700">
        <div className="text-xs text-gray-400 mb-2">
          Supported payment methods:
        </div>
        <div className="flex justify-center space-x-4 text-2xl">
          <span title="PayPal">💙</span>
          <span title="Venmo">💜</span>
          <span title="Apple Pay">🍎</span>
          <span title="Google Pay">🟢</span>
          <span title="Samsung Pay">📱</span>
        </div>
      </div>
    </div>
  );
}
