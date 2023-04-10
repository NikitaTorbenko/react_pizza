import React from "react";
import styles from "./NotFoundBlock.module.scss";

const NotFoundBlock = () => {
  return (
    <div className={styles.notFound}>
      <h1>Страница не найдена</h1>
      <p>Попробуйте позже или перезагрузите страницу</p>
      <span>😢</span>
    </div>
  );
};

export default NotFoundBlock;
