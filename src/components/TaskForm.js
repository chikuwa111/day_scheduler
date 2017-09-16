import _ from 'lodash'
import React from 'react'

class TaskForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.initialState
  }

  get initialState() {
    return {
      name: '',
      length: 30,
    }
  }

  onChangeName(e) {
    this.setState({name: e.target.value})
  }

  onChangeLength(e) {
    this.setState({length: e.target.value})
  }

  onSubmit(e) {
    e.preventDefault()

    let tasks = this.props.tasks.slice(0)
    const {name, length} = this.state

    for(let i = 0; i < length / 30; i++) {
      const index = _.findIndex(tasks, 'initial')
      _.pullAt(tasks, [index])
    }
    tasks.unshift({name, length})

    this.props.updateTasks(tasks)
  }

  render() {
    const {name, length} = this.state

    return (
      <div>
        This is TaskForm!!
        <form onSubmit={this.onSubmit.bind(this)}>
          <div>Name</div>
          <input value={name} onChange={this.onChangeName.bind(this)}/>

          <div>Length(min)</div>
          <div>
            <select value={length} onChange={this.onChangeLength.bind(this)}>
              <option>30</option>
              <option>60</option>
              <option>90</option>
              <option>120</option>
            </select>
          </div>

          <button type='submit'>Add Task!</button>
        </form>
      </div>
    )
  }
}

export default TaskForm
