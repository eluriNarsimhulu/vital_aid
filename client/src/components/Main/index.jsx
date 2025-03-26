import { useState } from 'react';
import React, { useContext } from 'react';
import styles from "./styles.module.css";
import Home from "../Home";
import Profile from "../Profile";
import AboutUs from "../AboutUs";
import Help from "../Help";
import Settings from "../Settings";
import Feedback from "../Feedback";
// import AboutUs from "../AboutUs";
import { AuthContext } from '../../context/AuthContext';
import { FaHome, FaUser, FaCog, FaInfoCircle, FaQuestionCircle, FaShieldAlt, FaComments, FaSignOutAlt } from "react-icons/fa";

const Main = () => {
    const { user, logout, loading } = useContext(AuthContext);
    console.log(user);
    const [activeSection, setActiveSection] = useState("home");
    const [menuOpen, setMenuOpen] = useState(false);

    // const handleLogout = () => {
    //     localStorage.removeItem("token");
    //     window.location.reload();
    // };

    const renderSection = () => {
        switch (activeSection) {
            case "home":
                return <Home />;
            case "Profile":
                return <Profile />;
            case "Setting":
                return <Settings />;
            case "Help":
                return <Help />;
            case "privacy_policy":
                return <Home />;
            case "Feedback":
                return <Feedback />;
            case "about":
                return <AboutUs />;
            default:
                return <Home setActiveSection={setActiveSection} />;
        }
    };

    if (loading) {
        return <h2>Loading...</h2>; // Prevent rendering issues
    }

    return (
        <div className={styles.main_container}>
            <nav className={styles.navbar}>
                <h1 onClick={() => { setActiveSection("home"); setMenuOpen(false); }}>Vital Aid</h1>
                <div className={styles.menu_icon} onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? '✖' : '☰'}
                </div>
                <div className={`${styles.nav_links} ${menuOpen ? styles.open : ""}`}>
                    <span onClick={() => { setActiveSection("home"); setMenuOpen(false); }} className={activeSection === "home" ? styles.active : ""}>
                        <FaHome /> Home
                    </span>
                    <span onClick={() => { setActiveSection("Profile"); setMenuOpen(false); }} className={activeSection === "Profile" ? styles.active : ""}>
                        <FaUser /> Profile
                    </span>
                    <span onClick={() => { setActiveSection("Setting"); setMenuOpen(false); }} className={activeSection === "Setting" ? styles.active : ""}>
                        <FaCog /> Settings
                    </span>
                    <span onClick={() => { setActiveSection("about"); setMenuOpen(false); }} className={activeSection === "about" ? styles.active : ""}>
                        <FaInfoCircle /> About Us
                    </span>
                    <span onClick={() => { setActiveSection("Help"); setMenuOpen(false); }} className={activeSection === "Help" ? styles.active : ""}>
                        <FaQuestionCircle /> Help
                    </span>
                    <span onClick={() => { setActiveSection("privacy_policy"); setMenuOpen(false); }} className={activeSection === "privacy_policy" ? styles.active : ""}>
                        <FaShieldAlt /> Privacy Policy
                    </span>
                    <span onClick={() => { setActiveSection("Feedback"); setMenuOpen(false); }} className={activeSection === "Feedback" ? styles.active : ""}>
                        <FaComments /> Feedback
                    </span>
                    <button className={styles.mobile_logout_btn} onClick={logout}>
                        <FaSignOutAlt /> Logout
                    </button>
                </div>
                <button className={styles.white_btn} onClick={logout}>
                    <FaSignOutAlt /> Logout
                </button>
            </nav>

            <div className="content-container">
                {renderSection()}
            </div>
        </div>
    );
};

export default Main;
