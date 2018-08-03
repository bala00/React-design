import React, { Component } from 'react'
import InputModal from '../Setting/InputModal'
import RequiredModal from '../Setting/RequiredModal'

/*
* feature: 图片组件
* author: hmw
* time: 18.07.12
*/

class PhotoField extends Component {
    render() {
        return (
            <div className="app-set-items">
                <InputModal num="20" title="标题" value={this.props.name} tips="图片最多可添加9张" handleChange={this.props.titleChange} />
                <RequiredModal />
            </div>
        )
    }
}

export default PhotoField;
