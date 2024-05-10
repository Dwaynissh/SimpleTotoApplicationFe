import { FC, ReactNode } from "react";

interface iBtnProps {
  text: string;
  icon?: ReactNode;
  onClick?: () => void;
}

const BtnProps: FC<iBtnProps> = ({ text, icon, onClick }) => {
  return (
    <div>
      <button
        onClick={onClick}
        className="py-2 px-4 rounded-lg bg-blue-900 text-white font-medium flex justify-center items-center gap-2"
      >
        {text} {icon}
      </button>
    </div>
  );
};

export default BtnProps;
