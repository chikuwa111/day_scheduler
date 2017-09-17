import React from 'react'

const Timeline = ({start, end}) => {
  const timelineArray = Array.from({length: end - start + 1}, (_, i) => start + i)
  return (
    <div>
      {timelineArray.map((time, i) => (
        <div key={time}>
          <div style={style}>{`${time}:00`}</div>
          {i !== timelineArray.length - 1 && <div style={style}>-</div>}
        </div>
      ))}
    </div>
  )
}

const style = {
  height: '.5em',
  marginBottom: '1.5em',
  textAlign: 'right',
}

export default Timeline
