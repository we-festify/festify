import React, { useState } from "react";
import styles from "./Profile.module.css";
import Navbar from "../../components/Navbar/Navbar";
import FixedBackdrop from "../../../../components/FixedBackdrop/FixedBackdrop";
import {
  selectUser,
  selectIsVerified,
} from "../../../../state/redux/auth/authSlice";
import { useSelector } from "react-redux";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { useSendVerificationEmailMutation } from "../../../../state/redux/auth/authApi";
import { toast } from "react-toastify";
import Participations from "./components/Participations/Participations";

const Profile = () => {
  const user = useSelector(selectUser);
  const isVerified = useSelector(selectIsVerified);
  const [disableEmailVerificationButton, setDisableEmailVerificationButton] =
    useState(false);
  const [getEmailVerificationLink] = useSendVerificationEmailMutation();

  const handleGetEmailVerificationLink = async () => {
    try {
      const data = await getEmailVerificationLink().unwrap();
      console.log(data);
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
    <FixedBackdrop>
      <Navbar />
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.left}>
            <div className={styles.profile}>
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
          </div>
          <div className={styles.right}>
            <Participations />
          </div>
        </div>
      </div>
    </FixedBackdrop>
  );
};

export default Profile;
