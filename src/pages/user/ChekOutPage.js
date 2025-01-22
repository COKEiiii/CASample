import React, { useState } from 'react';
import { ArrowRight, CreditCard, DollarSign, Wallet, ChevronDown, ChevronUp } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronUp, ChevronDown } from 'react-feather'; // Importing icons for the show button

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedItemsForCheckout = [] } = location.state || {};
 
  const [useForPayment, setUseForPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  // Local state for showing all items
  const [showAllItems, setShowAllItems] = useState(false);

  const orderSummary = [
    { name: 'Professional plan', description: 'Monthly subscription', price: 15.00 },
    { name: 'Dedicated support', description: 'Included in the Professional plan', price: 0 },
    { name: 'Hardware', description: 'Devices needed for development', price: 69.99 },
    { name: 'Landing page template', description: 'License', price: 49.99 },
    { name: 'Custom domain', description: 'Annual fee', price: 12.00 },
    { name: 'SSL Certificate', description: 'Annual fee', price: 75.00 },
    { name: 'Email marketing tool', description: 'Monthly subscription', price: 29.99 },
    { name: 'Analytics package', description: 'Advanced insights', price: 39.99 },
    { name: 'Cloud storage', description: '100GB storage', price: 5.99 },
    { name: 'API access', description: 'Developer package', price: 99.99 },
  ];

  // Calculate total price
  //const total = orderSummary.reduce((sum, item) => sum + item.price, 0);
  
  // Display either all items or only the first 4 items
  const displayedItems = showAllItems ? orderSummary : orderSummary.slice(0, 4);
  
  const handleCheckout = () => {
    const selectedItemsForCheckout = cartItems.filter(item => selectedItems[item.id]); // Only selected items
    navigate('/checkout', { state: { selectedItemsForCheckout } }); // Navigate with state
  };
  
  return (
    <div className="min-h-screen flex">
      {/* Left side - Order summary */}
      <div className="hidden lg:flex w-1/2 flex-col justify-center items-center p-16 bg-gray-50">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-extrabold text-blue-600 mb-6">ShoppingCart</h2>
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
            <p className="text-3xl font-bold mb-6">Total: ${total.toFixed(2)}</p>
            <div className="space-y-4 max-h-96 overflow-y-auto pr-4">
              {displayedItems.map((item, index) => (
                <div key={index} className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                  <p className="font-medium">${item.price.toFixed(2)}</p>
                </div>
              ))}
            </div>

            {orderSummary.length > 4 && (
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
          </div>
        </div>
      </div>
      

      {/* Right side - Shipping address form and payment method */}
      <div className="flex items-center justify-center w-full lg:w-1/2 p-12 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Checkout</h2>
          </div>

          <div className="flex justify-between mb-8">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-600 rounded-full mr-2"></div>
              <span className="font-medium text-blue-600">Shipping address</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 border-2 border-gray-300 rounded-full mr-2"></div>
              <span className="text-gray-500">Review order</span>
            </div>
          </div>

          <form className="mt-8 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First name</label>
                <input id="firstName" name="firstName" type="text" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="John" />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last name</label>
                <input id="lastName" name="lastName" type="text" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Doe" />
              </div>
              <div className="col-span-2">
                <label htmlFor="address1" className="block text-sm font-medium text-gray-700 mb-1">Address line 1</label>
                <input id="address1" name="address1" type="text" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="123 Main St" />
              </div>
              <div className="col-span-2">
                <label htmlFor="address2" className="block text-sm font-medium text-gray-700 mb-1">Address line 2</label>
                <input id="address2" name="address2" type="text" className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Apt 4B" />
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input id="city" name="city" type="text" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="New York" />
              </div>
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State</label>
                <input id="state" name="state" type="text" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="NY" />
              </div>
              <div>
                <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">Zip / Postal code</label>
                <input id="zip" name="zip" type="text" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="10001" />
              </div>
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                <select id="country" name="country" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm">
                  <option value="">Select a country</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="UK">United Kingdom</option>
                </select>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="use-for-payment"
                name="use-for-payment"
                type="checkbox"
                checked={useForPayment}
                onChange={() => setUseForPayment(!useForPayment)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="use-for-payment" className="ml-2 block text-sm text-gray-900">
                Use this address for payment details
              </label>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Payment Method</h3>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('credit_card')}
                  className={`flex flex-col items-center justify-center p-2 border rounded-md text-sm ${
                    paymentMethod === 'credit_card' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                  }`}
                >
                  <CreditCard className="mb-1" size={20} />
                  Credit Card
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('paypal')}
                  className={`flex flex-col items-center justify-center p-2 border rounded-md text-sm ${
                    paymentMethod === 'paypal' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                  }`}
                >
                  <DollarSign className="mb-1" size={20} />
                  PayPal
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('digital_wallet')}
                  className={`flex flex-col items-center justify-center p-2 border rounded-md text-sm ${
                    paymentMethod === 'digital_wallet' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                  }`}
                >
                  <Wallet className="mb-1" size={20} />
                  Digital Wallet
                </button>
              </div>
            </div>

            <div>
            <button
              onClick={handleCheckout} // Call handleCheckout on click
              className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors duration-300 text-lg font-semibold">
               Check Out
              </button>

            </div>

            <div>
              <button
                onClick={() => navigate('/placeOrder')}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Next
                <ArrowRight className="ml-2" size={20} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

// import React, { useState } from 'react';
// import { ArrowRight, CreditCard, DollarSign, Wallet, ChevronDown, ChevronUp } from 'lucide-react';

// const CheckoutPage = () => {
//   const [useForPayment, setUseForPayment] = useState(false);
//   const [paymentMethod, setPaymentMethod] = useState('credit_card');
//   const [showAllItems, setShowAllItems] = useState(false);

//   const orderSummary = [
//     { name: 'Professional plan', description: 'Monthly subscription', price: 15.00 },
//     { name: 'Dedicated support', description: 'Included in the Professional plan', price: 0 },
//     { name: 'Hardware', description: 'Devices needed for development', price: 69.99 },
//     { name: 'Landing page template', description: 'License', price: 49.99 },
//     { name: 'Custom domain', description: 'Annual fee', price: 12.00 },
//     { name: 'SSL Certificate', description: 'Annual fee', price: 75.00 },
//     { name: 'Email marketing tool', description: 'Monthly subscription', price: 29.99 },
//     { name: 'Analytics package', description: 'Advanced insights', price: 39.99 },
//     { name: 'Cloud storage', description: '100GB storage', price: 5.99 },
//     { name: 'API access', description: 'Developer package', price: 99.99 },
//   ];

//   const total = orderSummary.reduce((sum, item) => sum + item.price, 0);
//   const displayedItems = showAllItems ? orderSummary : orderSummary.slice(0, 4);

//   return (
//     <div className="min-h-screen flex">
//       {/* Left side - Order summary */}
//       <div className="hidden lg:flex w-1/2 flex-col justify-center items-center p-16 bg-white">
//         <div className="w-full max-w-md">
//           <h2 className="text-2xl font-extrabold text-blue-600 mb-6">ShoppingCart</h2>
//           <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
//           <p className="text-3xl font-bold mb-6">Total: ${total.toFixed(2)}</p>
//           <div className="space-y-4 max-h-96 overflow-y-auto pr-4">
//             {displayedItems.map((item, index) => (
//               <div key={index} className="flex justify-between items-start">
//                 <div>
//                   <p className="font-medium">{item.name}</p>
//                   <p className="text-sm text-gray-500">{item.description}</p>
//                 </div>
//                 <p className="font-medium">${item.price.toFixed(2)}</p>
//               </div>
//             ))}
//           </div>
//           {orderSummary.length > 4 && (
//             <button
//               onClick={() => setShowAllItems(!showAllItems)}
//               className="mt-4 flex items-center text-blue-600 hover:text-blue-800"
//             >
//               {showAllItems ? (
//                 <>
//                   <ChevronUp className="mr-1" size={16} />
//                   Show less
//                 </>
//               ) : (
//                 <>
//                   <ChevronDown className="mr-1" size={16} />
//                   Show all {orderSummary.length} items
//                 </>
//               )}
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Right side - Shipping address form and payment method */}
//       <div className="flex items-center justify-center w-full lg:w-1/2 p-12 bg-gray-50">
//         <div className="w-full max-w-md space-y-8">
//           <div>
//             <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Checkout</h2>
//           </div>

//           <div className="flex justify-between mb-8">
//             <div className="flex items-center">
//               <div className="w-4 h-4 bg-blue-600 rounded-full mr-2"></div>
//               <span className="font-medium text-blue-600">Shipping address</span>
//             </div>
//             <div className="flex items-center">
//               <div className="w-4 h-4 border-2 border-gray-300 rounded-full mr-2"></div>
//               <span className="text-gray-500">Review order</span>
//             </div>
//           </div>

//           <form className="mt-8 space-y-6">
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First name</label>
//                 <input id="firstName" name="firstName" type="text" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="John" />
//               </div>
//               <div>
//                 <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last name</label>
//                 <input id="lastName" name="lastName" type="text" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Doe" />
//               </div>
//               <div className="col-span-2">
//                 <label htmlFor="address1" className="block text-sm font-medium text-gray-700 mb-1">Address line 1</label>
//                 <input id="address1" name="address1" type="text" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="123 Main St" />
//               </div>
//               <div className="col-span-2">
//                 <label htmlFor="address2" className="block text-sm font-medium text-gray-700 mb-1">Address line 2</label>
//                 <input id="address2" name="address2" type="text" className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Apt 4B" />
//               </div>
//               <div>
//                 <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
//                 <input id="city" name="city" type="text" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="New York" />
//               </div>
//               <div>
//                 <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State</label>
//                 <input id="state" name="state" type="text" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="NY" />
//               </div>
//               <div>
//                 <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">Zip / Postal code</label>
//                 <input id="zip" name="zip" type="text" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="10001" />
//               </div>
//               <div>
//                 <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
//                 <select id="country" name="country" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm">
//                   <option value="">Select a country</option>
//                   <option value="US">United States</option>
//                   <option value="CA">Canada</option>
//                   <option value="UK">United Kingdom</option>
//                 </select>
//               </div>
//             </div>

//             <div className="flex items-center">
//               <input
//                 id="use-for-payment"
//                 name="use-for-payment"
//                 type="checkbox"
//                 checked={useForPayment}
//                 onChange={() => setUseForPayment(!useForPayment)}
//                 className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//               />
//               <label htmlFor="use-for-payment" className="ml-2 block text-sm text-gray-900">
//                 Use this address for payment details
//               </label>
//             </div>

//             <div className="space-y-4">
//               <h3 className="text-lg font-medium text-gray-900">Payment Method</h3>
//               <div className="grid grid-cols-3 gap-2">
//                 <button
//                   type="button"
//                   onClick={() => setPaymentMethod('credit_card')}
//                   className={`flex flex-col items-center justify-center p-2 border rounded-md text-sm ${
//                     paymentMethod === 'credit_card' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
//                   }`}
//                 >
//                   <CreditCard className="mb-1" size={20} />
//                   Credit Card
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setPaymentMethod('paypal')}
//                   className={`flex flex-col items-center justify-center p-2 border rounded-md text-sm ${
//                     paymentMethod === 'paypal' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
//                   }`}
//                 >
//                   <DollarSign className="mb-1" size={20} />
//                   PayPal
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setPaymentMethod('digital_wallet')}
//                   className={`flex flex-col items-center justify-center p-2 border rounded-md text-sm ${
//                     paymentMethod === 'digital_wallet' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
//                   }`}
//                 >
//                   <Wallet className="mb-1" size={20} />
//                   Digital Wallet
//                 </button>
//               </div>
//             </div>

//             <div>
//               <button
//                 type="submit"
//                 className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//               >
//                 Next
//                 <ArrowRight className="ml-2" size={20} />
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CheckoutPage;