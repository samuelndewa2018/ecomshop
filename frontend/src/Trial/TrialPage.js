import React, { useState } from "react";
import { AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";
import { BiHomeAlt2 } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { TbArrowsShuffle2 } from "react-icons/tb";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const TrialPage = () => {
  const { allProducts } = useSelector((state) => state.products);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [categoriesData, setCategoriesData] = useState([]);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { wishlist } = useSelector((state) => state.wishlist);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts =
      allProducts &&
      allProducts.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );

    setSearchData(filteredProducts);
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  const myClickHandler = (e, props) => {
    setOpen(props);
    if (!e) {
      var e = window.event;
      e.cancelBubble = true;
    }
    if (e.stopPropagation) {
      e.stopPropagation();
    }
  };

  const myClickHandler2 = (e, props) => {
    setOpenCart(props);
    setOpenWishlist(false);
    setSearchOpen(false);

    if (!e) {
      var e = window.event;
      e.cancelBubble = true;
    }
    if (e.stopPropagation) {
      e.stopPropagation();
    }
  };
  const myClickHandler3 = (e, props) => {
    setOpenWishlist(props);
    setOpenCart(false);
    setSearchOpen(false);
    setOpen(false);

    if (!e) {
      var e = window.event;
      e.cancelBubble = true;
    }
    if (e.stopPropagation) {
      e.stopPropagation();
    }
  };
  const myClickHandler4 = (e, props) => {
    setSearchOpen(props);
    setOpenCart(false);
    setOpenWishlist(false);

    if (!e) {
      var e = window.event;
      e.cancelBubble = true;
    }
    if (e.stopPropagation) {
      e.stopPropagation();
    }
  };

  const myClickHandler5 = (e) => {
    e.preventDefault();
    setSearchOpen(false);
    setOpenCart(false);
    setOpenWishlist(false);

    if (!e) {
      var e = window.event;
      e.cancelBubble = true;
    }
    if (e.stopPropagation) {
      e.stopPropagation();
    }
  };
  return (
    <div className="bottomOption navigation">
      <ul>
        <li>
          <a href="#" onClick={(e) => myClickHandler5(e)} className="icon">
            <BiHomeAlt2
              style={{
                color: "#000",
                fontSize: "25px",
                margin: "5px",
                opacity: ".8",
              }}
            />
          </a>
        </li>
        <li>
          <a
            href="#"
            onClick={(e) => myClickHandler3(e, true)}
            className="icon"
          >
            <AiOutlineHeart
              style={{
                color: "#000",
                fontSize: "25px",
                margin: "5px",
                opacity: ".8",
              }}
            />
            <span className="absolute rounded-full flex items-center justify-center bottom-[70%] right-[5%] h-[20px] w-[20px] border-none text-white bg-[#3bc177]">
              {wishlist.length}
            </span>
          </a>
        </li>
        <li>
          <a href="#" className="icon">
            <AiOutlineMessage
              style={{
                color: "#000",
                fontSize: "25px",
                margin: "5px",
                opacity: ".8",
              }}
            />
          </a>
        </li>
        <li>
          <a
            href="#"
            onClick={(e) => myClickHandler4(e, true)}
            className="icon"
          >
            <BsSearch
              style={{
                color: "#000",
                fontSize: "25px",
                margin: "5px",
                opacity: ".8",
              }}
            />
          </a>
        </li>
        <li>
          <Link to="/compare-products" className="icon">
            <TbArrowsShuffle2
              style={{
                color: "#000",
                fontSize: "25px",
                margin: "5px",
                opacity: ".8",
              }}
            />
          </Link>
        </li>
        <li>
          {isAuthenticated ? (
            <div>
              <Link to="/profile" className="icon">
                <img
                  src={`${user?.avatar?.url}`}
                  alt=""
                  className="w-[30px] h-[30px] rounded-full border-[3px] border-[#0eae88]"
                />
              </Link>
            </div>
          ) : (
            <Link to="/login" className="icon">
              <CgProfile size={44} color="rgb(0 0 0 / 83%)" />
            </Link>
          )}
        </li>
      </ul>
    </div>
  );
};

export default TrialPage;
