import React, { Component } from 'react'
import MultiInputModal from '../Setting/MultiInputModal'

class TextNoteField extends Component {
    render() {
        return (
            <div className="app-set-items">
                <MultiInputModal num="5000" value="请输入说明文字" />
            </div>
        )
    }
}

export default TextNoteField;
