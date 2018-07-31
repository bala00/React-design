import React, { Component } from 'react'
import InputModal from '../Setting/InputModal'
import DateModal from '../Setting/DateModal'
import RequiredModal from '../Setting/RequiredModal'

class DateField extends Component {
    render() {
        return (
            <div className="app-set-items">
                <InputModal num="20" title="标题" value="日期" />
                <DateModal />
                <RequiredModal />
            </div>
        )
    }
}

export default DateField;
