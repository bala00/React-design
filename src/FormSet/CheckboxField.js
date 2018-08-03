import React, { Component } from 'react'
import InputModal from '../Setting/InputModal'
import RequiredModal from '../Setting/RequiredModal'
import OptionsModal from '../Setting/OptionsModal'

/*
* feature: 多选框组件
* author: hmw
* time: 18.07.12
*/

class CheckboxField extends Component {
    render() {
        return (
            <div className="app-set-items">
                <InputModal num="20" title="标题" value={this.props.name} handleChange={this.props.titleChange} />
                <InputModal num="50" title="提示文字" value={this.props.placeholderText} handleChange={this.props.placeholderChange} />
                <OptionsModal />
                <RequiredModal />
            </div>
        )
    }
}

export default CheckboxField;
