import React from 'react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'

const Setting = (props) => {
  const {
    start,
    end,
    updateTimelineStart,
    updateTimelineEnd,
    addTutorialTasks,
    fillTimeTable,
    removeExtraTasks,
    updateTasks,
  } = props
  const {min, max} = Span
  const startSelectSpan = Array.from({length: end - min}, (_, i) => min + i)
  const endSelectSpan = Array.from({length: max - start}, (_, i) => start + i + 1)

  return (
    <div style={{padding: 10}}>
      <div>
        <SelectField
          autoWidth
          style={{width: '50%'}}
          value={start}
          onChange={(_e, _i, v) => {updateTimelineStart(v)}}
          floatingLabelText='start hour'
        >
          {startSelectSpan.map((v) => (
            <MenuItem key={v} value={v} primaryText={`${v}`}/>
          ))}
        </SelectField>
        <SelectField
          autoWidth
          style={{width: '50%'}}
          value={end}
          onChange={(_e, _i, v) => {updateTimelineEnd(v)}}
          floatingLabelText='end hour'
        >
          {endSelectSpan.map((v) => (
            <MenuItem key={v} value={v} primaryText={`${v}`}/>
          ))}
        </SelectField>
      </div>

      <p style={{fontSize: '.5em'}}>*以下のアクションは全てタイムテーブルに変更を加えます*</p>

      <div style={{marginBottom: 12}}>
        <RaisedButton
          primary
          label='ADD TUTORIAL'
          onClick={() => {if(window.confirm('Are you sure?')){addTutorialTasks()}}}
        />
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
    </div>
  )
}

const Span = {
  min: 0,
  max: 28,
}

export default Setting
