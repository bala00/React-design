import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';
import ItemTypes from './ItemTypes';
import Source from './Source'
import TargetSource from './TargetSource'

/*
* feature: 可接受拖拽的容器组件
* author: hmw
* time: 18.07.12
*/

const cardTarget = {
    hover(props, monitor){
        console.log('props-->',props.index); 
        //props：打印出来是targetList，props.index为undefined
        //需求：在这个地方需要获取鼠标所在位置：即拖拽组件要从【下标：需要获取的值】位置处插入目标数组中。 如： targetList.splice(index, 0, xxx)，这个index就是我需要的值，也是我现在遇到的问题，这个值我一直获取不到。
        
    },
    drop(props, monitor) {
        const item = monitor.getItem()
        const dragIndex = item.index;
        const hoverIndex = props.index;  //打印出来是undefined
        // console.log('props.index',hoverIndex);

        props.insert(item)
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
    constructor () {
    super();
    this.state = {
      clickClass : 0
    }
  }
  
  handleClick = (event)=>{
    this.setState({clickClass: parseInt(event.target.getAttribute('index'), 10)})
  }

    render() {
        const { canDrop, isOver, connectDropTarget } = this.props;
        // const isActive = canDrop && isOver;
        let list = this.props.targetList;
        let elementBodyClass = '';
        if (list.length === 0) {
            elementBodyClass = 'empty'
        }

        // let items = this.props.targetList.map((item, index) => {
        //     return this.getElement(item, index)
        // })
        let baseClass = 'app-element-wrap';

        let items = this.props.targetList.map((item, index) => {
            return <TargetSource baseClass={baseClass} element={item.element} name={item.name} index={index} id={item.id} field={item.field} type={item.type} onClick={this.handleClick} clickClass={this.state.clickClass} deleteCard={this.props.deleteCard} moveCard={this.props.moveCard} />
        })

        return connectDropTarget(
            <div className="app-target">
                <div className={`app-element-body ${elementBodyClass}`}>
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