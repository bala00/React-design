import React, { Component } from 'react'
import { Checkbox } from 'antd';

/*
* feature: 是否必填模板
* author: hmw
* time: 18.07.12
*/

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