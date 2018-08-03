import React, { Component } from 'react'
import { Input } from 'antd';

/*
* feature: 单行输入框模板
* author: hmw
* time: 18.07.12
*/

class InputModal extends Component {
    render() {
        return (
            <div className="app-field app-setting-title">
                <div className="app-fieldname">
                    {this.props.title}<span className="app-fieldinfo">最多{this.props.num}字</span>
                </div>
                <div className="app-fieldblock">
                    <Input value={this.props.value} onChange={this.props.handleChange} />
                    {this.props.tips ? <div className="app-fieldtips">{this.props.tips}</div> : ''}
                </div>
            </div>
        )
    }
}

export default InputModal