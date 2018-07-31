import React, { Component } from 'react'
import { Checkbox } from 'antd';

class Required extends Component {
    render() {
        return (
            <div className="app-field app-setting-title">
                <div className="app-fieldname">验证</div>
                <Checkbox className="app-fieldblock">（必填）</Checkbox>
            </div>
        )
    }
}

export default Required