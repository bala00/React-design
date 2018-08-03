import React, { Component } from 'react'
import MultiInputModal from '../Setting/MultiInputModal'

/*
* feature: 说明文字组件
* author: hmw
* time: 18.07.12
*/

class TextNoteField extends Component {
    render() {
        return (
            <div className="app-set-items">
                <MultiInputModal num="5000" value={this.props.placeholderText}  handleChange={this.props.placeholderChange} />
            </div>
        )
    }
}

export default TextNoteField;
