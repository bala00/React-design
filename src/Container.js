import React, { Component } from 'react';
import { Row, Col, Tabs } from 'antd';
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

const kjList = [{
    id: 1,
    name: '单行输入框',
    icon: 'icon-dingdingdanhangshurukuang',
}, {
    id: 2,
    name: '多行输入框',
    icon: 'icon-kongjian-duohangshurukuang',
}, {
    id: 3,
    name: '数字输入框',
    icon: 'icon-kongjian-shuzishurukuang',
}, {
    id: 4,
    name: '单选框',
    icon: 'icon-bk-radio',
}, {
    id: 5,
    name: '多选框',
    icon: 'icon-duoxuankuang',
}, {
    id: 6,
    name: '日期',
    icon: 'icon-riqi',
}, {
    id: 7,
    name: '图片',
    icon: 'icon-tupian-copy',
}, {
    id: 9,
    name: '说明文字',
    icon: 'icon-shuomingwenzi',
}];

class Container extends Component {
    render() {
        return (
            <div className="app-design-container">
                <h3 className="app-title">模板</h3>
                <Row>
                    <Col span={8}>
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="控件库" key="1">
                                {
                                    kjList.map((item, index) => {
                                        return <Source name={item.name} key={item.id} id={item.id} index={index} icon={item.icon} />
                                    })
                                }
                            </TabPane>
                            <TabPane tab="套件库" key="2">Content of Tab Pane 2</TabPane>
                        </Tabs>
                    </Col>
                    <Col span={8}>
                        <div className="app-target-wrapper">
                            <img className="app-iphone" src={iphone} alt="iphone-bg" />
                            <Target index={1} />
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