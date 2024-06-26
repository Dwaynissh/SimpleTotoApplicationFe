import { FaAngleDown, FaPlus } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { CiNoWaitingSign } from "react-icons/ci";
import BtnProps from "./BtnProps";
import { FC, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DashDetailsProps: FC = () => {
  const [toggle, setToggle] = useState(false);
  const [text, setText] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");
  const [priority, setPriority] = useState<string>("");

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const createTask = () => {
    const url: string =
      "https://simpletotoapplicationbe.onrender.com/todo/createtodo/";
    // "http://localhost:7700/todo/createtodo";

    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: text,
        desc: description,
        priority: priority,
        dueDate: dueDate,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then(() => {
        toast.success("Task created successfully");
        handleToggle();
        window.location.reload();
      })
      .catch(() => {
        toast.error("Failed to create task");
      });
  };

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex justify-between items-center">
        <div className="md:flex items-center gap-3">
          <div className="uppercase font-medium text-[13px] md:text-[15px]">
            Today
          </div>
          <div className="text-[17px] md:text-[20px] text-blue-800 font-bold">
            2nd May 2024
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-full w-[40px] py-2 px-3 bg-gray-200 text-blue-800 font-semibold">
            PJ
          </div>
          <div>Prince John</div>
        </div>
      </div>
      <div className="border border-b my-2"></div>
      <div className="py-[40px] flex items-center justify-between">
        <div className="">
          <h1 className="text-[23px] font-bold text-blue-800">Dashboard</h1>
        </div>
        <div className="flex items-center gap-3">
          <BtnProps text="New task" icon={<FaPlus />} onClick={handleToggle} />
          <div className="flex items-center gap-1 text-blue-800">
            <h3>This week</h3>
            <FaAngleDown className="mt-1" />
          </div>
        </div>
      </div>
      {/* My Add Task Toggle */}
      {toggle && (
        <div className="absolute w-full h-[calc(100vh-70px)] py-[70px] top-[0px] left-0 flex justify-center items-center backdrop-blur-sm z-20">
          {" "}
          <div className="bxs p-[20px] rounded-lg bg-gray-100 border py-2 px-3 h-[330px] w-[380px] flex justify-center items-center flex-col mb-4">
            <div className="w-full flex justify-end items-center">
              {/* <div className="tooltip" data-tip="hello">
                <button className="btn">Hover me</button>
              </div> */}
              <div
                className="mb-4 text-red-500 bg-white p-1 rounded-xl cursor-pointer"
                onClick={handleToggle}
              >
                <AiOutlineClose className="animate-pulse text-[22px] font-medium" />
              </div>
            </div>

            <input
              className="pl-2 mb-4 rounded-md h-[35px] w-full bg-white"
              type="text"
              placeholder="Title"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
            />

            <input
              className="pl-2 mb-4 rounded-md h-[35px] w-full bg-white"
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />

            <select
              name="priority"
              id=""
              value={priority}
              className="pl-2 mb-4 rounded-md h-[35px] w-full bg-white"
              onChange={(e) => {
                setPriority(e.target.value);
              }}
            >
              <option>Select</option>
              <option value="Not too important">Not too important</option>
              <option value="Important">Important</option>
              <option value="Very Important">Very Important</option>
            </select>

            <input
              className="pl-2 mb-4 rounded-md h-[35px] w-full bg-white"
              type="text"
              placeholder="Due Date"
              value={dueDate}
              onChange={(e) => {
                setDueDate(e.target.value);
              }}
            />
            <div>
              {/* <DatePicker
                className="w-full pl-2 mb-4 rounded-md h-[35px] bg-white"
                value={dueDate}
                onChange={(e: any) => setDueDate(e.target.value)}
                showTimeSelect
                dateFormat="Pp"
              /> */}
            </div>

            <button
              className={`py-2 px-4 w-[50%] flex justify-center items-center rounded-md ${
                text && description && priority && dueDate
                  ? "bg-blue-800"
                  : "bg-gray-500"
              }  text-white font-medium`}
              onClick={() => {
                setText("");
                createTask();
              }}
            >
              {text && description && priority && dueDate ? (
                "Add Task"
              ) : (
                <CiNoWaitingSign className="text-[18px]" />
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashDetailsProps;
