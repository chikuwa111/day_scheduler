import React from 'react'
import {
  SortableContainer,
  SortableElement,
  arrayMove,
} from 'react-sortable-hoc'

const TaskItem = SortableElement(({value}) => (
  <li>{value}</li>
))

const TaskList = SortableContainer(({tasks}) => (
  <ul>
    {tasks.map((task, index) => (
      <TaskItem key={index} index={index} value={task.name + index} />
    ))}
  </ul>
))

class TimeTable extends React.Component {
  onSortEnd({oldIndex, newIndex}) {
    this.props.updateTasks(arrayMove(this.props.tasks, oldIndex, newIndex))
  }

  render() {
    return (
      <div>
        This is TimeTable!!
        <TaskList tasks={this.props.tasks} onSortEnd={this.onSortEnd.bind(this)} />
      </div>
    );
  }
}

export default TimeTable
