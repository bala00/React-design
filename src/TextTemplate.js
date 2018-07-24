import React, { Component } from 'react';
import { Icon } from 'antd'

function CommonTm(props) {
    return (
        <div>
            <label className="app-componentview-label">{props.name}</label>
            <span className="app-componentview-placeholder">{props.placeholderText}</span>
            <Icon type={props.iType} className={props.iClassName} />
        </div>
    )
}

class TextTemplate extends Component {
    handleClick() {
        // console.log('this-->',e);
        // this.className= "active"
    }

    render() {
        let flag = this.props.flag;
        return (
            <div className={`${this.props.baseClass} app-element-${this.props.element}`} onClick={this.handleClick}>
                <div className="app-remove"><Icon type="close" /></div>
                <div className='app-drag'></div>
                <div className="app-componentview">
                    <div className="app-componentview-border">
                        {
                            flag == 'note' ? <p className="note-text">请输入说明文字</p> : <CommonTm name={this.props.name} placeholderText={this.props.placeholderText} iType={this.props.iType} iClassName={this.props.iClassName} />

                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default TextTemplate