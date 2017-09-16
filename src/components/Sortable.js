import React from 'react'
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc'

const SortableItem = SortableElement(({value}) => (
  <li>{value}</li>
))

const SortableList = SortableContainer(({items}) => (
  <ul>
    {items.map((value, index) => (
      <SortableItem key={value} index={index} value={value} />
    ))}
  </ul>
))

class SortableComponent extends React.Component {
  state = {
    items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'],
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState({
      items: arrayMove(this.state.items, oldIndex, newIndex),
    })
  }

  render() {
    return (
      <SortableList items={this.state.items} onSortEnd={this.onSortEnd.bind(this)} />
    )
  }
}

export default SortableComponent
