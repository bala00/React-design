import React, { Component } from 'react'
import { DragSource, DropTarget } from 'react-dnd';
// import { findDOMNode } from 'react-dom'
// import ReactCSSTransitionGroup from 'react-transition-group';
import PropTypes from 'prop-types';
import ItemTypes from './ItemTypes'
import './assets/font/iconfont.css'


/*
* feature: 可被拖拽的组件
* author: hmw
* time: 18.07.12
*/

const cardSource = {
  beginDrag(props) {
    return {
      name: props.name,
      type: props.type,
      id: props.id,
      index: props.index,
      field: props.field,
      element: props.element
    }
  },
}

let collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

class Source extends Component {

  render() {
    const { name, icon, isDragging, connectDragSource } = this.props;
    const opacity = isDragging ? 0.4 : 1;
    const style = {
      opacity: opacity
    };

    return (
      connectDragSource(
        <div className="app-source" style={style}>
          {name}
          <i className={'iconfont ' + icon}></i>
        </div>
      )
    )
  }
}

Source.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  id: PropTypes.any.isRequired
}

export default DragSource(ItemTypes.CARD, cardSource, collect)(Source);