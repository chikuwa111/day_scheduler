import React from 'react'
import {
  SortableContainer,
  SortableElement,
  arrayMove,
} from 'react-sortable-hoc'
import Paper from 'material-ui/Paper'
import Timeline from '../components/Timeline'

const TaskItem = SortableElement(({task, onIconClick}) => {
  return (
    <Paper
      style={{width: '80%', height: `${task.length / 15}em`, display: 'flex', alignItems: 'center'}}
    >
      <i onClick={onIconClick} style={{cursor: 'pointer'}}>×</i>
      <span style={{marginLeft: '5%', fontSize: `${0.8 + task.length / 150}em`}}>{task.name}</span>
    </Paper>
  )
})

const TaskList = SortableContainer(({tasks, removeTaskHandler}) => (
  <div>
    {tasks.map((task, index) => (
      <TaskItem key={index} index={index} task={task} onIconClick={removeTaskHandler(index)} />
    ))}
  </div>
))

class TimeTable extends React.Component {
  onSortEnd({oldIndex, newIndex}) {
    this.props.updateTasks(arrayMove(this.props.tasks, oldIndex, newIndex))
  }

  removeTaskHandler(index) {
    return () => {
      this.props.removeTask(index)
    }
  }

  render() {
    const {tasks} = this.props

    return (
      <div>
        <div style={{float: 'left', marginLeft: 50, marginRight: 10}}>
          <Timeline />
        </div>
        <div style={{marginTop: '1.6em'}}>
          <TaskList
            tasks={tasks}
            removeTaskHandler={this.removeTaskHandler.bind(this)}
            onSortEnd={this.onSortEnd.bind(this)}
          />
        </div>
      </div>
    );
  }
}

export default TimeTable
