import React, { useState } from "react";
import { AiOutlineLogin, AiOutlineMessage } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import {
  MdOutlineAdminPanelSettings,
  MdOutlineTrackChanges,
} from "react-icons/md";
import { TbAddressBook } from "react-icons/tb";
import { RxPerson, RxDashboard } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import CustomModal from "../CustomModal";

const ProfileSidebar = ({ setActive, active }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { isSeller } = useSelector((state) => state.seller);
  const [modalOpen, setModalOpen] = useState(false);

  const logoutHandler = () => {
    axios
      .get(`${server}/user/logout`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        navigate("/");
        window.location.reload(true);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };
  return (
    <>
      {modalOpen && (
        <CustomModal
          message={"Are you sure you want to logout?"}
          ok={" Yes, I'm sure"}
          cancel={"No, cancel"}
          setModalOpen={setModalOpen}
          performAction={() => logoutHandler()}
          closeModel={() => setModalOpen(false)}
        />
      )}
      <div className="w-full bg-white shadow-sm rounded-[10px] 800px:p-4 p-[5px] pt-8">
        <div
          className="flex items-center cursor-pointer w-full mb-8"
          onClick={() => setActive(1)}
        >
          <RxPerson
            size={20}
            color={active === 1 ? "red" : ""}
            className="800px:block hidden"
          />
          <span
            className={`pl-3 ${
              active === 1 ? "text-[red]" : ""
            } 800px:block hidden`}
          >
            Profile
          </span>
          <span
            className={`pl-0 ${
              active === 1 ? "text-[red]" : ""
            } 800px:hidden block text-xs`}
          >
            Profile
          </span>
        </div>
        <div
          className="block lg:flex items-center cursor-pointer w-full mb-8"
          onClick={() => setActive(2)}
        >
          <HiOutlineShoppingBag
            size={20}
            color={active === 2 ? "red" : "black"}
            className="800px:block hidden"
          />
          <span
            className={`pl-3 ${
              active === 2 ? "text-[red]" : ""
            } 800px:block hidden`}
          >
            Orders
          </span>
          <span
            className={`pl-0 ${
              active === 2 ? "text-[red]" : ""
            } 800px:hidden block text-xs`}
          >
            orders
          </span>
          <div class="w-[12px] h-[12px] bg-green-400 rounded-full mx-5"></div>
        </div>
        <div
          className="flex items-center cursor-pointer w-full mb-8"
          onClick={() => setActive(3)}
        >
          <HiOutlineReceiptRefund
            size={20}
            color={active === 3 ? "red" : ""}
            className="800px:block hidden"
          />
          <span
            className={`pl-3 ${
              active === 3 ? "text-[red]" : ""
            } 800px:block hidden`}
          >
            Refunds
          </span>
          <span
            className={`pl-0 ${
              active === 3 ? "text-[red]" : ""
            } 800px:hidden block text-xs`}
          >
            refunds
          </span>
        </div>

        <div
          className="flex items-center cursor-pointer w-full mb-8"
          onClick={() => setActive(4) || navigate("/inbox")}
        >
          <AiOutlineMessage
            size={20}
            color={active === 4 ? "red" : ""}
            className="800px:block hidden"
          />
          <span
            className={`pl-3 ${
              active === 4 ? "text-[red]" : ""
            } 800px:block hidden`}
          >
            Inbox
          </span>
          <span
            className={`pl-0 ${
              active === 4 ? "text-[red]" : ""
            } 800px:hidden block text-xs`}
          >
            Inbox
          </span>
        </div>

        <div
          className="flex items-center cursor-pointer w-full mb-8"
          onClick={() => setActive(5)}
        >
          <MdOutlineTrackChanges
            size={20}
            color={active === 5 ? "red" : ""}
            className="800px:block hidden"
          />
          <span
            className={`pl-3 ${
              active === 5 ? "text-[red]" : ""
            } 800px:block hidden`}
          >
            Track Order
          </span>
          <span
            className={`pl-0 ${
              active === 5 ? "text-[red]" : ""
            } 800px:hidden block text-xs`}
          >
            Track Order
          </span>
        </div>

        <div
          className="flex items-center cursor-pointer w-full mb-8"
          onClick={() => setActive(6)}
        >
          <RiLockPasswordLine
            size={20}
            color={active === 6 ? "red" : ""}
            className="800px:block hidden"
          />
          <span
            className={`pl-3 ${
              active === 6 ? "text-[red]" : ""
            } 800px:block hidden`}
          >
            Change Password
          </span>
          <span
            className={`pl-0 ${
              active === 6 ? "text-[red]" : ""
            } 800px:hidden block text-xs`}
          >
            Change Password
          </span>
        </div>

        <div
          className="flex items-center cursor-pointer w-full mb-8"
          onClick={() => setActive(7)}
        >
          <TbAddressBook
            size={20}
            color={active === 7 ? "red" : ""}
            className="800px:block hidden"
          />
          <span
            className={`pl-3 ${
              active === 7 ? "text-[red]" : ""
            } 800px:block hidden`}
          >
            Address
          </span>
          <span
            className={`pl-0 ${
              active === 7 ? "text-[red]" : ""
            } 800px:hidden block text-xs`}
          >
            Address
          </span>
        </div>

        {user && user?.role === "Admin" && (
          <Link to="/admin/dashboard">
            <div
              className="flex items-center cursor-pointer w-full mb-8"
              onClick={() => setActive(8)}
            >
              <MdOutlineAdminPanelSettings
                size={20}
                color={active === 7 ? "red" : ""}
                className="800px:block hidden"
              />
              <span
                className={`pl-3 ${
                  active === 8 ? "text-[red]" : ""
                } 800px:block hidden`}
              >
                Admin Dashboard
              </span>
              <span
                className={`pl-0 ${
                  active === 8 ? "text-[red]" : ""
                } 800px:hidden block text-xs`}
              >
                Admin
              </span>
            </div>
          </Link>
        )}
        {isSeller && (
          <Link to="/dashboard">
            <div
              className="flex items-center cursor-pointer w-full mb-8"
              onClick={() => setActive(8)}
            >
              <RxDashboard
                size={20}
                color={active === 8 ? "red" : ""}
                className="800px:block hidden"
              />
              <span
                className={`pl-3 ${
                  active === 8 ? "text-[red]" : ""
                } 800px:block hidden`}
              >
                Shop Dashboard
              </span>
              <span
                className={`pl-0 ${
                  active === 8 ? "text-[red]" : ""
                } 800px:hidden block text-xs`}
              >
                Shop
              </span>
            </div>
          </Link>
        )}
        <div
          className="single_item flex items-center cursor-pointer w-full mb-8"
          onClick={() => setModalOpen(true)}
        >
          <AiOutlineLogin
            size={20}
            color={active === 9 ? "red" : ""}
            className="800px:block hidden"
          />
          <span
            className={`pl-3 ${
              active === 9 ? "text-[red]" : ""
            } 800px:block hidden`}
          >
            Log out
          </span>
          <span
            className={`pl-0 ${
              active === 9 ? "text-[red]" : ""
            } 800px:hidden block text-xs`}
          >
            Log out
          </span>
        </div>
      </div>
    </>
  );
};

export default ProfileSidebar;
