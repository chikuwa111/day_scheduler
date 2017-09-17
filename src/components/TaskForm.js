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

  get Lengths() {
    return [30, 60, 90, 120]
  }

  get Colors() {
    return [
      '#fafafa', // white
      '#ffd180', // orange
      '#80d8ff', // blue
      '#ccff90', // green
      '#cfd8dc', // gray
    ]
  }

  get initialState() {
    return {
      name: '',
      length: 30,
      color: '#fafafa',
    }
  }

  onChangeName(e) {
    this.setState({name: e.target.value})
  }

  onChangeLength(_event, value) {
    this.setState({length: value})
  }

  onChangeColor(value) {
    this.setState({color: value})
  }

  onSubmit(e) {
    e.preventDefault()

    const tasks = this.props.tasks.slice(0)
    const {name, length, color} = this.state
    tasks.unshift({name, length, color})

    this.props.updateTasks(tasks)
  }

  render() {
    const {name, length, color} = this.state

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
              this.Lengths.map((v) => (
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
            sliderStyle={{marginBottom: 24}}
          />

          <p>Color</p>
          <div style={{display: 'flex', justifyContent: 'space-around', marginBottom: 10}}>
            {
              this.Colors.map((v) => (
                <FloatingActionButton
                  key={v}
                  mini
                  backgroundColor={v}
                  children={(v === color) && <span style={{color: 'black'}}>V</span>}
                  onClick={() => {this.onChangeColor(v)}}
                />
              ))
            }
          </div>

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
