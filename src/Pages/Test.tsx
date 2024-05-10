import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Test = () => {
  const [startDate, setStartDate] = useState<Date>(new Date());

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="h-[500px] w-[500px] border border-black">
        <div>Hi</div>
        <DatePicker
          className="bg-gray-200"
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
          showTimeSelect
          dateFormat="Pp"
        />
      </div>
    </div>
  );
};

export default Test;
