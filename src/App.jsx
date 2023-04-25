import { useState,useEffect } from 'react'

import './App.css'

function App() {
  const [todos, setTodos] = useState(() => {
    const storedItems = JSON.parse(localStorage.getItem("todos"));
    return storedItems || [];
  });
  const [mode, setMode] = useState("create");
  const [formData, setFormData] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const [checked, setChecked] = useState([]);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("todos"));
    if (storedItems) {
      setTodos(storedItems);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  //handle Formchange
  function handleFormData(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  //handle Create

  function handleCreate(e) {
    e.preventDefault();

    setTodos([...todos, formData]);
    setFormData({});
  }

  //handle select
  function handleSelect(item) {
    setMode("edit");
    setSelectedItem(item);
    setFormData(item);
  }

  //handle update
  function handleUpdate(e, item) {
    e.preventDefault();
    const updatedItems = todos.map((item) =>
      item === selectedItem ? formData : item
    );
    setTodos(updatedItems);
    setFormData({});
    setMode("create");
  }
  // handle checkbox
  function handlCheckbox(e, item) {
    if (checked.includes(item)) {
      setChecked(checked.filter((todoId) => todoId !== item));
      setFormData({});
    } else {
      setChecked([...checked, item]);
      setFormData({});
    }
  }
  // handle delete
  function handleDelete() {
    setTodos(todos.filter((todo) => !checked.includes(todo)));
    setChecked([]);
    setMode("create");
  }

  return (
    <>
      <div className="container">
        <h2 className="logo">TODO</h2>
        <form>
          <input
            className="title"
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleFormData}
            placeholder="title"
          />
          <br />
          <input
            className="desc"
            type="text"
            name="description"
            value={formData.description || ""}
            onChange={handleFormData}
            placeholder="description"
          />
          <br />
          <button
            className="btn"
            onClick={mode === "create" ? handleCreate : handleUpdate}
          >
            {mode === "create" ? "Create" : "Edit"}
          </button>
          {checked.length <= 0 ? null : (
            <button className="btn" onClick={handleDelete}>
              {" "}
              Delete
            </button>
          )}
        </form>

        <ul>
          {todos.length === 0 ? (
            <p> No todos</p>
          ) : (
            todos.map((todo, index) => {
              return (
                <li onClick={() => handleSelect(todo)} key={index}>
                  {" "}
                  <input
                    type="checkbox"
                    className="check"
                    checked={checked.includes(todo)}
                    onChange={(e) => handlCheckbox(e, todo)}
                  />
                  {JSON.stringify(todo)}
                </li>
              );
            })
          )}
        </ul>
      </div>
    </>
  )
}

export default App
