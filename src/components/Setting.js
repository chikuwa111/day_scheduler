import React from 'react'
import {
  Paper,
  SelectField,
  MenuItem,
  RaisedButton,
} from 'material-ui'

const Setting = (props) => {
  const {
    start,
    end,
    updateTimelineStart,
    updateTimelineEnd,
    updateTasks,
    fillTimeTable,
  } = props
  const {min, max} = Span
  const startSelectSpan = Array.from({length: end - min}, (_, i) => min + i)
  const endSelectSpan = Array.from({length: max - start}, (_, i) => start + i + 1)

  return (
    <Paper
      style={{padding: 10, marginRight: 50, marginTop: 20}}
    >
      <div>Setting</div>
      <div>
        <SelectField
          autoWidth
          style={{width: '50%'}}
          value={start}
          onChange={(_e, _i, v) => {updateTimelineStart(v)}}
          floatingLabelText='start'
        >
          {startSelectSpan.map((v) => (
            <MenuItem key={v} value={v} primaryText={`${v}:00`}/>
          ))}
        </SelectField>
        <SelectField
          autoWidth
          style={{width: '50%'}}
          value={end}
          onChange={(_e, _i, v) => {updateTimelineEnd(v)}}
          floatingLabelText='end'
        >
          {endSelectSpan.map((v) => (
            <MenuItem key={v} value={v} primaryText={`${v}:00`}/>
          ))}
        </SelectField>
      </div>

      <div>
        <RaisedButton
          secondary
          label='DELETE ALL'
          onClick={() => {if(window.confirm('Are you sure?')){updateTasks([])}}}
        />
      </div>
    </Paper>
  )
}

const Span = {
  min: 0,
  max: 28,
}

export default Setting
