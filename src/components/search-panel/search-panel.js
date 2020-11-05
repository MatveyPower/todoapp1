import React, { Component } from "react"

import "./search-panel.css"

export default class SearchPanel extends Component {
    state = {
        newTodoData: [],
        todoData: this.props.todos,
    }

    onSearch = (e) => {
        const newArray = this.state.todoData.filter((el) => {
            if (el.label.includes(e.target.value)) {
                return el
            }
        })
        this.setState({
            newTodoData: newArray,
        }, () => {this.props.searchPanel(this.state.newTodoData)})
        
    }

    render() {
        console.log(this.state)
        return (
            <input
                type="text"
                className="form-control search-input"
                placeholder="type to search"
                onChange={this.onSearch}
            />
        )
    }
}
