import React, { Component } from 'react'
import InputModal from '../Setting/InputModal'
import RequiredModal from '../Setting/RequiredModal'

/*
* feature: 多行输入框组件
* author: hmw
* time: 18.07.12
*/

class TextareaField extends Component {
    render() {
        return (
            <div className="app-set-items">
                <InputModal num="20" title="标题" value={this.props.name} handleChange={this.props.titleChange} />
                <InputModal num="50" title="提示文字" value={this.props.placeholderText} tips="内容最多可填写8000个字" handleChange={this.props.placeholderChange} />
                <RequiredModal />
            </div>
        )
    }
}

export default TextareaField;
