import React, { Component } from 'react'
import { DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';
import ItemTypes from './ItemTypes';
import TargetSource from './TargetSource'
import uuid from 'uuid';

/*
* feature: 拖拽目标容器组件
* author: hmw
* time: 18.07.12
* tips: 核心代码，请勿轻易修改
*/

// 鼠标位置
function mouseEvent(event) {
    let box = document.getElementById("elementBox").clientHeight  //获取当前拖拽目标框内容元素高度
    let targetBodyY = 155 + box;  //获取拖拽目标框内容元素底部距离视窗的垂直距离
    let e = event || window.event;
    let mouseY = e.clientY   //鼠标距离视窗的垂直距离
    return { targetBodyY: targetBodyY, mouseY: mouseY }
}

const cardTarget = {
    hover(props) {
        let clientY = mouseEvent();
        let _length = props.targetList.length;
        if (_length === 0) {
            props.getMarkFlag(0, 1);
        } else {
            if (clientY.mouseY >= clientY.targetBodyY) {
                props.getMarkFlag(_length, 1);
            }
        }
    },
    drop(props, monitor) {
        let item = monitor.getItem()
        let clientY = mouseEvent();
        let _length = props.targetList.length;
        props.getMarkFlag(_length, 0);
        if (_length === 0) {            
            props.insert(0, item)
        } else {
            if (clientY.mouseY >= clientY.targetBodyY) {
                props.insert(_length, item)
            }
        }
    }
};

let collect = (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget(), //connectDropTarget属性应该返回：这个组件中的哪一部分DOM是能接收可拖拽对象的目标区域。
        isOver: monitor.isOver(),   //isOver:可以使用任何名称
        canDrop: monitor.canDrop(),
        itemType: monitor.getItemType()
        //所有这些属性都会在render函数中用到
    }
}

// 空模板样式
function Empty() {
    return <div className="text">选择左侧控件拖动到此处</div>
}

class Target extends Component {
    constructor() {
        super();
        this.state = {
            clickClass: 0
        }
    }

    //onClick
    handleClick = (event) => {
        let _index = event.target.getAttribute('index');
        this.props.getCardIndex(_index);
        this.setState({ clickClass: parseInt(_index, 10) })
    }

    render() {
        const { canDrop, isOver, insert, getMarkFlag, markFlag, deleteCard, moveCard, targetList, connectDropTarget } = this.props;
        let list = this.props.targetList;
        let elementBodyClass = '';
        if (list.length === 0) {  //判断是否为空模板
            elementBodyClass = 'empty'
        }

        let markStyle = {   //红线标识：显示
            display: 'block',
            marginTop: '11px',
            marginBottom: '4px'
        }
        let defaultMarkStyle = {  //红线标识：默认隐藏
            display: 'none',
            marginTop: '3px',
            marginBottom: '3px'
        }
        if (!isOver || !canDrop) {
            markStyle = defaultMarkStyle
        }

        let baseClass = 'app-element-wrap';   //拖拽后组件基础class
        let items = []

        targetList.map((item, index) => {
            
            items.push(
                <TargetSource baseClass={baseClass}
                    element={item.element}
                    name={item.name}
                    index={index}
                    field={item.field}
                    id={item.id}
                    key={item.id}
                    placeholderText={item.placeholderText}
                    iType={item.iType}
                    iClassName={item.iClassName}
                    getMarkFlag={getMarkFlag}
                    onClick={this.handleClick} insert={insert} clickClass={this.state.clickClass} deleteCard={deleteCard} moveCard={moveCard} />
            )
            items.push(
                <div key={uuid.v4()} className="app-dragging-mark" style={(markFlag.index === index + 1 && markFlag.show === 1) ? markStyle : defaultMarkStyle}></div>
            )
        })

        return connectDropTarget(
            <div className="app-target">
                <div className={`app-element-body ${elementBodyClass}`} id="elementBox">
                    <div className="app-dragging-mark" style={(markFlag.index === 0 && markFlag.show === 1) ? markStyle : defaultMarkStyle}></div>
                    {elementBodyClass ? <Empty /> : items}
                </div>
            </div>
        )
    }
}

Target.propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired
}

export default DropTarget(ItemTypes.CARD, cardTarget, collect)(Target);