import React from 'react'
import TextField from 'material-ui/TextField'
import Slider from 'material-ui/Slider'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import RaisedButton from 'material-ui/RaisedButton'
import {Colors, TimeLengths} from '../constants'

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
      <form onSubmit={this.onSubmit.bind(this)} style={{padding: 10}}>
        <TextField
          autoFocus
          hintText='Eat breakfast'
          value={name}
          onChange={this.onNameChange.bind(this)}
          style={{width: '100%'}}
        />

        <p>Length: {length}min</p>
        <div style={{display: 'flex', justifyContent: 'space-around'}}>
          {
            TimeLengths.map((v) => (
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
          step={5}
          onChange={this.onLengthChange.bind(this)}
          sliderStyle={{marginBottom: 24}}
        />

        <p>Color</p>
        <div style={{display: 'flex', justifyContent: 'space-around', marginBottom: 10}}>
          {
            Colors.map((v) => (
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
    )
  }
}

export default Form
