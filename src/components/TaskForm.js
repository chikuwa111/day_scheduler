import React from 'react'
import {
  Paper,
  TextField,
  Slider,
  FloatingActionButton,
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

  onChangeLength(_event, value) {
    this.setState({length: value})
  }

  onSubmit(e) {
    e.preventDefault()

    const tasks = this.props.tasks.slice(0)
    const {name, length} = this.state
    tasks.unshift({name, length})

    this.props.updateTasks(tasks)
  }

  render() {
    const {name, length} = this.state

    return (
      <Paper
        style={{padding: 10, marginRight: 50}}
      >
        <form onSubmit={this.onSubmit.bind(this)}>
          <TextField
            floatingLabelText='Name'
            value={name}
            onChange={this.onChangeName.bind(this)}
          />

          <p>Length: {length}min</p>
          <div style={{display: 'flex', justifyContent: 'space-around'}}>
            {
              [30, 60, 90, 120].map((v) => (
                <FloatingActionButton
                  key={v}
                  mini
                  disabled={v === length}
                  children={<span style={{color: 'white', textWeight: 'bold'}}>{v}</span>}
                  onClick={() => {this.onChangeLength(null, v)}}
                />
              ))
            }
          </div>
          <Slider
            value={length}
            min={0}
            max={150}
            step={1}
            onChange={this.onChangeLength.bind(this)}
          />

          <div>
            <RaisedButton
              label='Add Task'
              primary
              type='submit'
            />
          </div>
        </form>
      </Paper>
    )
  }
}

export default TaskForm
