// import "./Header.css";

const Header = () => {
  return (
    <div className="h-[10vh] flex items-center self-start">
      {/* float-start"> */}
      <img
        className="w-10 h-10 mr-2 ml-4"
        // src="https://img.icons8.com/?size=100&id=58562&format=png&color=000000"
        src="./assets/connect-01.png"
      />
      <h4 className="text-xl ml-1 font-bold"> Connect </h4>
    </div>
  );
};

export default Header;
