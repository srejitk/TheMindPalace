import React from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../../context/Theme/ThemeContext";
import { sidebarItems } from "../../utils/Constants";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  const { sidebar } = useTheme();
  return (
    <div
      className={`${styles.sidebar} box-shadow ${
        sidebar ? styles.showSidebar : styles.closeSidebar
      }`}
    >
      {sidebarItems.map((item) => (
        <div
          key={item.label}
          className={`flex-column-wrap flex-mid-center ${styles.sidebar_items}`}
        >
          <NavLink
            to={item.path}
            className={`  ${styles.sidebar_item} flex-mid-center`}
          >
            <span className="material-icons">{item.icon}</span>
          </NavLink>
          <p>{item.label}</p>
        </div>
      ))}
    </div>
  );
}
