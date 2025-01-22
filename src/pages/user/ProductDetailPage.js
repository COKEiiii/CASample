import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // 获取 URL 参数
import axios from 'axios'; // 用于发起 HTTP 请求
import { Star, Plus, Minus } from 'lucide-react';
import Navbar from '../../components/UserNavBar';

export default function ProductDetail() {
  const { id } = useParams(); // 从 URL 中获取商品的 ID
  const [product, setProduct] = useState(null); // 商品数据状态
  const [quantity, setQuantity] = useState(1); // 购买数量
  const [loading, setLoading] = useState(true); // 加载状态
  const [error, setError] = useState(null); // 错误状态
  const navigate = useNavigate();

  // check the session - finish
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get('/users/session', { withCredentials: true });
        console.log(response.data)
        if (response.status !== 200) {
          navigate('/signin'); // 如果用户未登录，重定向回登录页面
        }
      } catch (error) {
        navigate('/signin'); // 如果发生错误，重定向到登录页面
      }
    };
  
    checkSession();
  }, [navigate]);

  // 从后端获取商品数据
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/product/${id}`); // 请求后端 API 获取商品详情
        setProduct(response.data);
        setLoading(false); // 加载完成
      } catch (error) {
        console.error('获取商品数据时出错:', error);
        setError('无法获取商品数据');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]); // 当 id 变化时重新获取数据

  // 增加数量
  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  // 减少数量
  const decrementQuantity = () => {
    setQuantity(prev => Math.max(1, prev - 1));
  };

  // 如果数据正在加载，显示加载中
  if (loading) {
    return <div>加载中...</div>;
  }

  // 如果发生错误，显示错误信息
  if (error) {
    return <div>{error}</div>;
  }

  // 如果没有找到商品
  if (!product) {
    return <div>商品未找到</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 导航栏 */}
      <Navbar />

      {/* 商品详情 */}
      <div className="container mx-auto px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 商品图片 */}
          <div>
            <img src={`http://localhost:8080${product.imageUrl}`} alt={product.name} className="w-full h-auto rounded-lg shadow-md" />
          </div>

          {/* 商品信息 */}
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold text-blue-600 mr-2">${product.price.toFixed(2)}</span>
              <span className="text-sm text-gray-500">({product.stock} 库存)</span>
            </div>
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} className={i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"} />
              ))}
              <span className="ml-2 text-sm text-gray-600">
                {product.rating} ({product.reviews ? product.reviews.length : 0} 条评论)
              </span> {/* 确保 reviews 存在 */}
            </div>
            <div className="flex items-center mb-6">
              <button onClick={decrementQuantity} className="bg-gray-200 text-gray-600 px-2 py-1 rounded-l">
                <Minus size={16} />
              </button>
              <span className="bg-gray-100 text-gray-800 px-4 py-1">{quantity}</span>
              <button onClick={incrementQuantity} className="bg-gray-200 text-gray-600 px-2 py-1 rounded-r">
                <Plus size={16} />
              </button>
            </div>
            <button className="bg-blue-500 text-white px-6 py-2 rounded-full text-lg hover:bg-blue-600 transition-colors duration-300">
              添加到购物车
            </button>
          </div>
        </div>

        {/* 评论部分 */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">用户评论</h2>
          <div className="space-y-4">
            {product.reviews && product.reviews.length > 0 ? (
              product.reviews.map(review => (
                <div key={review.id} className="bg-white p-4 rounded-lg shadow">
                  <div className="flex items-center mb-2">
                    <span className="font-semibold mr-2">{review.user}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} className={i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"} />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                  <p className="text-sm text-gray-500 mt-2">{review.date}</p>
                </div>
              ))
            ) : (
              <div>暂无评论</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
