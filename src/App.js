import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TimeTable from './components/TimeTable'
import TaskForm from './components/TaskForm'
import Setting from './components/Setting'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.initialState
    this.updateTasksHandler = this.updateTasks.bind(this)
    this.removeTaskHandler = this.removeTask.bind(this)
    this.updateTimelineStartHandler = this.updateTimelineStart.bind(this)
    this.updateTimelineEndHandler = this.updateTimelineEnd.bind(this)
  }

  get initialState() {
    const initialTask = {
      name: '',
      length: 30,
      color: '#fafafa',
    }
    return {
      tasks: Array(36).fill(initialTask),
      start: 6,
      end: 24,
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

  updateTimelineStart(time) {
    this.setState({start: time})
  }

  updateTimelineEnd(time) {
    this.setState({end: time})
  }

  render() {
    const props = {
      start: this.state.start,
      end: this.state.end,
      tasks: this.state.tasks,
      updateTasks: this.updateTasksHandler,
      removeTask: this.removeTaskHandler,
    }
    const settingProps = {
      start: this.state.start,
      end: this.state.end,
      updateTimelineStart: this.updateTimelineStartHandler,
      updateTimelineEnd: this.updateTimelineEndHandler,
    }
    return (
      <MuiThemeProvider>
        <div style={{marginTop: 40}}>
          <div style={{float: 'left', width: '70%'}}>
            <TimeTable {...props} />
          </div>
          <div style={{float: 'left', width: '30%'}}>
            <TaskForm {...props} />
            <Setting {...settingProps}/>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
