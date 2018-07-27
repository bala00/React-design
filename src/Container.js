import React, { Component } from 'react';
import { Row, Col, Tabs } from 'antd';
import uuid from 'uuid';
import Source from './Source'
import Target from './Target'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import './assets/styles/design.css'
import iphone from './assets/images/iphone.png'

/*
* feature: DragDropContext：包含了Target和多个Source
* author: hmw
* time: 18.07.12
*/

const TabPane = Tabs.TabPane;

const kjList = [{   //罗列可拖拽组件库
    id: 1,
    name: '单行输入框',
    icon: 'icon-dingdingdanhangshurukuang',
    field: 'TextField',
    element: 'input',
    type: 'input'
}, {
    id: 2,
    name: '多行输入框',
    icon: 'icon-kongjian-duohangshurukuang',
    field: 'TextareaField',
    element: 'textarea',
    type: 'input'
}, {
    id: 3,
    name: '数字输入框',
    icon: 'icon-kongjian-shuzishurukuang',
    field: 'NumberField',
    element: 'inputNumber',
    type: 'input'
}, {
    id: 4,
    name: '单选框',
    icon: 'icon-bk-radio',
    field: 'RadioField',
    element: 'radio',
    type: 'select'
}, {
    id: 5,
    name: '多选框',
    icon: 'icon-duoxuankuang',
    field: 'CheckboxField',
    element: 'checkbox',
    type: 'select'
}, {
    id: 6,
    name: '日期',
    icon: 'icon-riqi',
    field: 'DateField',
    element: 'date',
    type: 'select'
}, {
    id: 7,
    name: '图片',
    icon: 'icon-tupian-copy',
    field: 'PhotoField',
    element: 'image',
    type: 'image'
}, {
    id: 8,
    name: '说明文字',
    icon: 'icon-shuomingwenzi',
    field: 'TextNoteField',
    element: 'tips',
    type: 'note', //说明文字标识，内容采取独有的模板
}];

class Container extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            markFlag: {
                index: null,
                show: 0   // 0：不显示，1：显示
            },
            hoverIndex: null,
            sourceList: kjList,   //可拖拽数组
            targetList: []   ////接收拖拽目标数组
        }
    }

    getHoverIndex = (index) => {
        // console.log('index--->',index);
    }

    insert = (index,item) => {
        item.id = uuid.v4();
        let { targetList } = this.state;
        let newData = targetList;
        console.log('增加----');
        newData.splice(index, 0, item)
        this.setState({ targetList: newData })
        // this.saveData(index, 0, item);
    }

    moveCard = (dragIndex, hoverIndex) => {//排序过程中，先执行moveCard,再执行insert
        
        let { targetList } = this.state;
        let newData = targetList;
        console.log('删除-----');
        newData.splice(dragIndex, 1)
        this.setState({ targetList: newData })
        // console.log('dg--->',dragIndex);
        // console.log('targetList--->',this.state.targetList);

        // this.saveData(dragIndex, 1);
    }

    deleteCard = (e) => {
        let { targetList } = this.state;
        let newData = targetList;
        let index = parseInt(e.target.getAttribute('index'), 10);
        newData.splice(index, 1)
        this.setState({ targetList: newData })
        // this.saveData(index, 1)
    }

    // saveData = (index, num, data) => {
    //     let { targetList } = this.state;
    //     let newData = targetList;
    //     if (num === 0) {
    //         console.log('增加----');
            
    //         newData.splice(index, num, data)

    //     } else {
    //         console.log('删除-----');
            
    //         newData.splice(index, num)
    //     }
    //     this.setState({ targetList: newData })
    // }

    getMarkFlag = (index, show) => {

        // console.log('index--->',index);
        // console.log('show---->',show);
        
        
        
        this.setState({
            markFlag: {
                index: index,
                show: show
            }
        })
    }

    render() {
        return (
            <div className="app-design-container">
                <h3 className="app-title">模板</h3>
                <Row>
                    <Col span={8}>
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="控件库" key="1">
                                {
                                    this.state.sourceList.map((item, index) => {
                                        return <Source name={item.name} key={item.id} id={item.id} index={index} type={item.type} field={item.field} element={item.element} icon={item.icon} />
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
                            getHoverIndex={this.getHoverIndex}
                            getMarkFlag={this.getMarkFlag}
                            insert={this.insert} 
                            moveCard={this.moveCard} 
                            deleteCard={this.deleteCard} />
                        </div>
                    </Col>
                    <Col span={8}>
                        <Tabs defaultActiveKey="1" className="app-tabs-data">
                            <TabPane tab="控件设置" key="1">
                                data1
                        </TabPane>
                            <TabPane tab="表单设置" key="2">data2</TabPane>
                        </Tabs>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default DragDropContext(HTML5Backend)(Container)