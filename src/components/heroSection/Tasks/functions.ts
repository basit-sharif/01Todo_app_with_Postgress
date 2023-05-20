export async function hadndleEdit(payLoad: string, setEditing: any, setLoading: any, inputData: any, id: number,fetchTodoDataCallFunc?:any) {
    if (payLoad === "start") {
        setEditing(true);
    } else if (payLoad === "done") {
        setEditing(false);
        setLoading(true);
        await fetch("/api/todo", {
            method: "PUT",
            body: JSON.stringify({
                id: id,
                title: inputData,
            })
        });
        setLoading(false);
    } else if (payLoad === "updateStatus") {
        setLoading(true);
        await fetch("api/todo", {
            method: "PUT",
            body: JSON.stringify({
                id: id,
                status: inputData,
            })
        })
        await fetchTodoDataCallFunc();
        setLoading(false);
    }
};

export async function handleDelete(id: number, setLoading: any, fetchTodoDataCallFunc: any) {
    setLoading(true);
    await fetch(`/api/todo?id=${id}`, {
        method: "DELETE",
    });
    await fetchTodoDataCallFunc();
    setLoading(false);
};