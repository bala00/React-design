import React, { Component } from 'react'
import { DragSource, DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';
import ItemTypes from './ItemTypes'
import { findDOMNode } from 'react-dom'
import { Icon } from 'antd'
import './assets/font/iconfont.css'

/*
* feature: 排序组件
* author: hmw
* time: 18.07.12
* tips: 核心代码，请勿轻易修改
*/

// 鼠标位置
function mouseEvent(event) {
  let e = event || window.event;
  let mouseY = e.clientY   //鼠标距离视窗的垂直距离
  return mouseY
}

const cardSource = {
  beginDrag(props) {
    return {
      name: props.name,
      index: props.index,
      field: props.field,
      element: props.element,
      placeholderText: props.placeholderText,
      iType: props.iType,
      iClassName: props.iClassName
    }
  },
  endDrag(props, monitor, component) {
    if(!monitor.didDrop()){ //拖出
      return
    }
    let dgIndex = monitor.getItem().index;
    let dropResult = monitor.getDropResult();
    let hoverIndex = dropResult.hoverIndex;
    let dragIndex = dropResult.dragIndex;

    if (dragIndex >= 0) {
      if (hoverIndex < dragIndex) {
        dragIndex = dragIndex + 1;
      }
      
      props.moveCard(dragIndex)
    } else if (dgIndex >= 0 ) {

      let mouseY = mouseEvent();
      let hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
      if(dgIndex === props.index && mouseY >= hoverBoundingRect.top && mouseY <= hoverBoundingRect.bottom+20){
        return 
      }
      props.moveCard(dgIndex)
    }
  },
}

const cardDropSpec = {
  hover(props) {
    let hoverIndex = props.index;
    props.getMarkFlag(hoverIndex, 1)
  },
  drop(props, monitor, component) {
    let item = monitor.getItem()
    let dragIndex = item.index
    let hoverIndex = props.index

    if (dragIndex === hoverIndex) {
      return
    }
    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

    // Determine mouse position
    const clientOffset = monitor.getClientOffset()

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top

    props.insert(hoverIndex, item)
    item.index = hoverIndex
    return {
      dragIndex: dragIndex,
      hoverIndex: hoverIndex,
      hoverClientY: hoverClientY,
      hoverMiddleY: hoverMiddleY
    }
  }
}

let collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

let collectDrop = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),   //isOver:可以使用任何名称
    canDrop: monitor.canDrop(),
  }
}

function CommonTm(props) {
  return (
    <div>
      <label className="app-componentview-label">{props.name}</label>
      <span className="app-componentview-placeholder">{props.placeholderText}</span>
      <Icon type={props.iType} className={props.iClassName} />
    </div>
  )
}

class TargetSource extends Component {
  render() {
    const { baseClass, onClick, deleteCard, clickClass, element, name, placeholderText, iType, iClassName, index, isDragging, connectDragSource, connectDropTarget } = this.props;
    const dragClass = isDragging ? 'dragging' : '';    

    return connectDropTarget(
      connectDragSource(
        <div className={`${baseClass} app-element-${element} ${dragClass} ${clickClass === index ? 'active' : ''}`} index={index} onClick={onClick}>
          <div className="app-remove" index={index} onClick={deleteCard}><Icon type="close" /></div>
          <div className='app-drag'></div>
          <div className="app-componentview">
            <div className="app-componentview-border">
              {
                element === 'tips' ? <p className="note-text">{placeholderText}</p> : <CommonTm name={name} index={index} placeholderText={placeholderText} iType={iType} iClassName={iClassName} />
              }
            </div>
          </div>
        </div>
      )
    )
  }
}

TargetSource.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  id: PropTypes.any.isRequired
}

const dragSource = DragSource(ItemTypes.CARD, cardSource, collect)(TargetSource);
const DragDropTarget = DropTarget(ItemTypes.CARD, cardDropSpec, collectDrop)(dragSource)

export default DragDropTarget