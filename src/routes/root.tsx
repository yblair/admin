import { Outlet } from "react-router-dom";
import { Header } from "../components/header/header";
import { Sidebar } from "../components/sidebar/sidebar";
import styles from "./root.module.css";
export default function Root() {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <Sidebar />
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}
