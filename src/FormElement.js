import React, { Component } from 'react';
import TextTemplate from './TextTemplate'

let baseClass = 'app-element-wrap';

class TextField extends Component {
    render() {
        return <TextTemplate baseClass={baseClass} element={this.props.element} name={this.props.name} placeholderText="请输入" iType="" iClassName="" />
    }
}

class TextareaField extends Component {
    render() {
        return <TextTemplate baseClass={baseClass} element={this.props.element} name={this.props.name} placeholderText="请输入" iType="" iClassName="" />
    }
}

class NumberField extends Component {
    render() {
        return <TextTemplate baseClass={baseClass} element={this.props.element} name={this.props.name} placeholderText="请输入" iType="" iClassName="" />
    }
}

class RadioField extends Component {
    render() {
        return <TextTemplate baseClass={baseClass} element={this.props.element} name={this.props.name} placeholderText="请选择" iType="right" iClassName="icon-enter" />
    }
}

class CheckboxField extends Component {
    render() {
        return <TextTemplate baseClass={baseClass} element={this.props.element} name={this.props.name} placeholderText="请选择" iType="right" iClassName="icon-enter" />
    }
}

class DateField extends Component {
    render() {
        return <TextTemplate baseClass={baseClass} element={this.props.element} name={this.props.name} placeholderText="请选择" iType="right" iClassName="icon-enter" />
    }
}

class PhotoField extends Component {
    render() {
        return <TextTemplate baseClass={baseClass} element={this.props.element} name={this.props.name} placeholderText="" iType="camera" iClassName="icon-camera" />
    }
}
class TextNoteField extends Component {
    render() {
        return <TextTemplate baseClass={baseClass} element={this.props.element} flag="note" />
    }
}

export default {
    TextField,
    TextareaField,
    NumberField,
    RadioField,
    CheckboxField,
    DateField,
    PhotoField,
    TextNoteField
}