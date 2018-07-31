import React, { Component } from 'react'
import { Radio } from 'antd';

const RadioGroup = Radio.Group;
class DateModal extends Component {
    render() {
        return (
            <div className="app-field app-setting-dateformat">
                <div className="app-fieldname">日期类型</div>
                <RadioGroup>
                    <Radio className="app-fieldblock" value={1}>年-月-日 时:分</Radio>
                    <Radio className="app-fieldblock" value={2}>年-月-日</Radio>
                </RadioGroup>
            </div>
        )
    }
}

export default DateModal