import { useState } from "react";
import styles from "./Profile.module.css";
import Navbar from "../../components/Navbar/Navbar";
import FixedBackdrop from "../../../../components/FixedBackdrop/FixedBackdrop";
import {
  selectUser,
  selectIsVerified,
} from "../../../../state/redux/auth/authSlice";
import { useSelector } from "react-redux";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { AiFillHome } from "react-icons/ai";
import { FaUserEdit } from "react-icons/fa";
import { BiSolidOffer } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { useSendVerificationEmailMutation } from "../../../../state/redux/auth/authApi";
import Participations from "./components/Participations/Participations";
import Offers from "./components/Offers/Offers";
import Tabs from "../../components/Tabs/Tabs";
import Avatar from "../../components/Avatar/Avatar";
import UpdateInfo from "./components/UpdateInfo/UpdateInfo";
import { useMediaQuery } from "../../../../hooks/useMediaQuery";
import BottomNavigationBar from "../../components/BottomNavigationBar/BottomNavigationBar";
import Settings from "./components/Settings/Settings";
import { viewTransition } from "../../../../utils/view_transition";
import Payments from "./components/Payments/Payments";
import { toast } from "../../components/Toast";

const Profile = () => {
  const isPortrait = useMediaQuery("(orientation: portrait)");
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const handleTabChange = (index) => {
    viewTransition(() => {
      setActiveTabIndex(index);
    });
  };

  const tabs = [
    {
      label: "Participations",
      icon: <AiFillHome />,
      component: <Participations />,
    },
    {
      label: "Offers",
      icon: <BiSolidOffer />,
      component: <Offers />,
    },
    {
      label: "Update",
      icon: <FaUserEdit />,
      component: <UpdateInfo />,
    },
    {
      label: "Settings",
      icon: <IoMdSettings />,
      component: <Settings />,
    },
    {
      label: "Payments",
      icon: <MdOutlineCurrencyRupee />,
      component: <Payments />,
    },
  ];

  return (
    <FixedBackdrop>
      <Navbar />
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.left}>
            <UserDetails />
          </div>
          <div className={styles.right}>
            {!isPortrait ? (
              <>
                <div className={styles.tabs}>
                  <Tabs
                    tabs={tabs}
                    activeIndex={activeTabIndex}
                    onTabChange={handleTabChange}
                  />
                </div>
                {tabs[activeTabIndex].component}
              </>
            ) : (
              <>
                {tabs[activeTabIndex].component}
                <BottomNavigationBar
                  tabs={tabs}
                  activeTabIndex={activeTabIndex}
                  onTabChange={handleTabChange}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </FixedBackdrop>
  );
};

const UserDetails = () => {
  const user = useSelector(selectUser);
  const isVerified = useSelector(selectIsVerified);
  const [disableEmailVerificationButton, setDisableEmailVerificationButton] =
    useState(false);
  const [getEmailVerificationLink] = useSendVerificationEmailMutation();

  const handleGetEmailVerificationLink = async () => {
    try {
      const data = await getEmailVerificationLink().unwrap();
      toast.success(data.message);
      setDisableEmailVerificationButton(true);
    } catch (error) {
      toast.error(
        error.data?.message ||
          error.error?.message ||
          (typeof error.data === "string" && error.data) ||
          "Unable to send verification email"
      );
    }
  };

  return (
    <div className={styles.profile}>
      <Avatar
        image={user?.image}
        name={user?.name}
        avatarCode={user?.avatarCode}
        size={100}
      />
      <h2 className={styles.name}>{user?.name}</h2>
      <p className={styles.email}>
        {user?.email}
        {isVerified && (
          <span className={styles.verified}>
            <RiVerifiedBadgeFill />
          </span>
        )}
      </p>
      {!isVerified && (
        <button
          className={styles.verifyButton}
          onClick={handleGetEmailVerificationLink}
          disabled={disableEmailVerificationButton}
        >
          {disableEmailVerificationButton
            ? "Verification Email Sent"
            : "Send Verification Email"}
        </button>
      )}
      <div className={styles.details}>
        <div className={styles.title}>Personal</div>
        <div className={styles.item}>
          <p className={styles.key}>ID</p>
          <p className={styles.value}>{user?._id}</p>
        </div>
        <div className={styles.item}>
          <p className={styles.key}>Name</p>
          <p className={styles.value}>{user?.name}</p>
        </div>
        <div className={styles.item}>
          <p className={styles.key}>Email</p>
          <p className={styles.value}>{user?.email}</p>
        </div>
        <div className={styles.item}>
          <p className={styles.key}>Gender</p>
          <p className={styles.value}>{user?.gender}</p>
        </div>
      </div>
      <div className={styles.details}>
        <div className={styles.title}>College</div>
        <div className={styles.item}>
          <p className={styles.key}>Name</p>
          <p className={styles.value}>{user?.college}</p>
        </div>
        <div className={styles.item}>
          <p className={styles.key}>Degree</p>
          <p className={styles.value}>{user?.degree}</p>
        </div>
        <div className={styles.item}>
          <p className={styles.key}>Year Of Graduation</p>
          <p className={styles.value}>{user?.yearOfGraduation}</p>
        </div>
        <div className={styles.item}>
          <p className={styles.key}>ZIP Code</p>
          <p className={styles.value}>{user?.zipCode}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
