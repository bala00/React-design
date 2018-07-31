import React, { Component } from 'react'
import InputModal from '../Setting/InputModal'
import RequiredModal from '../Setting/RequiredModal'

class NumberField extends Component {
    render() {
        return (
            <div className="app-set-items">
                <InputModal num="20" title="标题" value="数字输入框" />
                <InputModal num="50" title="提示文字" value="请输入" />
                <InputModal num="20" title="单位" value="" />
                <RequiredModal />
            </div>
        )
    }
}

export default NumberField;
