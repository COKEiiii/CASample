import React, { useState, useEffect } from 'react';
import { ShoppingCart as Minus, Plus, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import Navbar from '../../components/UserNavBar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import navigation hook

export default function CartPage() {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = (await axios.get('/CartItem')).data;
        console.log('Cart items:', response);
        setCartItems(response);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    const initialSelected = {};
    cartItems.forEach(item => {
      initialSelected[item.id] = selectedItems[item.id] !== undefined ? selectedItems[item.id] : false;
    });
    setSelectedItems(initialSelected);
  }, [cartItems]);

  const toggleLogin = () => setIsLoggedIn(!isLoggedIn);

  const updateQuantity = (id, newQuantity) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, Quantity: Math.max(1, newQuantity) } : item
      )
    );
  };

  const removeItem = async (id) => {
    try {
      await axios.delete(`/CartItem/delete/${id}`); 
      setCartItems(prevItems => prevItems.filter(item => item.id !== id));
      setSelectedItems(prev => {
        const newSelected = { ...prev };
        delete newSelected[id];
        return newSelected;
      });
    } catch (error) {
      console.error(`Error removing item with id ${id}:`, error);
    }
  };

  const toggleSelectItem = (id) => {
    setSelectedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSelectAll = () => {
    const allSelected = Object.values(selectedItems).every(Boolean);
    const newSelectedItems = {};
    cartItems.forEach(item => {
      newSelectedItems[item.id] = !allSelected;
    });
    setSelectedItems(newSelectedItems);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => 
      selectedItems[item.id] ? total + (item.price * item.Quantity) : total, 0
    ).toFixed(2);
  };

  const selectedCount = Object.values(selectedItems).filter(Boolean).length;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = cartItems.slice(indexOfFirstItem, indexOfLastItem);
 
  const handleCheckout = () => {
    const selectedItemsForCheckout = cartItems.filter(item => selectedItems[item.id]); // Only selected items
    navigate('/checkout', { state: { selectedItemsForCheckout } }); // Navigate with state
  };
  
  const totalPages = Math.ceil(cartItems.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-8 py-8">
        <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
          <div className="flex items-center p-4 border-b">
            <input type="checkbox" className="mr-4" onChange={toggleSelectAll} checked={Object.values(selectedItems).every(Boolean)} />
            <div className="flex-grow">Product</div>
            <div className="w-24 text-center">Unit Price</div>
            <div className="w-32 text-center">Quantity</div>
            <div className="w-24 text-center">Total Price</div>
            <div className="w-24 text-center">Action</div>
          </div>

          {currentItems.map(item => (
            <div key={item.id} className="flex items-center p-4 border-b">
              <input
                type="checkbox"
                className="mr-4"
                checked={selectedItems[item.id] || false}
                onChange={() => toggleSelectItem(item.id)}
              />
              <div className="flex-grow flex">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover mr-4" />
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                  <p className="text-xs text-gray-500 mt-1">Category: {item.category.name}</p>
                </div>
              </div>
              <div className="w-24 text-center">${item.price.toFixed(2)}</div>
              <div className="w-32 flex justify-center items-center">
                <button onClick={() => updateQuantity(item.id, item.Quantity - 1)} className="p-1 border rounded">
                  <Minus size={14} />
                </button>
                <input
                  type="text"
                  value={item.Quantity}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 0)}
                  className="w-12 text-center mx-1 border rounded"
                />
                <button onClick={() => updateQuantity(item.id, item.Quantity + 1)} className="p-1 border rounded">
                  <Plus size={14} />
                </button>
              </div>
              <div className="w-24 text-center font-semibold text-blue-600">${(item.price * item.Quantity).toFixed(2)}</div>
              <div className="w-24 text-center">
                <button onClick={() => removeItem(item.id)} className="text-gray-500 hover:text-red-500">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-4 mb-8">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-md bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={16} />
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`w-8 h-8 rounded-md text-sm font-medium ${
                  currentPage === index + 1
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-md bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md">
        <div className="container mx-auto px-8 py-6 flex justify-between items-center">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={Object.values(selectedItems).every(Boolean)}
              onChange={toggleSelectAll}
              className="mr-3 w-5 h-5"
            />
            <button onClick={toggleSelectAll} className="text-gray-600 hover:text-blue-600 text-base">
              Select All ({cartItems.length})
            </button>
            <button onClick={async() => {
              const itemsToDelete = Object.keys(selectedItems).filter(id => selectedItems[id]);
              for (const id of itemsToDelete) {
                await removeItem(parseInt(id));
              }
              setSelectedItems({});
              }} className="ml-6 text-gray-600 hover:text-blue-600 text-base">Delete</button>
            <button onClick={handleCheckout} className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors duration-300 text-lg font-semibold">
            Check Out
            </button>

          </div>
          <div className="flex items-center">
            <span className="mr-4 text-lg">Total ({selectedCount} items): </span>
            <span className="text-3xl font-bold text-blue-600 mr-6">${calculateTotal()}</span>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors duration-300 text-lg font-semibold">
              Check Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
