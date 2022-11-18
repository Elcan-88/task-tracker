import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import AddTask from './components/AddTask';
import Tasks from './components/Tasks';
import About from './components/About';

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    }

    getTasks();
  }, [])

  // Fetch Tasks
  const fetchTasks = async () => {
    const resp = await fetch('http://localhost:5000/tasks');
    const data = await resp.json();
    return data;
  }

  // Get Task
  const getTask = async (id) => {
    const resp = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await resp.json();
    return data;
  }

  // Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE"
    })
    setTasks(tasks.filter(task => task.id !== id))
  }

  const addTask = async (task) => {
    const resp = await fetch(`http://localhost:5000/tasks`, {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    });

    const data = await resp.json();
    setTasks([...tasks, data]);
  }

  const toggleReminder = async (id) => {
    const taskToToggle = await getTask(id);
    const updTask = {...taskToToggle, reminder: !taskToToggle.reminder};

    const resp = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    });

    const data = await resp.json();

    setTasks(tasks.map(task => 
      task.id === id ? {...task, reminder: !data.reminder} : task  
    ))
  }

  return (
    <Router>
      <div className="container">
        <Header 
          title="Task Tracker"
          onToggle={() => setShowAddTask(!showAddTask)} 
          showAddTask={showAddTask}
        />
        <Routes>
          <Route 
            path="/" 
            element={
              <>
                {showAddTask && <AddTask onAdd={addTask} />}
                {tasks.length > 0
                ? <Tasks tasks={tasks} onToggle={toggleReminder} onDelete={deleteTask} />
                : 'No Tasks To Show'}
              </>
            }
          />

          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App;
