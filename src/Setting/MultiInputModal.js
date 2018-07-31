import React, { Component } from 'react'
import { Input } from 'antd';

const { TextArea } = Input;

class MultiInputModal extends Component {
    render() {
        return (
            <div className="app-field app-setting-title">
                <div className="app-fieldname">
                    说明文字<span className="app-fieldinfo">最多{this.props.num}字</span>
                </div>
                <div className="app-fieldblock">
                    <TextArea rows={4} value={this.props.value} />
                </div>
            </div>
        )
    }
}

export default MultiInputModal