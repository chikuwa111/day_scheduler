import React from 'react'
import {
  Paper,
  TextField,
  Slider,
  FloatingActionButton,
  RaisedButton,
} from 'material-ui'

class Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.initialState
  }

  get initialState() {
    return {
      name: '',
      length: 30,
      color: '#fafafa',
    }
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
    ]
  }

  onNameChange(e) {
    this.setState({name: e.target.value})
  }

  onLengthChange(_event, value) {
    this.setState({length: value})
  }

  onColorChange(value) {
    this.setState({color: value})
  }

  onSubmit(e) {
    e.preventDefault()
    this.props.addTask(this.state)
  }

  render() {
    const {name, length, color} = this.state

    return (
      <Paper
        style={{padding: 10, marginRight: 50}}
      >
        <form onSubmit={this.onSubmit.bind(this)}>
          <TextField
            hintText='Eat breakfast'
            value={name}
            onChange={this.onNameChange.bind(this)}
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
                  onClick={() => {this.onLengthChange(null, v)}}
                />
              ))
            }
          </div>
          <Slider
            value={length}
            min={0}
            max={150}
            step={10}
            onChange={this.onLengthChange.bind(this)}
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
                  children={(v === color) && <span style={{color: 'black'}}>✔︎</span>}
                  onClick={() => {this.onColorChange(v)}}
                />
              ))
            }
          </div>

          <div style={{marginTop: 20}}>
            <RaisedButton
              label='ADD SCHEDULE'
              primary
              type='submit'
            />
          </div>
        </form>
      </Paper>
    )
  }
}

export default Form
