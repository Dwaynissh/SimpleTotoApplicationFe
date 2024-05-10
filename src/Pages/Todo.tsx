import DashDetailsProps from "../Components/Props/DashDetailsProps";
import { AiOutlineSearch } from "react-icons/ai";
import { FaTasks } from "react-icons/fa";
import { GrInProgress } from "react-icons/gr";
import { BsCalendarDate } from "react-icons/bs";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { MdDelete, MdOutlineBorderColor } from "react-icons/md";
import { useEffect, useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment";

const Todo = () => {
  const [search, setSearch] = useState("");
  const [done, setDone] = useState([]);
  const [progress, setProgress] = useState([]);
  const [task, setTask] = useState([]);
  const [parent] = useAutoAnimate();
  const [forceRender, setForceRender] = useState(false);

  const fetchData = () => {
    const url: string = "http://localhost:7700/todo/get-combined";
    //   "https://simpletotoapplicationbe.onrender.com/todo/get-combined";

    fetch(url, { method: "GET" })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log("show me", res?.data);
        // setState(res?.data);
        setDone(res?.data?.done);
        setProgress(res?.data?.progress);
        setTask(res?.data?.task);
      });
  };

  const upgradeToProgress = (ID: string) => {
    const url: string = `http://localhost:7700/todo/progress/${ID}`;
    //   `https://simpletotoapplicationbe.onrender.com/todo/progress/${ID}`;

    fetch(url, { method: "POST" })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setDone(res?.data);
        setForceRender((prevState) => !prevState);
      });
  };

  const changeToDone = (ID: string) => {
    const url: string = `http://localhost:7700/todo/done/${ID}`;
    //   `https://simpletotoapplicationbe.onrender.com/todo/done/${ID}`;

    fetch(url, { method: "PATCH" })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setDone(res?.data);
        setForceRender((prevState) => !prevState);
      });
    //
  };

  const deleteTask = (ID: string) => {
    const url: string = `http://localhost:7700/todo/delete/${ID}`;
    //   `https://simpletotoapplicationbe.onrender.com/todo/delete/${ID}`;

    fetch(url, { method: "DELETE" })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        toast.success("Task deleted successfully");
        setDone(res?.data);
        setForceRender((prevState) => !prevState);
      });
  };

  useEffect(() => {
    fetchData();
  }, [forceRender]);

  //   let allValues = Object.values(state);
  //   console.log("lemme see values", allValues);

  //   const searchTask = allValues
  //     .filter((subArray: any[]) => {
  //       return subArray.some((props: any) => {
  //         return props.title.toLowerCase().includes(search.toLowerCase());
  //       });
  //     })
  //     .flat(2);

  // title.toLowerCase().includes(search.toLowerCase());

  return (
    <div className="mt-[70px] h-[calc(100vh-70px)] w-full flex justify-center items-start relative">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-[93%] md:w-[90%] h-full  pt-[10px] ">
        <DashDetailsProps />
        <div className="w-full flex justify-start items-center mb-4">
          <div className="p-2 rounded-lg border border-gray-300 flex justify-center items-center">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tasks"
              className="p-2 h-full bg-white border-none outline-none"
            />
            <div className="p-2 bg-blue-900 rounded-lg">
              <AiOutlineSearch className="text-[20px] text-white" />
            </div>
          </div>
        </div>
        {/* <div className="w-full h-[700px] border">
          {searchTask.flatMap((props: any) => (
            <div
              key={props._id}
              className="mb-5 min-h-[70px] shadow-sm rounded-2xl bg-white py-4 px-4 hover:shadow-lg"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="rounded-full bg-red-500 h-[10px] w-[10px]"></div>
                <div className="flex flex-1 justify-start items-center gap-4">
                  <div className="text-[21px] font-bold">{props.title}</div>
                  <div className="mt-1">
                    {moment(props?.createdAt).fromNow()}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MdDelete
                    className="mt-1 text-[20px] cursor-pointer"
                    onClick={() => deleteTask(props._id)}
                  />
                </div>
              </div>
              <div className="text-blue-900 mb-2">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit
                possimus saepe consequatur quo nam dolores accusantium dicta
                eaque
              </div>
              <div className="mb-2 flex items-center justify-between font-semibold">
                <div className="flex items-center gap-1">
                  <MdOutlineBorderColor />
                  <div>Priority :</div>
                </div>
                <div>Important</div>
              </div>
              <div className="mb-3 flex items-center justify-between font-semibold">
                <div className="flex items-center gap-1">
                  <BsCalendarDate />
                  <div> Due date :</div>
                </div>
                <div>9th May 2024</div>
              </div>
              <div className="flex justify-center items-center gap-2">
                <h2 className="font-medium text-blue-900">
                  Update Task Status
                </h2>
                <button
                  className={`py-2 px-4 rounded-lg ${
                    props.progress && props.done
                      ? "bg-green-400"
                      : props.progress && !props.done
                      ? "bg-orange-400"
                      : "bg-blue-900"
                  }  text-white text-[15px] font-medium flex justify-center items-center gap-2`}
                  onClick={() => {
                    !props.progress && !props.done
                      ? upgradeToProgress(props?._id)
                      : props?.progress && !props.done
                      ? changeToDone(props?._id)
                      : changeToDone(props?._id);
                  }}
                >
                  {props.progress && props.done
                    ? "Completed"
                    : props.progress && !props.done
                    ? "In Progress"
                    : "Start"}
                </button>
              </div>
            </div>
          ))}
        </div> */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-gray-100 m-2 rounded-xl p-5">
            <div className="flex py-6 items-center justify-between">
              <div className="flex items-center gap-2 text-blue-900 font-semibold text-[19px]">
                <FaTasks />
                <div className="">To Do</div>
              </div>
              <div className="flex items-center text-blue-900 font-semibold text-[19px]">
                <div className="cursor-pointer">•••</div>
              </div>
            </div>

            <div className="vsm" ref={parent}>
              {/* First card */}
              {task?.map((props: any) => (
                <div
                  key={props?._id}
                  className="mb-5 min-h-[70px] shadow-sm rounded-2xl bg-white py-4 px-4 hover:shadow-lg"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="rounded-full bg-red-500 h-[10px] w-[10px]"></div>
                    <div className="flex flex-1 justify-start items-center gap-4">
                      <div className="text-[21px] font-bold">
                        {props?.title}
                      </div>
                      <div className="mt-1">
                        {moment(props?.createdAt).fromNow()}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MdDelete
                        className="mt-1 text-[20px] cursor-pointer"
                        onClick={() => deleteTask(props?._id)}
                      />
                    </div>
                  </div>
                  <div className="text-blue-900 mb-2">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Fugit possimus saepe consequatur quo nam dolores accusantium
                    dicta eaque
                  </div>
                  <div className="mb-2 flex items-center justify-between font-semibold">
                    <div className="flex items-center gap-1">
                      <MdOutlineBorderColor />
                      <div>Priority :</div>
                    </div>
                    <div>Important</div>
                  </div>
                  <div className="mb-3 flex items-center justify-between font-semibold">
                    <div className="flex items-center gap-1">
                      <BsCalendarDate />
                      <div> Due date :</div>
                    </div>
                    <div>9th May 2024</div>
                  </div>
                  <div className="flex justify-center items-center gap-2">
                    <h2 className="font-medium text-blue-900">
                      Update Task Status
                    </h2>
                    <button
                      className={`py-2 px-4 rounded-lg ${
                        props?.progress && props?.done
                          ? "bg-green-400"
                          : props?.progress && !props?.done
                          ? "bg-orange-400"
                          : "bg-blue-900"
                      }  text-white text-[15px] font-medium flex justify-center items-center gap-2`}
                      onClick={() => {
                        !props?.progress && !props?.done
                          ? upgradeToProgress(props?._id)
                          : props?.progress && !props?.done
                          ? changeToDone(props?._id)
                          : changeToDone(props?._id);
                      }}
                    >
                      {props?.progress && props?.done
                        ? "Completed"
                        : props?.progress
                        ? "In Progress"
                        : "Start"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gray-100 m-2 rounded-xl p-4">
            <div className="flex py-6 items-center justify-between">
              <div className="flex items-center gap-2 text-blue-900 font-semibold text-[19px]">
                <GrInProgress />
                <div className="">In Progress</div>
              </div>
              <div className="flex items-center text-blue-900 font-semibold text-[19px]">
                <div className="cursor-pointer">•••</div>
              </div>
            </div>
            <div className="vsm" ref={parent}>
              {/* First card */}
              {progress?.map((props: any) => (
                <div
                  key={props?._id}
                  className="mb-5 min-h-[70px] shadow-sm rounded-2xl bg-white py-4 px-4 hover:shadow-lg"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="rounded-full bg-red-500 h-[10px] w-[10px]"></div>
                    <div className="flex flex-1 justify-start items-center gap-4">
                      <div className="text-[21px] font-bold">
                        {props?.title}
                      </div>
                      <div className="mt-1">
                        {moment(props?.createdAt).fromNow()}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MdDelete
                        className="mt-1 text-[20px] cursor-pointer"
                        onClick={() => deleteTask(props?._id)}
                      />
                    </div>
                  </div>
                  <div className="text-blue-900 mb-2">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Fugit possimus saepe consequatur quo nam dolores accusantium
                    dicta eaque
                  </div>
                  <div className="mb-2 flex items-center justify-between font-semibold">
                    <div className="flex items-center gap-1">
                      <MdOutlineBorderColor />
                      <div>Priority :</div>
                    </div>
                    <div>Important</div>
                  </div>
                  <div className="mb-3 flex items-center justify-between font-semibold">
                    <div className="flex items-center gap-1">
                      <BsCalendarDate />
                      <div> Due date :</div>
                    </div>
                    <div>9th May 2024</div>
                  </div>
                  <div className="flex justify-center items-center gap-2">
                    <h2 className="font-medium text-blue-900">
                      Update Task Status
                    </h2>
                    <button
                      className={`py-2 px-4 rounded-lg ${
                        props?.progress && props?.done
                          ? "bg-green-400"
                          : props?.progress && !props?.done
                          ? "bg-orange-400"
                          : "bg-red-500"
                      }  text-white text-[15px] font-medium flex justify-center items-center gap-2`}
                      onClick={() => {
                        !props?.progress && !props?.done
                          ? upgradeToProgress(props?._id)
                          : props?.progress && !props?.done
                          ? changeToDone(props?._id)
                          : changeToDone(props?._id);
                      }}
                    >
                      {props?.progress && props?.done
                        ? "Completed"
                        : props?.progress
                        ? "In Progress"
                        : "Start"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gray-100 m-2 rounded-xl p-4">
            <div className="flex py-6 items-center justify-between">
              <div className="flex items-center gap-2 text-blue-900 font-semibold text-[19px]">
                <IoCheckmarkDoneSharp />
                <div className="">Done</div>
              </div>
              <div className="flex items-center text-blue-900 font-semibold text-[19px]">
                <div className="cursor-pointer">•••</div>
              </div>
            </div>
            <div className="vsm" ref={parent}>
              {/* First card */}
              {Array.isArray(done) &&
                done?.map((props: any) => (
                  <div
                    key={props?._id}
                    className="mb-5 min-h-[70px] shadow-sm rounded-2xl bg-white py-4 px-4 hover:shadow-lg"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="rounded-full bg-red-500 h-[10px] w-[10px]"></div>
                      <div className="flex flex-1 justify-start items-center gap-4">
                        <div className="text-[21px] font-bold">
                          {props?.title}
                        </div>
                        <div className="mt-1">
                          {moment(props?.createdAt).fromNow()}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <MdDelete
                          className="mt-1 text-[20px] cursor-pointer"
                          onClick={() => deleteTask(props?._id)}
                        />
                      </div>
                    </div>
                    <div className="text-blue-900 mb-2">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Fugit possimus saepe consequatur quo nam dolores
                      accusantium dicta eaque
                    </div>
                    <div className="mb-2 flex items-center justify-between font-semibold">
                      <div className="flex items-center gap-1">
                        <MdOutlineBorderColor />
                        <div>Priority :</div>
                      </div>
                      <div>Important</div>
                    </div>
                    <div className="mb-3 flex items-center justify-between font-semibold">
                      <div className="flex items-center gap-1">
                        <BsCalendarDate />
                        <div> Due date :</div>
                      </div>
                      <div>9th May 2024</div>
                    </div>
                    <div className="flex justify-center items-center gap-2">
                      <button
                        className={`py-2 px-4 rounded-lg ${
                          props?.progress && props?.done
                            ? "bg-green-400"
                            : props?.progress && !props?.done
                            ? "bg-orange-400"
                            : "bg-red-500"
                        }  text-white text-[15px] font-medium flex justify-center items-center gap-2`}
                      >
                        {props?.progress && props?.done
                          ? "Completed"
                          : props?.progress
                          ? "In Progress"
                          : "Start"}
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
