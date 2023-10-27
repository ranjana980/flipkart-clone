import Lottie from "react-lottie";
import login from "../assests/lotties/login.json";

export const AuthBanner = ({ heading, secondaryHeading, startHeading }) => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: login,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="col-span-5 bg-blue-600 text-white">
      <div className="p-5">
        <h5>{heading}</h5>
        <h6 className="leading-6 text-gray-300 mt-4 text-start">
          {secondaryHeading}
          <br />
          {startHeading}
        </h6>
        <div className=" mr-3 relative top-20 mb-5">
          <Lottie options={defaultOptions} />
        </div>
      </div>
    </div>
  );
};
