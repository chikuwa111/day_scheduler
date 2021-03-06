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
      style={{
        maxWidth: '90%',
        height: `${task.length / 15}em`,
        backgroundColor: task.color,
        display: 'flex',
        alignItems: 'center',
        cursor: 'move',
      }}
    >
      <i onClick={onIconClick} style={{cursor: 'pointer', float: 'left', paddingLeft: 3}}>×</i>
      <div style={{paddingLeft: '2%', fontSize: `${0.8 + task.length / 150}em`, width: '98%', wordBreak: 'break-all'}}>{task.name}</div>
    </Paper>
  )
})

const TaskList = SortableContainer(({tasks, removeTask}) => {
  return (
    <div>
      {tasks.map((task, index) => (
        <TaskItem key={index} index={index} task={task} onIconClick={() => {removeTask(index)}} />
      ))}
    </div>
  )
})

class TimeTable extends React.Component {
  onSortEnd({oldIndex, newIndex}) {
    this.props.updateTasks(arrayMove(this.props.tasks, oldIndex, newIndex))
  }

  render() {
    const {
      start,
      end,
      tasks,
      removeTask,
    } = this.props

    return (
      <div>
        <div style={{float: 'left'}}>
          <Timeline start={start} end={end} />
        </div>
        <div style={{paddingTop: '.8em'}}>
          <TaskList
            tasks={tasks}
            removeTask={removeTask}
            onSortEnd={this.onSortEnd.bind(this)}
            pressDelay={200}
            lockToContainerEdges
          />
        </div>
      </div>
    )
  }
}

export default TimeTable
