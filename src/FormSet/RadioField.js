import React, { Component } from 'react'
import InputModal from '../Setting/InputModal'
import RequiredModal from '../Setting/RequiredModal'
import OptionsModal from '../Setting/OptionsModal'

class RadioField extends Component {
    render() {
        return (
            <div className="app-set-items">
                <InputModal num="20" title="标题" value="单选框" />
                <InputModal num="50" title="提示文字" value="请选择" />
                <OptionsModal />
                <RequiredModal />
            </div>
        )
    }
}

export default RadioField;
