import React, { Component } from 'react'
import { Input } from 'antd';

/*
* feature: 多行输入框模板
* author: hmw
* time: 18.07.12
*/

const { TextArea } = Input;

class MultiInputModal extends Component {
    render() {
        return (
            <div className="app-field app-setting-title">
                <div className="app-fieldname">
                    说明文字<span className="app-fieldinfo">最多{this.props.num}字</span>
                </div>
                <div className="app-fieldblock">
                    <TextArea rows={4} value={this.props.value} onChange={this.props.handleChange} />
                </div>
            </div>
        )
    }
}

export default MultiInputModal