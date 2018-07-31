import React, { Component } from 'react'
import { Input } from 'antd';

class InputModal extends Component {
    render() {
        return (
            <div className="app-field app-setting-title">
                <div className="app-fieldname">
                    {this.props.title}<span className="app-fieldinfo">最多{this.props.num}字</span>
                </div>
                <div className="app-fieldblock">
                    <Input value={this.props.value} />
                    { this.props.tips? <div className="app-fieldtips">{this.props.tips}</div> : '' }
                </div>
            </div>
        )
    }
}

export default InputModal