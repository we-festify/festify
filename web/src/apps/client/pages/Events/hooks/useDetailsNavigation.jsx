import { useLocation, useNavigate } from "react-router-dom";
import { MdHotelClass } from "react-icons/md";
import { AiFillNotification } from "react-icons/ai";
import Details from "../components/Details/Details";
import Announcements from "../components/Announcements/Announcements";

const useDetailsNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const tabKey = new URLSearchParams(location.search).get("tab") || "details";
  const tabs = [
    {
      name: "Details",
      key: "details",
      icon: <MdHotelClass />,
      activeIcon: <MdHotelClass />,
      component: Details,
    },
    {
      name: "Announcements",
      key: "announcements",
      icon: <AiFillNotification />,
      activeIcon: <AiFillNotification />,
      component: Announcements,
    },
  ];

  const getTabIndex = (key) => {
    const tabIndex = tabs.findIndex((tab) => tab.key === key);
    return tabIndex === -1 ? 0 : tabIndex;
  };

  const activeTabIndex = getTabIndex(tabKey);

  const handleChooseTab = (index) => {
    const params = new URLSearchParams(location.search);
    params.set("tab", tabs[index].key);
    navigate(`?${params.toString()}`);
  };

  return {
    tabs,
    activeTabIndex,
    handleChooseTab,
    ActiveComponent: tabs[activeTabIndex].component,
  };
};

export default useDetailsNavigation;
