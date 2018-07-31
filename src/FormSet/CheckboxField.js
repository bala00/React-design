import React, { Component } from 'react'
import InputModal from '../Setting/InputModal'
import RequiredModal from '../Setting/RequiredModal'
import OptionsModal from '../Setting/OptionsModal'

class CheckboxField extends Component {
    render() {
        return (
            <div className="app-set-items">
                <InputModal num="20" title="标题" value="多选框" />
                <OptionsModal />
                <RequiredModal />
            </div>
        )
    }
}

export default CheckboxField;
