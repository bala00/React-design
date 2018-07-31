import React, { Component } from 'react'
import InputModal from '../Setting/InputModal'
import RequiredModal from '../Setting/RequiredModal'

class PhotoField extends Component {
    render() {
        return (
            <div className="app-set-items">
                <InputModal num="20" title="标题" value="日期" tips="图片最多可添加9张" />
                <RequiredModal />
            </div>
        )
    }
}

export default PhotoField;
