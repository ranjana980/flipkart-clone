import Lottie from "react-lottie";
import login from "../assests/lotties/login.json";
import { useLocation } from "react-router-dom";

export const AuthBanner = () => {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const signup = searchParams.get('signup')

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: login,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="auth-banner">
      <h5>{signup ? "Looks like you're new here!" : 'Login'}</h5>
      <h6 className="leading-6 text-gray-300 mt-4 text-start">
        {signup ? "Sign up with your email" : "Get access to your Orders,"}
        <br />
        {signup ? "to get started" : "Wishlist and Recommendations"}
      </h6>
      <div className="auth-banner-image">
        <Lottie options={defaultOptions} />
      </div>
    </div>
  );
};
