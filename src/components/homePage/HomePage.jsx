import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { clearChangePassword } from "../../reducers/usersSlice";
import phoneImg from "/assets/phone-image03.png";

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearChangePassword());
  }, [dispatch]);

  return (
    <main className="w-[80%] max-2xl:w-[90%] flex justify-around mt-1 max-md:mt-12 max-sm:flex-col max-sm:w-full max-sm:items-center">

      {/* Left Section */}
      <div className="flex flex-col w-[40%] md:w-[60%] sm:w-[64%] max-sm:w-full max-sm:items-center">

        {/* Hero Section */}
        <section className="flex flex-col items-start text-white xl:py-16 md:py-8 sm:py-2 max-sm:w-full max-sm:text-3xl max-sm:items-center max-sm:pt-4">
          <div className="max-sm:w-[90%]">
            <h1 className="lg:text-4xl font-bold mb-4 sm:text-2xl">
              Connect Instantly.
              <br className="sm:hidden" />
              Chat Securely.
            </h1>

            <p className="mb-6 lg:text-lg sm:text-base max-sm:text-base">
              A real-time messaging web app built with modern web technologies.
            </p>

            <div className="flex gap-4 mt-8">
              <Link
                to="/login"
                className="lg:px-16 lg:py-3 bg-[#3261d5] text-white rounded-xl cursor-pointer text-center sm:px-10 sm:py-2 max-sm:text-sm max-sm:py-2 max-sm:w-full max-sm:rounded-md"
              >
                Get Started
              </Link>
            </div>
          </div>
        </section>

        {/* Phone Image (hidden on small screens) */}
        <div className="sm:hidden flex justify-end">
          <img src="/assets/phone-message-image.png" className="w-80 h-100" />
        </div>

        {/* Features Section */}
        <section className="text-white px-6 py-10 bg-gray-800/40 w-[70%] max-2xl:w-[90%] rounded-xl ring-1 ring-gray-500/50 shadow-xl/30 max-sm:px-2 max-sm:py-2 max-sm:bg-gray-800/90 max-sm:w-[90%]">
          <h2 className="lg:text-3xl font-bold text-center mb-8 md:text-2xl max-sm:hidden">
            Why Choose Connect?
          </h2>

          <div className="flex items-start justify-around w-full">

            {/* Feature 1 */}
            <article className="w-[32%] p-2 rounded-lg text-center shadow flex flex-col items-center">
              <div className="lg:text-3xl mb-2 sm:text-xl bg-[#3261d5] p-4 rounded-xl flex items-center justify-center max-sm:p-2">
                <img src="/assets/power.png" className="w-10 h-10 max-sm:w-8 max-sm:h-8" />
              </div>
              <h3 className="font-bold mb-2 max-sm:text-sm">Real-Time Messaging</h3>
              <p className="text-xs max-sm:text-[11px]">Instant messaging powered by WebSockets.</p>
            </article>

            {/* Feature 2 */}
            <article className="w-[32%] p-2 rounded-lg text-center shadow flex flex-col items-center">
              <div className="lg:text-3xl mb-2 sm:text-xl bg-[#4e9594] p-4 rounded-xl flex items-center justify-center max-sm:p-2">
                <img src="/assets/secure.png" className="w-10 h-10 max-sm:w-8 max-sm:h-8" />
              </div>
              <h3 className="font-bold mb-2 max-sm:text-sm">Secure Authentication</h3>
              <p className="text-xs max-sm:text-[11px]">Authentication via JWT and Google Login.</p>
            </article>

            {/* Feature 3 */}
            <article className="w-[32%] p-2 rounded-lg text-center shadow flex flex-col items-center">
              <div className="lg:text-3xl mb-2 sm:text-xl bg-[#3261d5] p-4 rounded-xl flex items-center justify-center max-sm:p-2">
                <img src="/assets/phone.png" className="w-10 h-10 max-sm:w-8 max-sm:h-8" />
              </div>
              <h3 className="font-bold mb-2 max-sm:text-sm">Responsive Design</h3>
              <p className="text-xs max-sm:text-[11px]">Optimized for all devices with a mobile-first approach.</p>
            </article>

          </div>
        </section>
      </div>

      {/* Right Phone Image */}
      <div className="xl:w-[50%] lg:w-[40%] flex lg:justify-center items-end sm:w-[30%] sm:justify-start max-sm:hidden">
        <img
          src={phoneImg}
          className="xl:w-80 xl:h-140 lg:w-70 lg:h-120 sm:w-60 sm:h-100"
        />
      </div>
    </main>
  );
};

export default HomePage;
