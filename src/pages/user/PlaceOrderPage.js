import React, { useState } from 'react';
import { CreditCard, DollarSign, Wallet, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PlaceOrderPage = () => {
  const navigate = useNavigate();
  const [showAllItems, setShowAllItems] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('credit_card');

  const orderSummary = [
    { name: 'Professional plan', description: 'Monthly subscription', price: 15.00 },
    { name: 'Dedicated support', description: 'Included in the Professional plan', price: 0 },
    { name: 'Hardware', description: 'Devices needed for development', price: 69.99 },
    { name: 'Landing page template', description: 'License', price: 49.99 },
    { name: 'Custom domain', description: 'Annual fee', price: 12.00 },
    { name: 'SSL Certificate', description: 'Annual fee', price: 75.00 },
    { name: 'Email marketing tool', description: 'Monthly subscription', price: 29.99 },
  ];

  // Calculate total price
  const total = orderSummary.reduce((sum, item) => sum + item.price, 0);

  const displayedItems = showAllItems ? orderSummary : orderSummary.slice(0, 3);

  const handlePlaceOrder = () => {
    // Simulate order placement logic here
    alert('Order placed successfully!');
    navigate('/confirmation'); // Navigate to a confirmation page after placing the order
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Place Your Order</h2>
        <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
        <div className="space-y-4">
          {displayedItems.map((item, index) => (
            <div key={index} className="flex justify-between">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
              <p className="font-medium">${item.price.toFixed(2)}</p>
            </div>
          ))}
        </div>

        {orderSummary.length > 3 && (
          <button
            onClick={() => setShowAllItems(!showAllItems)}
            className="mt-4 flex items-center text-blue-600 hover:text-blue-800"
          >
            {showAllItems ? (
              <>
                <ChevronUp className="mr-1" size={16} />
                Show less
              </>
            ) : (
              <>
                <ChevronDown className="mr-1" size={16} />
                Show all {orderSummary.length} items
              </>
            )}
          </button>
        )}

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setPaymentMethod('credit_card')}
              className={`p-2 border rounded-md text-sm ${
                paymentMethod === 'credit_card' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              }`}
            >
              <CreditCard className="mb-1" size={20} />
              Credit Card
            </button>
            <button
              onClick={() => setPaymentMethod('paypal')}
              className={`p-2 border rounded-md text-sm ${
                paymentMethod === 'paypal' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              }`}
            >
              <DollarSign className="mb-1" size={20} />
              PayPal
            </button>
            <button
              onClick={() => setPaymentMethod('digital_wallet')}
              className={`p-2 border rounded-md text-sm ${
                paymentMethod === 'digital_wallet' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              }`}
            >
              <Wallet className="mb-1" size={20} />
              Digital Wallet
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center mt-8">
          <p className="text-lg font-medium">Total:</p>
          <p className="text-3xl font-bold text-blue-600">${total.toFixed(2)}</p>
        </div>

        <button
          onClick={handlePlaceOrder}
          className="w-full mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default PlaceOrderPage;