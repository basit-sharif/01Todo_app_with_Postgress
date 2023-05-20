import Done from "@/components/assets/Done.svg"
import Pencil from "@/components/assets/Pencil.png"
import Close from "@/components/assets/Close.svg"
import RoundedCir from "@/components/assets/RoundedCir"
import Image from "next/image"
import { FC, useEffect, useState } from "react"
import Loadings from "@/components/shared/Loading"
import { componentType } from "./types"
import { hadndleEdit, handleDelete } from "./functions"

const Tasks: FC<componentType> = ({ item, fetchTodoDataCallFunc }) => {
    const [isLoading, setLoading] = useState(false);
    const [inputData, setInputData] = useState(item.title);
    const [isEditing, setEditing] = useState(false);

    useEffect(() => {
        setInputData(item.title);
    }, [item]);

    return (
        <div className="flex items-center px-4 py-3 bg-white rounded-xl">
            {isLoading && <div className="w-full h-full absolute bg-slate-700 opacity-0 z-20" />}
            <div className="flex flex-1 items-center gap-3">
                {item.status ?
                    <RoundedCir />
                    : <div onClick={() => hadndleEdit("updateStatus", setEditing, setLoading, !item.status, item.id,fetchTodoDataCallFunc)} className="w-4 h-4 border-[2px] rounded-full" />
                }
                {
                    isEditing ?
                        <input
                            value={inputData}
                            onChange={(e) => setInputData(e.target.value)}
                            type="text"
                            className="ring-1 w-52 rounded-r-sm"
                            placeholder="Write new name here" /> :
                        <h1 className="w-[12.5rem] overflow-x-auto">
                            {inputData}
                        </h1>
                }
            </div>
            {
                isLoading ?
                    <div className="w-5">
                        <Loadings />
                    </div>
                    :
                    <div className="flex space-x-2 items-center">
                        {isEditing ? <div onClick={() => hadndleEdit("done", setEditing, setLoading, inputData, item.id)} className="w-[1.35rem] cursor-pointer">
                            <Image src={Done} alt="Close" />
                        </div> :
                            <div onClick={() => hadndleEdit("start", setEditing, setLoading, inputData, item.id)} className="w-[1.35rem]">
                                <Image src={Pencil} alt="Close" />
                            </div>}
                        <div onClick={() => handleDelete(item.id, setLoading, fetchTodoDataCallFunc)} className="w-5 cursor-pointer">
                            <Image src={Close} alt="Close" />
                        </div>
                    </div>
            }
        </div>
    )
}

export default Tasks