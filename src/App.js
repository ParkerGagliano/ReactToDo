import './App.css';
import Header from './components/Header'
import Tasks from './components/Tasks'
import {useState,useEffect} from 'react'
import AddTask from './components/AddTask'

function App() {

  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])



  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)

    }
    getTasks()
  }, [])

// Fetch Taks
const fetchTasks = async () => {
  const res = await fetch('http://localhost:5000/tasks')
  const data = await res.json()
  return data

}

const fetchTask = async (id) => {
  const res = await fetch(`http://localhost:5000/tasks/${id}`)
  const data = await res.json()
  return data

}
const addTask= async(task) => {
  const res = await fetch('http://localhost:5000/tasks',{
    method: 'POST',
    headers:{
      'Content-type': 'application/json'
    },
    body: JSON.stringify(task)
  })

  const data = await res.json()

  setTasks([...tasks, data])

  //const id= Math.floor(Math.random()*10000)+1
  //console.log(id)
  //const newTask = {id, ...task}
  //setTasks([...tasks, newTask])
}


// Delete Task
const deleteTask = async (id) => {
  await fetch(`http://localhost:5000/tasks/${id}`,{
    method: 'DELETE'
  })

  setTasks(tasks.filter((task)=>task.id !== id))
}

const toggleReminder= async (id)=> {

  const taskToToggle=await fetchTask(id)
  const updTask = {...taskToToggle, reminder: !taskToToggle.reminder}
  const res = await fetch(`http://localhost:5000/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json'

    },
    body: JSON.stringify(updTask)
  })
  const data = await res.json()
  setTasks(tasks.map((task) => 
  task.id===id ? {...task, reminder: !task.reminder} : task))
}

  return (
    <div className="container">
      <Header showAdd={showAddTask} onAdd={()=> setShowAddTask(!showAddTask)}/>
      {showAddTask && <AddTask onAdd={addTask}/>}
      {tasks.length>0?<Tasks onToggle={toggleReminder}tasks={tasks} onDelete={deleteTask}/>:'No Tasks To Show'}
    </div>
  );
}

export default App;
