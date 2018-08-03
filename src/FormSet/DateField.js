import React, { Component } from 'react'
import InputModal from '../Setting/InputModal'
import DateModal from '../Setting/DateModal'
import RequiredModal from '../Setting/RequiredModal'

/*
* feature: 日期组件
* author: hmw
* time: 18.07.12
*/

class DateField extends Component {
    render() {
        return (
            <div className="app-set-items">
                <InputModal num="20" title="标题" value={this.props.name} handleChange={this.props.titleChange} />
                <InputModal num="50"  title="提示文字" value={this.props.placeholderText} handleChange={this.props.placeholderChange} />
                <DateModal />
                <RequiredModal />
            </div>
        )
    }
}

export default DateField;
