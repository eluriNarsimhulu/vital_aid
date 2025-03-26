import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import styles from "./Profile.module.css";
import { FaUser, FaPhone, FaBirthdayCake, FaCalendarAlt } from "react-icons/fa";

const Profile = () => {
  const { user,logout } = useContext(AuthContext);

  if (!user) {
    return <h2 className={styles.no_data}>No user data available</h2>;
  }

  return (
    <div className={styles.profile_container}>
      <div className={styles.profile_card}>
        {/* Profile Image */}
        <div className={styles.profile_header}>
          <div className={styles.profile_image}>
            <FaUser size={80} color="#555" />
          </div>
          <h2>{user.fullName}</h2>
          <p className={styles.user_email}>{user.email}</p>
        </div>

        {/* Profile Details */}
        <div className={styles.profile_details}>
          <div className={styles.detail_item}>
            <FaPhone className={styles.icon} />
            <span>{user.mobileNumber}</span>
          </div>
          <div className={styles.detail_item}>
            <FaBirthdayCake className={styles.icon} />
            <span>{new Date(user.dateOfBirth).toLocaleDateString()}</span>
          </div>
          <div className={styles.detail_item}>
            <FaCalendarAlt className={styles.icon} />
            <span>Joined on: {new Date(user.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Logout Button */}
        <button className={styles.logout_btn} onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default Profile;
