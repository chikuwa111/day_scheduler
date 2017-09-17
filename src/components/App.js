import React from 'react'
import throttle from 'lodash/throttle'
import MediaQuery from 'react-responsive'
import {loadState, saveState} from '../lib/localStorage'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Paper from 'material-ui/Paper'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import ContentSettings from 'material-ui/svg-icons/action/settings'
import Dialog from 'material-ui/Dialog'
import TimeTable from '../components/TimeTable'
import Form from '../components/Form'
import Setting from '../components/Setting'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.initialState
    this.saveStateLocal = throttle((state) => {saveState(state)}, 1000)

    this.updateTasksAction = this.updateTasks.bind(this)
    this.removeTaskAction = this.removeTask.bind(this)
    this.addTaskAction = this.addTask.bind(this)
    this.fillTimeTableAction = this.fillTimeTable.bind(this)
    this.removeExtraTasksAction = this.removeExtraTasks.bind(this)
    this.updateTimelineStartAction = this.updateTimelineStart.bind(this)
    this.updateTimelineEndAction = this.updateTimelineEnd.bind(this)
    this.openFormModalAction = this.openFormModal.bind(this)
    this.closeFormModalAction = this.closeFormModal.bind(this)
    this.openSettingModalAction = this.openSettingModal.bind(this)
    this.closeSettingModalAction = this.closeSettingModal.bind(this)
  }

  get initialState() {
    const localState = loadState()
    if (localState) {
      return {
        ...localState,
        isFormModalOpen: false,
        isSettingModalOpen: false,
      }
    }

    const initialTask = {
      name: '',
      length: 30,
      color: '#fafafa',
    }
    return {
      tasks: Array(36).fill(initialTask),
      start: 6,
      end: 24,
      isFormModalOpen: false,
      isSettingModalOpen: false,
    }
  }

  componentDidUpdate() {
    this.saveStateLocal({
      tasks: this.state.tasks,
      start: this.state.start,
      end: this.state.end,
    })
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

  openFormModal() {
    this.setState({isFormModalOpen: true})
  }

  closeFormModal() {
    this.setState({isFormModalOpen: false})
  }

  openSettingModal() {
    this.setState({isSettingModalOpen: true})
  }

  closeSettingModal() {
    this.setState({isSettingModalOpen: false})
  }

  render() {
    const TimeTableProps = {
      start: this.state.start,
      end: this.state.end,
      tasks: this.state.tasks,
      updateTasks: this.updateTasksAction,
      removeTask: this.removeTaskAction,
    }
    const FormProps = {
      addTask: this.addTaskAction,
    }
    const SettingProps = {
      start: this.state.start,
      end: this.state.end,
      updateTimelineStart: this.updateTimelineStartAction,
      updateTimelineEnd: this.updateTimelineEndAction,
      fillTimeTable: this.fillTimeTableAction,
      removeExtraTasks: this.removeExtraTasksAction,
      updateTasks: this.updateTasksAction,
    }

    return (
      <MuiThemeProvider>
        <div style={{marginTop: 20}}>

        <MediaQuery minWidth={768}>
          <div style={{float: 'left', width: '60%', marginLeft: '5%', marginRight: '5%'}}>
            <TimeTable {...TimeTableProps} />
          </div>
          <div style={{float: 'left', width: '25%', marginRight: '5%'}}>
            <Paper>
              <Form {...FormProps} />
            </Paper>
            <Paper style={{marginTop: 20}}>
              <Setting {...SettingProps}/>
            </Paper>
          </div>
        </MediaQuery>

        <MediaQuery maxWidth={767}>
          <div style={{width: '90%', marginLeft: '5%', marginRight: '5%'}}>
            <TimeTable {...TimeTableProps} />
          </div>
          <div style={{position: 'fixed', bottom: '2%', right: '2%', textAlign: 'right'}}>
            <div style={{marginBottom: 5}}>
              <FloatingActionButton
                mini
                children={<ContentSettings />}
                onClick={this.openSettingModalAction}
              />
            </div>
            <div>
              <FloatingActionButton
                secondary
                children={<ContentAdd />}

                onClick={this.openFormModalAction}
              />
            </div>
          </div>
          <Dialog
            autoScrollBodyContent
            open={this.state.isFormModalOpen}
            onRequestClose={this.closeFormModalAction}
          >
            <Form {...FormProps} />
          </Dialog>
          <Dialog
            autoScrollBodyContent
            open={this.state.isSettingModalOpen}
            onRequestClose={this.closeSettingModalAction}
          >
            <Setting {...SettingProps}/>
          </Dialog>
        </MediaQuery>

        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
