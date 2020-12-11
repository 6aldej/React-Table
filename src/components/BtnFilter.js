import React, { Component } from 'react';

export default class BtnFilter extends Component {
    constructor(props) {
        super(props);
        this.buttons = [
            {name: 'min', label: 'Small Data'},
            {name: 'big', label: 'Big Data'},
        ]
    }
    render() {
        const buttons = this.buttons.map(({name, label}) => {
            const {filter, switchDataType} = this.props;
            const active = filter === name;
            const clazz = active ? 'activeBtn' : ''
            return (
                <button
                key={name+label}
                className={`btn ${clazz} col-sm-6`}
                onClick={() => switchDataType(name)}
              >
                {label}
              </button>
            )
        })

        return (
            <div className="btn-group col-sm-12" id="button">
                {buttons}
            </div>
        )
    }
}