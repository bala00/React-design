import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';
import ItemTypes from './ItemTypes';
import TargetSource from './TargetSource'

/*
* feature: 可接受拖拽的容器组件
* author: hmw
* time: 18.07.12
*/
function mouseEvent(event) {
    let box = document.getElementById("elementBox").clientHeight  //获取当前拖拽目标框内容元素高度
    let targetBodyY = 155 + box;  //获取拖拽目标框内容元素底部距离视窗的垂直距离
    let e = event || window.event;
    let mouseY = e.clientY   //鼠标距离视窗的垂直距离

    return { targetBodyY: targetBodyY, mouseY: mouseY }
}

const cardTarget = {
    hover(props, monitor, component) {

        let clientY = mouseEvent();

        let _length = props.targetList.length;

        if (_length === 0) {
            props.getMarkFlag(_length, 1);
        } else {
            if (clientY.mouseY >= clientY.targetBodyY) {
                props.getMarkFlag(_length, 1);
            }
        }
    },
    drop(props, monitor) {
        const item = monitor.getItem()

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
        //isOver 和 canDrop 属性用于在用户将一个元素拖拽到购物车上方时，为购物车显示不同的文字和背景颜色。
    }
}

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

    handleClick = (event) => {
        this.setState({ clickClass: parseInt(event.target.getAttribute('index'), 10) })
    }

    render() {
        const { canDrop, isOver, getMarkFlag, markFlag,insert, deleteCard, moveCard, targetList, connectDropTarget } = this.props;
        // const isActive = canDrop && isOver;
        let list = this.props.targetList;
        let elementBodyClass = '';
        if (list.length === 0) {
            elementBodyClass = 'empty'
        }

        let markStyle = { display: 'block' }
        if (!isOver || !canDrop) {

            markStyle = {
                display: 'none'
            }
        }

        let baseClass = 'app-element-wrap';
        let items = targetList.map((item, index) => {
            return <TargetSource baseClass={baseClass}
                element={item.element}
                name={item.name}
                index={index}
                id={item.id}
                key={item.id}
                field={item.field}
                getMarkFlag={getMarkFlag}
                markFlag={markFlag}
                type={item.type}
                onClick={this.handleClick} insert={insert}  clickClass={this.state.clickClass} deleteCard={deleteCard} moveCard={moveCard} />
        })

        return connectDropTarget(
            <div className="app-target">
                <div className={`app-element-body ${elementBodyClass}`} id="elementBox">
                    <div className="app-dragging-mark" style={markFlag.index === 0 ? markStyle : null}></div>
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