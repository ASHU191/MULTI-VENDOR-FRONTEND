import React, { useEffect, useState } from "react";
import { GrMail } from "react-icons/gr";
import { AiFillShop } from "react-icons/ai";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import {
  FaLinkedinIn,
  FaFacebookF,
  FaUser,
  FaLock,
  FaList,
  FaSearch,
} from "react-icons/fa";
import {
  AiOutlineTwitter,
  AiFillGithub,
  AiFillHeart,
  AiFillShopping,
} from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  get_card_products,
  get_wishlist_products,
} from "../store/reducers/cardReducer";
import { CiUser } from "react-icons/ci";

const Headers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categorys } = useSelector((state) => state.home);
  const { userInfo } = useSelector((state) => state.auth);
  const { card_product_count, wishlist_count } = useSelector(
    (state) => state.card
  );

  const { pathname } = useLocation();
  const [showShidebar, setShowShidebar] = useState(true);
  const [categoryShow, setCategoryShow] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [category, setCategory] = useState("");

  const search = () => {
    navigate(`/products/search?category=${category}&&value=${searchValue}`);
  };

  const redirect_card_page = () => {
    if (userInfo) {
      navigate(`/card`);
    } else {
      navigate(`/login`);
    }
  };

  useEffect(() => {
    if (userInfo) {
      dispatch(get_card_products(userInfo.id));
      dispatch(get_wishlist_products(userInfo.id));
    }
  }, [userInfo, dispatch]);

  return (
    <>
      {/* TOP NAVBAR */}
      <div className="header-top bg-gray-800 lg:w-full sm:h-8 xs:hidden">
        <div className="w-[85%] lg:w-[90%] mx-auto">
          <div className="flex justify-between items-center h-[40px] sm:h-[32px] lg:h-[40px] text-white">
            {" "}
          
            <ul className="flex items-center gap-8">
              <li className="flex relative justify-center items-center gap-2 text-sm after:absolute after:h-[14px] after:w-[1px] after:bg-gray-500 after:-right-[16px] sm:hidden">
                <span>
                  <GrMail className="text-lg sm:text-[15px]" />{" "}
                
                </span>
                <span className="sm:text-[10px]">tahasheikh7184@gmail.com</span>
              </li>
              <div className="text-center text-gray-400 pt-1 sm:text-[14px]">
                <p>
                  <a
                    target="_black"
                    className="text-blue-500"
                    href="http://localhost:3001/register"
                  >
                    Register
                  </a>{" "}
                  seller account
                </p>
              </div>
            </ul>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-gray-300 transition-colors">
                <FaFacebookF className="text-white text-lg sm:text-[15px]" />
              </a>
              <a href="#" className="hover:text-gray-300 transition-colors">
                <AiOutlineTwitter className="text-white text-lg sm:text-[15px]" />
              </a>
              <a href="#" className="hover:text-gray-300 transition-colors">
                <FaLinkedinIn className="text-white text-lg sm:text-[15px]" />
              </a>
              <a href="#" className="hover:text-gray-300 transition-colors">
                <AiFillGithub className="text-white text-lg sm:text-[15px]" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* NAVBAR */}
      <div className="w-full flex sm:flex-col items-center py-3 px-3 bg-gray-900 sm:gap-0 sm:py-2 sm:pt-1 gap-5 justify-center">
        <div className="flex items-center sm:justify-between sm:w-full w-1/6  ">
          <Link to="/">
            <img
              className="sm:w-20"
              width={"150px"}
              src="http://localhost:3000/images/logo.png"
              alt="logo"
            />
          </Link>

          <div className="hidden sm:block ">
            {userInfo ? (
              <Link
                className="flex cursor-pointer justify-center items-center gap-1 text-sm"
                to="/dashboard"
              >
                <div className="w-12 h-12 xs:w-8 xs:h-8 rounded-full flex justify-center items-center">
                  <CiUser className="text-white text-2xl xs:text-xl" />
                </div>
                <span className="text-white flex-1 whitespace-nowrap text-sm xs:text-xs">
                  {userInfo.name}
                </span>
              </Link>
            ) : (
              <div className="flex items-center gap-1">
                <span className="w-12 h-12 rounded-full flex justify-center items-center"></span>
                <Link
                  to="/login"
                  className="text-white  bg-blue-500 hover:bg-blue-700 transition duration-300 px-4 py-2 rounded-md xs:px-2 xs:py-1 text-xs"
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center sm:justify-between  gap-2 xs:gap-5  sm:w-full ">
          <div className="relative ">
            <div
              onClick={() => setCategoryShow(!categoryShow)}
              className="h-[40px]  sm:h-[32px] xs:h-full  bg-green-900 text-white flex items-center justify-center px-2 xs:px-1 gap-1 xs:gap-0.5 font-bold text-xs sm:text-sm cursor-pointer rounded w-40  sm:w-20 "
            >
              <FaList className="xs:text-[8px] sm:text-[9px] text-sm" />
              <p className="xs:text-[8px] sm:text-[10px] text-sm">
                All Category
              </p>
              <MdOutlineKeyboardArrowDown
                className={`xs:text-[12px] sm:text-[14px] transition-transform ${
                  categoryShow ? "rotate-180" : ""
                }`}
              />
            </div>

            {categoryShow && (
              <div className="absolute left-0 mt-2 bg-white w-40 xs:w-32 sm:w-32 shadow-lg z-[99999] transition-transform duration-300">
                <ul className="py-2 text-slate-600 font-medium overflow-auto max-h-[250px]">
                  {categorys.map((c, i) => (
                    <li
                      key={i}
                      className="flex justify-start items-center gap-1 xs:gap-2 px-2 py-1 hover:bg-gray-100 transition"
                    >
                      <img
                        src={c.image}
                        className="w-[20px] h-[20px] rounded-full" // Smaller icon for extra small devices
                        alt={c.name}
                      />
                      <Link
                        to={`/products?category=${c.name}`}
                        className="xs:text-[10px] text-sm block"
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="flex items-center ">
            <div className="flex w-full border xs:h-[30px] sm:h-[32px] h-[40px] items-center gap-0 rounded-md border-gray-300">
              <select
                onChange={(e) => setCategory(e.target.value)}
                className="w-[90px] xs:w-[80px] bg-gray-700 text-xs xs:text-[10px] sm:text-[10px] text-white font-medium px-2 h-full rounded-l-md focus:outline-none"
              >
                <option value="" className="bg-gray-700 text-white">
                  Category
                </option>
                {categorys.map((c, i) => (
                  <option
                    key={i}
                    value={c.name}
                    className="bg-gray-200 text-gray-800"
                  >
                    {c.name}
                  </option>
                ))}
              </select>
              <input
                className="flex-1 w-[250px] xs:w-[80px] bg-transparent text-white outline-none px-1 h-full placeholder:text-gray-400 xs:text-[10px] sm:text-[10px] md:w-[100px] text-sm pl-3  "
                onChange={(e) => setSearchValue(e.target.value)}
                type="text"
                placeholder="What do you need?"
              />
              <button
                onClick={search}
                className="h-full px-2 bg-green-700 text-white rounded-r-md flex items-center justify-center"
              >
                <FaSearch className="xs:text-[12px] sm:text-[14px]" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-3 md:gap-0 sm:hidden ">
          <Link
            to="/shops"
            className="p-2 rounded-md font-semibold text-white flex items-center"
          >
            <span className="text-3xl text-white hover:text-blue-700 ">
              <AiFillShop />
            </span>
          </Link>

          <div
            onClick={() =>
              navigate(userInfo ? "/dashboard/my-wishlist" : "/login")
            }
            className="relative flex justify-center items-center cursor-pointer"
          >
            <span className="text-3xl text-white hover:text-pink-500 md:hidden ">
              <AiFillHeart />
            </span>
            {wishlist_count !== 0 && (
              <div className="w-[20px] h-[20px] absolute bg-green-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px]">
                {wishlist_count}
              </div>
            )}
          </div>

          <div
            onClick={redirect_card_page}
            className="relative flex justify-center items-center cursor-pointer"
          >
            <span className="text-3xl text-white hover:text-orange-500 md:hidden">
              <AiFillShopping />
            </span>
            {card_product_count !== 0 && (
              <div className="w-[20px] h-[20px] absolute bg-green-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px]">
                {card_product_count}
              </div>
            )}
          </div>

          {userInfo ? (
            <Link
              className="flex cursor-pointer justify-center items-center gap-1 text-sm"
              to="/dashboard"
            >
              <div className="w-12 h-12 rounded-full flex justify-center items-center">
                <CiUser className="text-white text-3xl" />
              </div>
              <span className="text-white flex-1 whitespace-nowrap">
                {userInfo.name}
              </span>
            </Link>
          ) : (
            <div className="flex items-center gap-1">
              <span className="w-12 h-12 rounded-full flex justify-center items-center"></span>
              <Link
                to="/login"
                className="text-white text-sm bg-blue-500 hover:bg-blue-700 transition duration-300 px-4 py-2 rounded-md"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Headers;
