import React, { Component } from 'react';

export default class AddUser extends Component {
	constructor(props) {
        super(props);
        this.state = {
            id: '',
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            active: true             
        }

        this.inputs = [
            {placeholder: 'id', id: 'id'},
            {placeholder: 'First Name', id: 'firstName'},
            {placeholder: 'Last Name', id: 'lastName'},
            {placeholder: 'Email', id: 'email'},
            {placeholder: 'Phone', id: 'phone'}
        ]

        this.onValueChange = this.onValueChange.bind(this);
    }

    async onValueChange(event) {
        await this.stateEdit(event);
        this.submitActive();
    }

    stateEdit(event) {
        let enter = event.target.value;
        if (enter) {
            this.setState({
                [event.target.id]: event.target.value,
            });
        } else {
            this.setState({
                [event.target.id]: '',
            });
        }
    }

    submitActive() {
        const {id, firstName, lastName, email, phone} = this.state;
        if (id && firstName && lastName && phone && email) {
            this.setState({
                active: false
            })
        } else {
            this.setState({
                active: true
            })
        }
    }
    
    onSubmit(event){
        event.preventDefault();
        let user = {
            id: +this.state.id,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            phone: this.state.phone,
            address: {
                streetAddress: 'unknown',
                city: 'unknown',
                state: 'unknown',
                zip: 'unknown'
            },
            description: 'unknown',
        }
        this.props.addUser(user)
        this.setState({
            id: '',
            firstName: '',
            lastName: '',
            email: '',
            phone: '',  
            active: true
        })
    }

	render() {

        if (this.props.add) {
            const inputs = this.inputs.map(({placeholder, id}) => {
                return (
                    <input 
                        key={'key:'+id}
                        type="text"
                        className="form-control mb-2 mr-sm-2"
                        onChange={this.onValueChange}
                        placeholder={placeholder}
                        id={id}
                        value={this.state[id]}
                    />
                )
            })
            
            return (
                <form 
                    className="form-inline"
                    onSubmit={this.onSubmit.bind(this)}
                >
                   {inputs}
                    <button
                        className="addUser btn mb-2"
                        type="submit"
                        disabled={this.state.active}
                        >
                    Add
                    </button>
                
                </form>
            );
        } else {
            return ''
        }
	}
}