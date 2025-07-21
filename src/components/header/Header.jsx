import "./Header.css";

const Header = () => {
  return (
    <div className="Header">
      {/* <div className="welcome-div"> */}
      <img
        className="logo-img"
        // src="https://img.icons8.com/?size=100&id=58562&format=png&color=000000"
        src="../src/assets/connect-01.png"
      />
      <h4 className="welcome-h4"> Connect </h4>
      {/* </div> */}
    </div>
  );
};

export default Header;
