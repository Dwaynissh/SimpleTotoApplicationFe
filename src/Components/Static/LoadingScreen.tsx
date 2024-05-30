import { useEffect, useState } from "react";
import spinner from "../../assets/fuji-spinner-dark-1.0.0.svg";

const LoadingScreen = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTimeout = setTimeout(() => {
      setLoading(false);
      clearTimeout(loadTimeout);
    }, 10000);
  }, []);

  return (
    loading && (
      <div
        className="h-screen w-full flex justify-center items-center"
        style={{
          background: "#fff",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(5px)",
          border: "1px solid rgba(73, 154, 255, 0.3)",
        }}
      >
        <div className="flex justify-center items-center flex-col">
          <img className=" h-[150px] mt-2 animate-pulse" src={spinner} />
          <div className="text-blue-900 text-[20px] animate-pulse">
            Loading . . .
          </div>
        </div>
      </div>
    )
  );
};

export default LoadingScreen;
