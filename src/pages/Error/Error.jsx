import React from "react";
import { Link } from "react-router-dom";
import styles from "./Error.module.css";

export default function Error() {
  return (
    <div className="flex-column-wrap content default">
      <div className={styles.page_header}>
        <h1>
          Error 404 |
          <span className={`grey_text ${styles.subtext}`}>Infinte void</span>
        </h1>
        <Link to="/">
          <button
            onClick={() => userDispatch({ type: "CLEAR_ALL_WATCHLATER" })}
            className={`trash_btn`}
          >
            Home
            <span className="material-icons">home</span>
          </button>
        </Link>
      </div>
      <div
        className={`${styles.content_wrapper} ${styles.emptyTitle} flex-row-wrap`}
      >
        <div className={`${styles.detail_card} ${styles.expandbanner}`}>
          <h1 className={styles.detail_title}>
            You drifted off to far away from home.
          </h1>
          <h1 className={styles.detail_banner}>lost</h1>
        </div>
      </div>
    </div>
  );
}
