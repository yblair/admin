import { Link } from "react-router-dom";
import styles from "./header.module.css";
import { Toggle } from "../toggle/toggle";
export const Header = () => {
  const user = "Robert";
  return (
    <header className={styles.header}>
      <Link to={`/`}>
        <img src="logo.png" alt="link to home" className={styles.img} />
      </Link>
      <div>
        <div className={styles.user}>
          <Toggle />
          <img src="user.png" alt="user image" />
          <p>Hi, {user}!</p>
        </div>
      </div>
    </header>
  );
};
