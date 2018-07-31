import React, { Component } from 'react'
import InputModal from '../Setting/InputModal'
import RequiredModal from '../Setting/RequiredModal'


class TextareaField extends Component {
    render() {
        return (
            <div className="app-set-items">
                <InputModal num="20" title="标题" value="多行输入框" />
                <InputModal num="50" title="提示文字" value="请输入" tips="内容最多可填写8000个字" />
                <RequiredModal />
            </div>
        )
    }
}

export default TextareaField;
