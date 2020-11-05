import React, { Component } from "react"

import "./add-item.css"

export default class AddItem extends Component {

    state = {
        label: ''
    }

    onLabelChange = (event) => {
        this.setState({
            label: event.target.value
        })
    }

    onSubmit =(e) => {
        e.preventDefault()
        this.props.addClick(this.state.label)
        this.setState({
            label:''
        })
    }

    render() {
        return (
            <form className="add-item d-flex"
            onSubmit = {this.onSubmit}>
                <input
                    type="text"
                    className="form-control"
                    onChange={this.onLabelChange}
                    placeholder="what needs to be done"
                    value = {this.state.label}
                />

                <button
                    type="button"
                    className="btn btn-outline-secondary"
                >
                    Добавить
                </button>
            </form>
        )
    }
}


