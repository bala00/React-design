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
}

const cardDropSpec = {
  hover(props, monitor, component) {
    const item = monitor.getItem()
    const dragIndex = item.index
    const hoverIndex = props.index
    // props.onHover(hoverIndex)

    console.log('test-->',hoverIndex);

    if (dragIndex === hoverIndex) {
      return
    } if (dragIndex === -1) {
      item.index = hoverIndex
      console.log('dragIndex==>', dragIndex);
      console.log('后面还没写！！');

      // props.insertCard(item.onCreate(item.data), hoverIndex)
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    //findDOMNode(component)  获取组件中真实的DOM
    //object.getBoundingClientRect()：获取某个元素相对于视窗的位置集合。集合中有top, right, bottom, left等属性。
    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset(); //拖拽组件当前offset

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top

    // console.log('clientOffset.y-->',clientOffset.y);
    // console.log('hoverBoundingRect.top-->',hoverBoundingRect.top);

    // console.log('hoverIndex---->', hoverIndex);
    // console.log('dragIndex---->', dragIndex);

    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return
    }

    // props.moveCard(dragIndex, hoverIndex)

    // item.index = hoverIndex
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
    connectDropTarget: connect.dropTarget()
  }
}

const contentTM = {
  input: {
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
    const { baseClass, onClick, deleteCard, clickClass, element, type, name, index, isDragging, connectDragSource, connectDropTarget } = this.props;
    const dragClass = isDragging ? 'dragging' : '';
    return connectDropTarget(
      connectDragSource(
        <div className={`${baseClass} app-element-${element} ${dragClass}${clickClass === index ? 'active' : ''}`} index={index} onClick={onClick}>
          <div className="app-remove" index={index} onClick={deleteCard}><Icon type="close" /></div>
          <div className='app-drag'></div>
          <div className="app-componentview">
            <div className="app-componentview-border">
              {
                type === 'note' ? <p className="note-text">请输入说明文字</p> : <CommonTm type={type} name={name} index={index} />
              }
            </div>
          </div>
            <div className="app-dragging-mark"></div>
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