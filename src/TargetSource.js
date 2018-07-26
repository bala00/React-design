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
    const hoverIndex = props.index
    props.getMarkFlag(hoverIndex, 1);
    
  },
  drop(props, monitor) {
    const item = monitor.getItem()
    const dragIndex = item.index
    const hoverIndex = props.index

    props.insert(hoverIndex, item)

    console.log('hoverIndex--->',hoverIndex);
    console.log('dragIndex--->',dragIndex);


    
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
    const { baseClass, onClick, deleteCard, clickClass, element, type, name, markFlag, index, isDragging, connectDragSource, connectDropTarget } = this.props;
    const dragClass = isDragging ? 'dragging' : '';

    return connectDropTarget(
      connectDragSource(
        <div className={`${baseClass} app-element-${element} ${dragClass} ${clickClass === index ? 'active' : ''} ${index === markFlag.index-1&& markFlag.show === 1 ? 'mark': ''}` } index={index} onClick={onClick}>
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