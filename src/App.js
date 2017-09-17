import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TimeTable from './components/TimeTable'
import TaskForm from './components/TaskForm'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.initialState
    this.updateTasksHandler = this.updateTasks.bind(this)
    this.removeTaskHandler = this.removeTask.bind(this)
  }

  get initialState() {
    const initialTask = {
      name: '',
      length: 30,
      color: 'white',
    }
    return {
      tasks: Array(36).fill(initialTask),
    }
  }

  updateTasks(tasks) {
    this.setState({tasks})
  }

  removeTask(index) {
    const {tasks} = this.state
    this.setState({
      tasks: [
        ...tasks.slice(0, index),
        ...tasks.slice(index + 1),
      ]
    })
  }

  render() {
    const props = {
      tasks: this.state.tasks,
      updateTasks: this.updateTasksHandler,
      removeTask: this.removeTaskHandler,
    }
    return (
      <MuiThemeProvider>
        <div style={{marginTop: 40}}>
          <div style={{float: 'left', width: '70%'}}>
            <TimeTable {...props} />
          </div>
          <div style={{float: 'left', width: '30%'}}>
            <TaskForm {...props} />
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
