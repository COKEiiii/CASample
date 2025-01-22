import React, { useState, useEffect } from 'react';

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);  // 存储用户的订单记录
  const [currentPage, setCurrentPage] = useState(1);  // 当前页码
  const [ordersPerPage] = useState(5);  // 每页显示的订单数量
  const [searchTerm, setSearchTerm] = useState(""); // 搜索框的输入值

  // 使用虚拟数据代替从后端获取订单记录
  const fetchOrders = () => {
    const dummyOrders = [
      { orderId: 1, totalPrice: 99.99, status: 'Completed', paymentMethod: 'Credit Card', createdAt: '2024-09-30T12:00:00Z' },
      { orderId: 2, totalPrice: 49.99, status: 'Processing', paymentMethod: 'PayPal', createdAt: '2024-09-29T11:00:00Z' },
      { orderId: 3, totalPrice: 19.99, status: 'Shipped', paymentMethod: 'Credit Card', createdAt: '2024-09-28T14:30:00Z' },
      { orderId: 4, totalPrice: 39.99, status: 'Cancelled', paymentMethod: 'Bank Transfer', createdAt: '2024-09-27T09:15:00Z' },
      { orderId: 5, totalPrice: 29.99, status: 'Completed', paymentMethod: 'Credit Card', createdAt: '2024-09-26T16:45:00Z' },
      { orderId: 6, totalPrice: 69.99, status: 'Completed', paymentMethod: 'PayPal', createdAt: '2024-09-25T10:20:00Z' },
      { orderId: 7, totalPrice: 89.99, status: 'Shipped', paymentMethod: 'Bank Transfer', createdAt: '2024-09-24T18:10:00Z' },
    ];
    setOrders(dummyOrders);
  };

  // 组件加载时获取订单记录
  useEffect(() => {
    fetchOrders();
  }, []);

  // 搜索订单
  const filteredOrders = orders.filter(order => 
    order.orderId.toString().includes(searchTerm) || 
    order.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 计算分页
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  // 分页切换
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-6 border-b flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Order History</h2>
        <input
          type="text"
          placeholder="Search by Order ID or Payment Method"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded px-3 py-2"
        />
      </div>

      {/* 订单列表表格 */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Method</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentOrders.map((order) => (
              <tr key={order.orderId} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{order.orderId}</td>
                <td className="px-6 py-4 whitespace-nowrap">{order.totalPrice}</td>
                <td className="px-6 py-4 whitespace-nowrap">{order.status}</td>
                <td className="px-6 py-4 whitespace-nowrap">{order.paymentMethod}</td>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(order.createdAt).toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button 
                    onClick={() => alert(`Order ${order.orderId} deleted`)} // 用alert代替删除操作
                    className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 分页按钮 */}
      <div className="px-6 py-4 flex justify-between items-center border-t">
        <span>Showing {indexOfFirstOrder + 1} to {Math.min(indexOfLastOrder, filteredOrders.length)} of {filteredOrders.length} orders</span>
        <div>
          {Array.from({ length: Math.ceil(filteredOrders.length / ordersPerPage) }, (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`mx-1 px-3 py-1 rounded ${
                currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}


//关联后端数据的版本：
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// export default function OrderHistory() {
//   const [orders, setOrders] = useState([]);  // 存储用户的订单记录
//   const [currentPage, setCurrentPage] = useState(1);  // 当前页码
//   const [ordersPerPage] = useState(5);  // 每页显示的订单数量
//   const [searchTerm, setSearchTerm] = useState(""); // 搜索框的输入值

//   // 获取用户的订单记录
//   const fetchOrders = async () => {
//     try {
//       const response = await axios.get(`/orders/user/{userId}`);  // 假设通过 userId 获取订单记录
//       setOrders(response.data);
//     } catch (error) {
//       console.error('Error fetching orders:', error);
//     }
//   };

//   // 组件加载时获取订单记录
//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   // 删除订单
//   const handleDeleteOrder = async (orderId) => {
//     try {
//       const response = await axios.delete(`/orders/${orderId}`);  // 删除订单的后端接口
//       if (response.status === 204) {  // 如果删除成功，则重新获取订单数据
//         fetchOrders();
//       }
//     } catch (error) {
//       console.error('Error deleting order:', error);
//     }
//   };

//   // 搜索订单
//   const filteredOrders = orders.filter(order => 
//     order.orderId.toString().includes(searchTerm) || 
//     order.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // 计算分页
//   const indexOfLastOrder = currentPage * ordersPerPage;
//   const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
//   const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

//   // 分页切换
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <div className="bg-white shadow-lg rounded-lg overflow-hidden">
//       <div className="p-6 border-b flex justify-between items-center">
//         <h2 className="text-2xl font-semibold text-gray-800">Order History</h2>
//         <input
//           type="text"
//           placeholder="Search by Order ID or Payment Method"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="border rounded px-3 py-2"
//         />
//       </div>

//       {/* 订单列表表格 */}
//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Price</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Status</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Method</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {currentOrders.map((order) => (
//               <tr key={order.orderId} className="hover:bg-gray-50">
//                 <td className="px-6 py-4 whitespace-nowrap">{order.orderId}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">{order.totalPrice}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">{order.status}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">{order.paymentMethod}</td> {/* 展示支付方式 */}
//                 <td className="px-6 py-4 whitespace-nowrap">{new Date(order.createdAt).toLocaleString()}</td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <button 
//                     onClick={() => handleDeleteOrder(order.orderId)}
//                     className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* 分页按钮 */}
//       <div className="px-6 py-4 flex justify-between items-center border-t">
//         <span>Showing {indexOfFirstOrder + 1} to {Math.min(indexOfLastOrder, filteredOrders.length)} of {filteredOrders.length} orders</span>
//         <div>
//           {Array.from({ length: Math.ceil(filteredOrders.length / ordersPerPage) }, (_, i) => (
//             <button
//               key={i}
//               onClick={() => paginate(i + 1)}
//               className={`mx-1 px-3 py-1 rounded ${
//                 currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//               }`}
//             >
//               {i + 1}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
