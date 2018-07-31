import React, { Component } from 'react'
import { Input,Icon } from 'antd';

class OptionsModal extends Component {
    render() {
        return (
            <div className="app-field app-setting-options">
                <div className="app-fieldname">
                    选项<span className="app-fieldinfo">最多200项，每项最多50个字</span>
                </div>
                <div>
                    <div className="app-fieldblock">
                        <Input value="选项一" />
                        <a className="app-action app-action-del"><Icon type="minus" /></a>
                        <a className="app-action app-action-add"><Icon type="plus" /></a>
                    </div>
                    <div className="app-fieldblock">
                        <Input value="选项二" />
                        <a className="app-action app-action-del"><Icon type="minus" /></a>
                        <a className="app-action app-action-add"><Icon type="plus" /></a>
                    </div>
                </div>
                <div className="app-line">
                    <a>批量编辑</a>
                </div>
            </div>
        )
    }
}
export default OptionsModal