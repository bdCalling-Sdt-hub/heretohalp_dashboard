import dashboard from "../../assets/routerImg/dashboard.png";
import categorie from "../../assets/routerImg/categorie.png";
import create from "../../assets/routerImg/create.png";
import settings from "../../assets/routerImg/settings.png";
import subscription from "../../assets/routerImg/subscription.png";
import user from "../../assets/routerImg/user.png";
import logo from "../../assets/header/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { IoIosLogIn } from "react-icons/io";
import { GoStopwatch } from "react-icons/go";
import { BsBarChart } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { HiOutlineUsers } from "react-icons/hi";
import { IoSettingsOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { logout } from "../../page/redux/features/auth/authSlice";
const items = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: <GoStopwatch />,
    link: "/",
  },
  {
    key: "blog",
    label: "Blog",
    icon: <BsBarChart />,
    link: "/dashboard/blog",
  },
  {
    key: "userManagement",
    label: "User Management",
    icon: <FiUser />,
    link: "/dashboard/UserManagement",
  },
  {
    key: "manageTicket",
    label: "Manage Ticket",
    icon: <MdOutlineSpaceDashboard />,
    link: "/dashboard/manageTicket",
  },
  
  {
    key: "partnerManage",
    label: "Partner Manage",
    icon: <HiOutlineUsers />,
    link: "/dashboard/partnerManage",
  },
  {
    key: "service",
    label: "Service Pricing",
    icon: <HiOutlineUsers />,
    link: "/dashboard/service-pricing",
  },
  {
    key: "profile",
    label: "Settings",
    icon: <IoSettingsOutline />,
    link: "/dashboard/Settings/profile",
    children: [
     
      {
        key: "terms",
        label: "Terms & Condition",
        link: "/dashboard/Settings/Terms&Condition",
      },
      {
        key: "privacy",
        label: "Privacy Policy",
        link: "/dashboard/Settings/PrivacyPolicy",
      },
      {
        key: "contact",
        label: "Contact Us",
        link: "/dashboard/Settings/contact-us",
      },
      {
        key: "faq",
        label: "FAQ",
        link: "/dashboard/Settings/FAQ",
      },
      {
        key: "feed",
        label: "Feedback",
        link: "/dashboard/Settings/feedback",
      },
    ],
  },
];

const SidBar = () => {
  const [selectedKey, setSelectedKey] = useState("dashboard");
  const [expandedKeys, setExpandedKeys] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const contentRef = useRef({});
  const dispatch = useDispatch();

  useEffect(() => {
    const currentPath = location.pathname;

    const parentItem = items.find(
      (item) =>
        item.link === currentPath ||
        (item.children &&
          item.children.some((child) => child.link === currentPath))
    );

    if (parentItem) {
      setSelectedKey(
        parentItem.children
          ? parentItem.children.find((child) => child.link === currentPath)
              ?.key || parentItem.key
          : parentItem.key
      );

      if (parentItem.children && !expandedKeys.includes(parentItem.key)) {
        setExpandedKeys([...expandedKeys, parentItem.key]);
      }
    }
  }, [location]);

  const onParentClick = (key) => {
    setExpandedKeys((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
    );
  };

  // Logout Function
  const handleLogout = () => {
    dispatch(logout())
    navigate("/login");
  };

  return (
    <div className="custom-sidebar h-full bg-[#050505]">
      {/* Logo */}
      <div className="mt-32">
        
      </div>

      {/* Sidebar Menu */}
      <div className="menu-items">
        {items.map((item) => (
          <div key={item.key}>
            <Link
              to={item.link}
              className={`menu-item my-4 ml-16 mr-3 py-3 px-3 flex items-center cursor-pointer ${
                selectedKey === item.key
                  ? "bg-[#2E4CB9] text-white rounded-tr-sm rounded-br-sm"
                  : "bg-white text-[#2E4CB9] rounded-tr-sm rounded-br-sm hover:bg-gray-200"
              }`}
              onClick={(e) => {
                if (item.children) {
                  e.preventDefault(); 
                  onParentClick(item.key);
                } else {
                  setSelectedKey(item.key); 
                }
              }}
            >
              <p className="w-5 h-5 mr-2 mt-1" >{item.icon}</p>
              <span className="block w-full ">{item.label}</span>

          
              {item.children && (
                <FaChevronRight
                  className={`ml-auto transform transition-all duration-300 ${
                    expandedKeys.includes(item.key) ? "rotate-90" : ""
                  }`}
                />
              )}
            </Link>

         
            {item.children && (
              <div
                className={`children-menu bg-white -my-2 ml-16 mr-3 transition-all duration-300 ${
                  expandedKeys.includes(item.key) ? "expanded" : ""
                }`}
                style={{
                  maxHeight: expandedKeys.includes(item.key)
                    ? `${contentRef.current[item.key]?.scrollHeight}px`
                    : "0",
                }}
                ref={(el) => (contentRef.current[item.key] = el)}
              >
                {item.children.map((child) => (
                  <Link
                    key={child.key}
                    to={child.link}
                    className={`menu-item py-3 px-4 flex items-center cursor-pointer ${
                      selectedKey === child.key
                        ? "bg-[#2E4CB9] text-white"
                        : " text-[#2E4CB9]"
                    }`}
                    onClick={() => {
                      setSelectedKey(child.key); // Set the selected key for children
                      setExpandedKeys([]); // Close all expanded items
                    }}
                  >
                    <span className="block w-full ">
                      {child.label}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Logout Button */}
      <div className="custom-sidebar-footer absolute bottom-0 w-full py-4 pr-3 pl-16">
        <button
          onClick={handleLogout}
          className="w-full flex  bg-white text-start  rounded-tr-sm rounded-br-sm text-black p-3"
        >
          <span className="text-2xl">
            <IoIosLogIn />
          </span>
          <span className="ml-3">Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default SidBar;
