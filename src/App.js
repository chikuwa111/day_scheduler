import React from 'react'
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
      tasks: Array(36).fill(initialTask),
    }
  }

  updateTasks(tasks) {
    this.setState({tasks})
  }

  render() {
    const props = {
      tasks: this.state.tasks,
      updateTasks: this.updateTasks.bind(this),
    }
    return (
      <div>
        <div style={{float: 'left', width: '50%'}}>
          <TimeTable {...props} />
        </div>
        <div style={{float: 'left', width: '50%'}}>
          <TaskForm {...props} />
        </div>
      </div>
    )
  }
}

export default App
