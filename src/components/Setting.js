import React from 'react'
import Paper from 'material-ui/Paper'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'

const Setting = (props) => {
  const {
    start,
    end,
    updateTimelineStart,
    updateTimelineEnd,
    fillTimeTable,
    removeExtraTasks,
    updateTasks,
  } = props
  const {min, max} = Span
  const startSelectSpan = Array.from({length: end - min}, (_, i) => min + i)
  const endSelectSpan = Array.from({length: max - start}, (_, i) => start + i + 1)

  return (
    <Paper
      style={{padding: 10, marginRight: 50, marginTop: 20}}
    >
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

      <div style={{marginBottom: 12}}>
        <RaisedButton
          primary
          label='FILL TIMETABLE'
          onClick={() => {if(window.confirm('Are you sure?')){fillTimeTable()}}}
        />
      </div>

      <div style={{marginBottom: 12}}>
        <RaisedButton
          secondary
          label='DELETE EXTRA'
          onClick={() => {if(window.confirm('Are you sure?')){removeExtraTasks()}}}
        />
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
