import Header from "./components/Header";
import AddForm from "./components/AddForm";
import Item from "./components/Item";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);
  const [theme, setTheme] = useState("light");

  //localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function deleteTask(id) {
    const result = tasks.filter((item) => item.id !== id);
    setTasks(result);
  }

  function saveTask(e) {
    e.preventDefault();
    if (!title) {
      alert("กรุณาป้อนข้อมูลด้วยครับ");
    } else if (editId) {
      //แก้ไขข้อมูล
      const updatetask = tasks.map((item) => {
        if (item.id === editId) {
          return { ...item, title: title };
        }
        return item;
      });
      setTasks(updatetask);
      setEditId(null);
      setTitle("");
      console.log("แก้ไข");
    } else {
      //เพิ่มรายการใหม่
      const newTask = { id: Math.floor(Math.random() * 1000), title: title };
      setTasks([...tasks, newTask]);
      setTitle("");
      console.log("เพิ่ม");
    }
  }

  function editTask(id) {
    setEditId(id);
    const editTask = tasks.find((item) => item.id === id);
    setTitle(editTask.title);
  }

  return (
    <div className={"App " + theme}>
      <Header theme={theme} setTheme={setTheme} />
      <div className="container">
        <AddForm
          title={title}
          setTitle={setTitle}
          saveTask={saveTask}
          editId={editId}
        />
        <section>
          {tasks.map((data) => (
            <Item
              key={data.id}
              data={data}
              deleteTask={deleteTask}
              editTask={editTask}
            />
          ))}
        </section>
      </div>
    </div>
  );
}

export default App;
