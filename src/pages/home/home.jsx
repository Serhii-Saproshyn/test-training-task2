import mainImg from "images/mainImg.png";
import css from "./home.module.css";

const Home = () => {
  return (
    <div className={css.container}>
      <h1>
        Welcome to the application where you can look at users and their
        followers statistics
      </h1>
      <img src={mainImg} alt="main img" />
    </div>
  );
};

export default Home;
