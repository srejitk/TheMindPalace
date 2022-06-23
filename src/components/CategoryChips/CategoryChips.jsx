import React from "react";
import { useFilter } from "../../context/Filter/FilterContext";
import { useUserDetails } from "../../context/User/UserContext";
import { useVideo } from "../../context/Video/VideoContext";
import styles from "./CategoryChips.module.css";

export default function CategoryChips() {
  const { videoState, videoDispatch } = useVideo();
  const { category, sortBy } = videoState;
  const { categories } = useFilter();

  return (
    <div className={` ${styles.pill_container} flex-row-wrap gap20`}>
      <div className={styles.filters}>
        <p className={`subtitle-2 ${styles.label}`}>FILTER BY</p>
        <div className={styles.categoryContainer}>
          <button
            className={`flex-row-wrap subtitle-1 ${styles.pill} ${
              category === "All" ? styles.active : ""
            }`}
            onClick={() =>
              videoDispatch({ type: "SET_CATEGORY", payload: "All" })
            }
          >
            All
          </button>
          {categories?.map((category) => (
            <button
              key={category._id}
              className={`flex-row-wrap subtitle-1 ${styles.pill} ${
                videoState?.category === category.categoryName
                  ? styles.active
                  : ""
              }`}
              onClick={() =>
                videoDispatch({
                  type: "SET_CATEGORY",
                  payload: category.categoryName,
                })
              }
            >
              {category.categoryName}
            </button>
          ))}
        </div>
      </div>
      <div className={`${styles.filters} ${styles.sort_filter}`}>
        <p className={`subtitle-2 ${styles.label}`}>SORT BY </p>
        <div className={styles.categoryContainer}>
          <button
            className={`flex-row-wrap subtitle-1 ${styles.pill} ${
              sortBy === "Latest" ? styles.active : ""
            }`}
            onClick={() =>
              sortBy === "Latest"
                ? videoDispatch({ type: "SET_SORT", payload: "" })
                : videoDispatch({ type: "SET_SORT", payload: "Latest" })
            }
          >
            Latest
          </button>
          <button
            className={`flex-row-wrap subtitle-1 ${styles.pill} ${
              sortBy === "Oldest" ? styles.active : ""
            }`}
            onClick={() =>
              sortBy === "Oldest"
                ? videoDispatch({ type: "SET_SORT", payload: "" })
                : videoDispatch({ type: "SET_SORT", payload: "Oldest" })
            }
          >
            Oldest
          </button>
        </div>
      </div>
    </div>
  );
}
