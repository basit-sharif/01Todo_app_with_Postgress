"use client"
import { FC, useEffect, useState } from "react"
import AddBtn from "../assets/AddBtn"
import BottomLine from "../assets/BottomLine"
import Tasks from "./Tasks"
import Loadings from "../shared/Loading"


async function fetchTodoData() {
  let res = await fetch("/api/todo", { cache: "no-store" });
  return res.json();
};

function makeRandomNumber() {
  const uniqueNumber = 99999 * (Math.random()) * (Math.random());
  return uniqueNumber;
}


const Hero = () => {

  const [todosDataOrg, setTodosDataOrg] = useState<any>();
  const [inputTodo, setInputTodo] = useState<string>("");
  const [isLoading, setLoading] = useState(false);

  async function fetchTodoDataCallFunc() {
    let res = await fetchTodoData();
    console.log("Gotted response")
    setTodosDataOrg(res.res.rows);
  }

  useEffect(() => {
    fetchTodoDataCallFunc();
  }, []);

  async function handleToAddTodo() {
    setLoading(true);
    const idOfUser = localStorage.getItem("userUniqueId");
    if (idOfUser === null) {
      const newGenratedUserUniqueId = makeRandomNumber();
      await localStorage.setItem("userUniqueId", JSON.stringify(newGenratedUserUniqueId));
      await fetch("/api/todo", {
        method: "POST",
        body: JSON.stringify({
          title: inputTodo,
          description: "Not Desc",
          userId: localStorage.getItem("userUniqueId"),
        })
      });
      await fetchTodoDataCallFunc();
    } else {
      console.log("This is second time : ", idOfUser)
      await fetch("/api/todo", {
        method: "POST",
        body: JSON.stringify({
          title: inputTodo,
          description: "Not Desc",
          userId: idOfUser,
        })
      });
      await fetchTodoDataCallFunc();
    };
    setLoading(false);
    setInputTodo("")
  };

  return (
    <div className="heroFullPage">
      <div className="relative px-11 min-w-[22rem] flex flex-col justify-center min-h-[25rem] rounded-xl shadow-2xl bg-[#E67483]">
        <div className="absolute top-6 left-5 right-5 space-y-3 h-64 overflow-auto scrollbar-thin scrollbar-thumb-slate-400 md:scrollbar-none">
          {todosDataOrg ? todosDataOrg.map((item: any, index: number) => {
            if (item.userid == localStorage.getItem("userUniqueId")) {
              return (
                <Tasks key={index} item={item} fetchTodoDataCallFunc={fetchTodoDataCallFunc} />
              )
            } else {
              return ""
            }
          }
          ) :
            <div className="w-16 mx-auto">
              <Loadings />
            </div>
          }
        </div>
        <div className="absolute left-0 right-0 bottom-4 flex flex-col items-center gap-y-5">
          <div className="flex gap-x-3 items-center">
            <input value={inputTodo} onChange={(e) => setInputTodo(e.target.value)} type="text" className="inputt" placeholder="Add New Task" />
            {
              isLoading ?
                <div className="w-7 pl-1">
                  <Loadings />
                </div>
                :
                <div className={`cursor-pointer`} onClick={handleToAddTodo}>
                  <AddBtn />
                </div>
            }
          </div>
          <BottomLine />
        </div>
      </div>
    </div>
  )
}

export default Hero