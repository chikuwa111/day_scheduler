import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TimeTable from './components/TimeTable'
import Form from './components/Form'
import Setting from './components/Setting'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.initialState
    this.updateTasksHandler = this.updateTasks.bind(this)
    this.removeTaskHandler = this.removeTask.bind(this)
    this.addTaskHandler = this.addTask.bind(this)
    this.fillTimeTableHandler = this.fillTimeTable.bind(this)
    this.removeExtraTasksHandler = this.removeExtraTasks.bind(this)
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

  addTask(task) {
    this.setState({
      tasks: [
        task,
        ...this.state.tasks,
      ]
    })
  }

  fillTimeTable() {
    const {tasks, start, end} = this.state
    const wholeMinutesInTable = (end - start) * 60
    const sumMinutesOfTasks = tasks.reduce((sum, task) => (sum + task.length), 0)
    let roomMinutesInTable = wholeMinutesInTable - sumMinutesOfTasks
    let newTasks = tasks.slice(0)
    while(roomMinutesInTable > 0) {
      newTasks.push({
        name: '',
        color: '#fafafa',
        length: roomMinutesInTable >= 30 ? 30 : roomMinutesInTable
      })
      roomMinutesInTable -= 30
    }
    this.setState({tasks: newTasks})
  }

  removeExtraTasks() {
    const {tasks, start, end} = this.state
    let wholeMinutesInTable = (end - start) * 60
    let index
    tasks.every((task, i) => {
      wholeMinutesInTable -= task.length
      if(wholeMinutesInTable < 0) {
        index = i
        return false
      }
      return true
    })
    if (index) {
      this.setState({tasks: tasks.slice(0, index)})
    }
  }

  updateTimelineStart(time) {
    this.setState({start: time})
  }

  updateTimelineEnd(time) {
    this.setState({end: time})
  }

  render() {
    const TimeTableProps = {
      start: this.state.start,
      end: this.state.end,
      tasks: this.state.tasks,
      updateTasks: this.updateTasksHandler,
      removeTask: this.removeTaskHandler,
    }
    const FormProps = {
      addTask: this.addTaskHandler,
    }
    const SettingProps = {
      start: this.state.start,
      end: this.state.end,
      updateTimelineStart: this.updateTimelineStartHandler,
      updateTimelineEnd: this.updateTimelineEndHandler,
      fillTimeTable: this.fillTimeTableHandler,
      removeExtraTasks: this.removeExtraTasksHandler,
      updateTasks: this.updateTasksHandler,
    }
    return (
      <MuiThemeProvider>
        <div style={{marginTop: 40}}>
          <div style={{float: 'left', width: '70%'}}>
            <TimeTable {...TimeTableProps} />
          </div>
          <div style={{float: 'left', width: '30%'}}>
            <Form {...FormProps} />
            <Setting {...SettingProps}/>
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
