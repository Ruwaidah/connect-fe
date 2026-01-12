import SocialIcon from "./SocialIcon";
const Footer = () => {
  return (
    <footer className="bg-gray-900/70 text-white py-6 items-center w-full fixed bottom-0
                      flex justify-between lg:h-[10vh] px-20 max-xl:px-6 border border-t-gray-800
                     max-sm:px-2">
      <div className="felx flex-col text-lg
                      max-sm:w-full max-sm:items-center max-sm:justify-center">
        <p className="max-xl:text-sm max-sm:text-sm max-sm:text-start">Built by Ruwaidah Alfakhri </p>
        <p className="text-gray-500 max-xl:text-xs max-sm:text-xs max-sm:text-start"> Full Stack Web Developer</p>
      </div>
      <div className="flex flex-col justify-center items-center">
        {/* <div className="text-base flex justify-center gap-4 max-sm:hidden">
          <a href="#" className="hover:underline">GitHub</a>
          <a href="#" className="hover:underline">LinkedIn</a>
          <a href="#" className="hover:underline">Portfolio</a>
        </div> */}
        <div className="flex items-center gap-3">
          <SocialIcon />
          <SocialIcon />
          <SocialIcon />
        </div>
        {/* <p className="text-gray-500 text-sm max-sm:text-xs max-sm:text-center">© {new Date().getFullYear()} Connect</p> */}
      </div>
    </footer>
  );
};

export default Footer;
