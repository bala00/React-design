import React, { Component } from 'react'
import { DragSource, DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';
import ItemTypes from './ItemTypes'
import { findDOMNode } from 'react-dom'
import { Icon } from 'antd'
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
  endDrag(props, monitor, component){
    let dropResult = monitor.getDropResult();
    let hoverIndex = dropResult.hoverIndex;
    let dragIndex = dropResult.dragIndex;
    
    console.log('drag end--->',dragIndex);
    console.log('hover end-->',hoverIndex);
    

    if(dragIndex && hoverIndex){
      props.moveCard(dragIndex, hoverIndex)
    }
  },
}

const cardDropSpec = {
  hover(props, monitor, component) {
    let item = monitor.getItem()
    let dragIndex = item.index
    let hoverIndex = props.index

    console.log('drag 000-->',dragIndex);
    console.log('hover 000-->',hoverIndex);
    
    // if (dragIndex === hoverIndex) {
		// 	return
		// }
  
    // // Determine rectangle on screen
		// const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()

		// // Get vertical middle
		// const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

		// // Determine mouse position
		// const clientOffset = monitor.getClientOffset()

		// // Get pixels to the top
		// const hoverClientY = clientOffset.y - hoverBoundingRect.top

		// // Dragging downwards
		// if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
		// 	return
		// }

		// // Dragging upwards
		// if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
		// 	return
    // }
    props.getMarkFlag(hoverIndex, 1)
    // props.getHoverIndex(hoverIndex)
    
    

  },
  drop(props, monitor, component) {
    let item = monitor.getItem()
    let dragIndex = item.index
    let hoverIndex = props.index

    console.log('drag 111--->',dragIndex);
    console.log('hover 111-->',hoverIndex);
    
    if(dragIndex === hoverIndex){
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
    console.log('hoverClientY-->',hoverClientY);
    console.log('hoverMiddleY--->',hoverMiddleY);
    

    // Dragging downwards
		// if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
		// 	return
		// }

		// // Dragging upwards
		// if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
		// 	return
		// }
    
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

const contentTM = {
  input: {
    placeholderText: '请输入',
    iType: "",
    iClassName: ""
  },
  numInput: {
    placeholderText: '请输入',
    iType: "",
    iClassName: ""
  },
  select: {
    placeholderText: '请选择',
    iType: "right",
    iClassName: "icon-enter"
  },
  image: {
    placeholderText: '',
    iType: "camera",
    iClassName: "icon-camera"
  }
}

function CommonTm(props) {
  let _content = contentTM[props.type];
  return (
    <div>
      <label className="app-componentview-label">{props.name}</label>
      <span className="app-componentview-placeholder">{_content.placeholderText}</span>
      <Icon type={_content.iType} className={_content.iClassName} />
    </div>
  )
}

class TargetSource extends Component {

  render() {
    const { baseClass, onClick, deleteCard, clickClass, element, type, field, name, index, isDragging, connectDragSource, connectDropTarget } = this.props;
    const dragClass = isDragging ? 'dragging' : '';

    return connectDropTarget(
      connectDragSource(
        <div className={`${baseClass} app-element-${element} ${dragClass} ${clickClass === index ? 'active' : ''}` } index={index} field={field} onClick={onClick}>
          <div className="app-remove" index={index} onClick={deleteCard}><Icon type="close" /></div>
          <div className='app-drag'></div>
          <div className="app-componentview">
            <div className="app-componentview-border">
              {
                type === 'note' ? <p className="note-text">请输入说明文字</p> : <CommonTm type={type} name={name} index={index} />
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
// DragSource(ItemTypes.CARD, cardSource, collect)(TargetSource);