import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';

import ItemTypes from './ItemTypes'

/*
* feature: 可接受拖拽的容器组件
* author: hmw
* time: 18.07.12
*/

const cardTarget = {
    // drop(){
    //     return { name: 'Target' }
    // }
    hover(props, monitor, component){
    
        const item = monitor.getItem();
		const dragIndex = item.index;
        const hoverIndex = props.index;

        console.log('dragIndex-->',dragIndex);
        console.log('hoverIndex-->',hoverIndex);

        // 获取当前组件在窗口中的左，上，右和下分别相对浏览器视窗的位置
        const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

        // //拖拽组件当前offset  即当前鼠标位置
        const clientOffset = monitor.getClientOffset();
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    }
};

let collect = (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget(), //connectDropTarget属性应该返回：这个组件中的哪一部分DOM是能接收可拖拽对象的目标区域。
        isOver: monitor.isOver(),   //isOver:可以使用任何名称
        canDrop: monitor.canDrop()
        //所有这些属性都会在render函数中用到
        //isOver 和 canDrop 属性用于在用户将一个元素拖拽到购物车上方时，为购物车显示不同的文字和背景颜色。
    }
}

class Target extends Component {  
    render () {
        const { canDrop, isOver, connectDropTarget } = this.props; 
        const isActive = canDrop && isOver;

        // let backgroundColor = '#ffffff';
        // if(isActive){
        //     backgroundColor = '#f7f7bd'
        // }else if(canDrop){
        //     backgroundColor = '#f7f7f7'
        // }
        // const style = {
            // backgroundColor: backgroundColor
        // };

        return connectDropTarget(
            // style={style}
            <div className="app-target">
                {isActive ?
                    'Hummmm, source!' : 
                    'Drag here to order!'
                }
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