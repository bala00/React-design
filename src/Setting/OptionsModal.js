import React, { Component } from 'react'
import { Input, Icon } from 'antd';

/*
* feature: 选择框选项模板
* author: hmw
* time: 18.07.12
*/

class OptionsModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: [{  //默认显示三个选项
                id: 1,
                name: '选项1'
            }, {
                id: 2,
                name: '选项2'
            }, {
                id: 3,
                name: '选项3'
            }]
        }
    }

    //change事件
    handleChange = (index, e) => {
        let data = this.state.options.slice();
        data[index].name = e.target.value;
        this.setState({
            options: data
        })
    }

    //删除
    handleDel = (index, e) => {
        let data = this.state.options.slice();
        data.splice(index, 1)
        this.setState({
            options: data
        })
    }

    // 新增
    handleAdd = (index, e) => {
        let data = this.state.options.slice();
        let arr = [];
        let _id;
        let _ele = {};

        data.map((item) => {
            arr.push(item.id)
        })
        for (let i = 1; i <= data.length + 1; i++) {
            if (arr.indexOf(i) < 0) {
                _id = i;
            }
        }
        _ele.id = _id;
        _ele.name = "选项" + _id;
        data.splice(index + 1, 0, _ele)
        this.setState({
            options: data
        })
    }

    render() {
        let options = this.state.options.map((item, index) => {
            return (
                <div className="app-fieldblock" key={index}>
                    <Input value={item.name} onChange={this.handleChange.bind(this, index)} />
                    <a className="app-action app-action-del" onClick={this.handleDel.bind(this, index)} ><Icon type="minus" /></a>
                    <a className="app-action app-action-add" onClick={this.handleAdd.bind(this, index)}><Icon type="plus" /></a>
                </div>
            )
        })

        return (
            <div className="app-field app-setting-options">
                <div className="app-fieldname">
                    选项<span className="app-fieldinfo">最多200项，每项最多50个字</span>
                </div>
                <div>{options}</div>
                <div className="app-line">
                    <a>批量编辑</a>
                </div>
            </div>
        )
    }
}
export default OptionsModal