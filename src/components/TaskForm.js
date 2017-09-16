import _ from 'lodash'
import React from 'react'
import {
  TextField,
  SelectField,
  MenuItem,
  RaisedButton
} from 'material-ui'

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

  onChangeLength(_event, _index, value) {
    this.setState({length: value})
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
        <form onSubmit={this.onSubmit.bind(this)}>
          <TextField
            floatingLabelText='Name'
            value={name}
            onChange={this.onChangeName.bind(this)}
          />

          <SelectField
            floatingLabelText='Length'
            value={length}
            onChange={this.onChangeLength.bind(this)}
          >
            <MenuItem value={30} primaryText='30min' />
            <MenuItem value={60} primaryText='60min' />
            <MenuItem value={90} primaryText='90min' />
            <MenuItem value={120} primaryText='120min' />
          </SelectField>

          <div>
            <RaisedButton
              label='Add Task'
              primary
              type='submit'
            />
          </div>
        </form>
      </div>
    )
  }
}

export default TaskForm
