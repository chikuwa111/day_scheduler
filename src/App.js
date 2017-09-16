import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TimeTable from './components/TimeTable'
import TaskForm from './components/TaskForm'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.initialState
  }

  get initialState() {
    const initialTask = {
      name: '',
      length: 30,
      initial: true,
    }
    return {
      tasks: Array(5).fill(initialTask),
    }
  }

  updateTasks(tasks) {
    this.setState({tasks})
  }

  removeTask(index) {
    debugger
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
      updateTasks: this.updateTasks.bind(this),
      removeTask: this.removeTask.bind(this),
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
