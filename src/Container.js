import React, { Component } from 'react';
import { Row, Col, Tabs } from 'antd';
import uuid from 'uuid';
import Source from './Source'
import Target from './Target'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import * as FieldModal from './FormSet/FormElement'
import baseList from './lib/baseList'
import './assets/styles/design.css'
import iphone from './assets/images/iphone.png'

/*
* feature: 拖拽容器 
* tips: DragDropContext：包含了Target和多个Source
* author: hmw
* time: 18.07.12
*/

const TabPane = Tabs.TabPane;

class Container extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            markFlag: {  //模块线条显示标识
                index: null,
                show: 0   // 0：不显示，1：显示
            },
            cardIndex: 0,  //当前模块ID
            sourceList: baseList,   //可拖拽数组
            targetList: []   //接收拖拽目标数组
        }
    }

    //拖拽新增
    insert = (index, item) => {
        item.id = uuid.v4();
        let { targetList } = this.state;
        let newData = targetList;
        newData.splice(index, 0, item);        
        this.setState({
            targetList: newData,
            cardIndex: index
        })
    }

    //拖拽移动
    moveCard = (dragIndex) => {//排序过程中，先执行moveCard,再执行insert
        let { targetList } = this.state;
        let newData = targetList.slice();
        newData.splice(dragIndex, 1);
        this.setState({ targetList: newData })        
    }

    //拖拽删除
    deleteCard = (e) => {
        let { targetList } = this.state;
        let newData = targetList.slice();
        let index = parseInt(e.target.getAttribute('index'), 10);
        newData.splice(index, 1)
        this.setState({ targetList: newData })
    }

    //获取红线插入位置标识
    getMarkFlag = (index, show) => {
        this.setState({
            markFlag: {
                index: index,
                show: show
            }
        })
    }

    //获取当前数据对应targetList中的index
    getCardIndex = (index) => {
        this.setState({
            cardIndex: index
        })
    }

    //input中change事件保存数组公共方法
    changeDate = (el, value) => {
        let cardIndex = this.state.cardIndex;
        let { targetList } = this.state;
        let newData = targetList.slice();
        newData[cardIndex][el] = value

        this.setState({
            targetList: newData
        })
    }

    //标题change事件
    titleChange = (e) => {
        let v = e.target.value;
        this.changeDate('name', v);
    }

    //提示文字change事件
    placeholderChange = (e) => {
        let v = e.target.value;
        this.changeDate('placeholderText', v);
    }

    render() {
        let Field, _name, _placeholderText;
        let _index = this.state.cardIndex;

        if (_index === null) {
            Field = () => {
                return <div></div>
            }
        } else {
            let newList = this.state.targetList.slice();
            let _va = newList[_index];
            if (_va) {
                _name = _va.name;
                _placeholderText = _va.placeholderText;
                Field = FieldModal[_va.field]
            } else {
                Field = () => {
                    return <div></div>
                }
            }
        }
        return (
            <div className="app-design-container">
                <h3 className="app-title">模板</h3>
                <Row>
                    <Col span={8}>
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="控件库" key="1">
                                {
                                    this.state.sourceList.map((item, index) => {
                                        return <Source name={item.name} key={item.id} id={item.id} index={index} field={item.field} element={item.element} icon={item.icon} placeholderText={item.placeholderText} iType={item.iType} iClassName={item.iClassName} />
                                    })
                                }
                            </TabPane>
                            <TabPane tab="套件库" key="2">Content of Tab Pane 2</TabPane>
                        </Tabs>
                    </Col>
                    <Col span={8}>
                        <div className="app-target-wrapper">
                            <img className="app-iphone" src={iphone} alt="iphone-bg" />
                            <Target targetList={this.state.targetList} markFlag={this.state.markFlag}
                                getMarkFlag={this.getMarkFlag}
                                getCardIndex={this.getCardIndex}
                                insert={this.insert}
                                moveCard={this.moveCard}
                                deleteCard={this.deleteCard} />
                        </div>
                    </Col>
                    <Col span={8}>
                        <Tabs defaultActiveKey="1" className="app-tabs-data">
                            <TabPane tab="控件设置" key="1">
                                <Field name={_name} placeholderText={_placeholderText} titleChange={this.titleChange} placeholderChange={this.placeholderChange} />
                            </TabPane>
                        </Tabs>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default DragDropContext(HTML5Backend)(Container)