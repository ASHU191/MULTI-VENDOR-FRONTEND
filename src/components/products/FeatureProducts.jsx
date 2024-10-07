import { useEffect } from "react";
import { AiFillHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Ratings from "../Ratings";
import { FaShoppingCart } from "react-icons/fa";

import {
  add_to_card,
  messageClear,
  add_to_wishlist,
} from "../../store/reducers/cardReducer";

const FeatureProducts = ({ products }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { successMessage, errorMessage } = useSelector((state) => state.card);

  const add_card = (id) => {
    if (userInfo?.id) {
      dispatch(
        add_to_card({
          userId: userInfo.id,
          quantity: 1,
          productId: id,
        })
      );
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [errorMessage, successMessage, dispatch]);

  const add_wishlist = (pro) => {
    if (userInfo?.id) {
      dispatch(
        add_to_wishlist({
          userId: userInfo.id,
          productId: pro._id,
          name: pro.name,
          price: pro.price,
          image: pro.images[0],
          discount: pro.discount,
          rating: pro.rating,
          slug: pro.slug,
        })
      );
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="w-[85%] flex flex-wrap mx-auto ">
      <div className="w-full">
        <div className="text-center flex justify-center items-center flex-col text-4xl text-slate-600 font-bold relative pb-12">
          <h2>Featured Products</h2>
          <div className="w-[100px] h-[4px] bg-[#7fad39] mt-4"></div>
        </div>
      </div>

      <div className="w-full grid grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6 ">
        {products.map((p) => {
          const discountedPrice = (
            p.price -
            (p.price * p.discount) / 100
          ).toFixed(2);
          const stockStatus = p.stock > 0 ? "In Stock" : "Out of Stock";

          return (
            <div
              key={p._id}
              className="group transition-all duration-700 hover:shadow-xl rounded-lg overflow-hidden bg-gray-200 border border-gray-200 relative hover:scale-105 cursor-pointer"
            >
              <div className="relative overflow-hidden">
                {/* Discount Badge */}
                {p.discount && (
                  <div className="flex justify-center items-center absolute text-white w-8 h-8 rounded-full bg-red-600 font-semibold text-sm left-2 top-2 z-10">
                    {p.discount}%
                  </div>
                )}
                {/* Product Image */}
                <Link to={`/product/details/${p.slug}`} className="group">
                  <div className="relative">
                    <img
                      className="w-full h-[200px] object-contain bg-white transition-shadow duration-300 rounded-t-lg shadow-md p-2"
                      src={p.images[0]}
                      alt={p.name}
                    />
                  </div>
                </Link>
              </div>
              {/* Product Info */}
              <div className="py-4 px-3 text-slate-600">
                {/* Product Name */}
                <h2 className="text-lg sm:text-sm font-semibold mb-2 text-left line-clamp-2  transition-colors relative cursor-pointer">
                  {p.name}
                </h2>
                {/* Price and Stock */}
                <div className="flex justify-between items-center mb-2 ">
                  <div className="flex justify-between items-center w-full">
                    {p.discount ? (
                      <div className="flex flex-col">
                        <span className="text-xl sm:text-sm md:text-[18px] font-bold text-black">
                          ${discountedPrice}
                        </span>
                        <span className="text-sm font-bold text-gray-500 line-through">
                          ${p.price.toFixed(2)}
                        </span>
                      </div>
                    ) : (
                      <span className="text-xl font-bold text-green-600">
                        ${p.price.toFixed(2)}
                      </span>
                    )}

                    <button
                      onClick={() => add_card(p._id)}
                      className="flex h-10 items-center gap-2 py-1 px-2 text-white rounded-md bg-blue-600 hover:bg-blue-800 transition-all  shadow-md cursor-pointer md:hidden"
                    >
                      <span className="font-semibold text-xs">Add to Cart</span>
                    </button>
                    <button
                      onClick={() => add_card(p._id)}
                      className="w-8 h-8 text-white rounded-full bg-blue-600 hover:bg-blue-800 transition-all shadow-md cursor-pointer hidden md:flex justify-center items-center sm:w-6 sm:h-6 sm:text-[12px]"
                    >
                      <FaShoppingCart />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm ">
                  <div className="w-20 flex sm:text-[10px]">
                    {" "}
                    <Ratings ratings={p.rating} />
                  </div>

                  <div className="flex items-center w-full gap-2 justify-end">
                    <button onClick={() => add_wishlist(p)}>
                      <AiFillHeart className="text-pink-500 text-[20px] hover:text-pink-600 sm:text-[15px]" />
                    </button>
                    <span className="sm:text-[10px]">{stockStatus}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FeatureProducts;
