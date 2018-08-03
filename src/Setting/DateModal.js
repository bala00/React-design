import React, { Component } from 'react'
import { Radio } from 'antd';

/*
* feature: 日期模板
* author: hmw
* time: 18.07.12
*/

const RadioGroup = Radio.Group;
class DateModal extends Component {
    render() {
        return (
            <div className="app-field app-setting-dateformat">
                <div className="app-fieldname">日期类型</div>
                <RadioGroup defaultValue={1}>
                    <Radio className="app-fieldblock" value={1}>年-月-日 时:分</Radio>
                    <Radio className="app-fieldblock" value={2}>年-月-日</Radio>
                </RadioGroup>
            </div>
        )
    }
}

export default DateModal