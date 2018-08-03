import React, { Component } from 'react'
import InputModal from '../Setting/InputModal'
import RequiredModal from '../Setting/RequiredModal'

/*
* feature: 数字输入框组件
* author: hmw
* time: 18.07.12
*/

class NumberField extends Component {
    constructor (props) {
        super(props);
        this.state = {
            unit: ''
        }
    }
    // 单位
    handleChangeUnit = (e) => {
        this.setState({
            unit: e.target.value
        })
    }

    render() {
        return (
            <div className="app-set-items">
                <InputModal num="20" title="标题" value={this.props.name} handleChange={this.props.titleChange} />
                <InputModal num="50" title="提示文字" value={this.props.placeholderText} handleChange={this.props.placeholderChange} />
                <InputModal num="20" title="单位" value={this.state.unit} handleChange={this.handleChangeUnit} />
                <RequiredModal />
            </div>
        )
    }
}

export default NumberField;
