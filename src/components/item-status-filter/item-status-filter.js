import React, { Component } from "react"

import "./item-status-filter.css"

export default class ItemStatusFilter extends Component {

    // state = {
    //     buttons: [
    //         {onActive: true},
    //         {onActive: false},
    //         {onActive: false},

    //     ]
    // }

    onPress = (e) => {
        // e.buttons.className = 'btn btn-outline-secondary'
        const div = e.target.closest('div')
        let array = [...div.children]
        array.forEach(el => el.className = 'btn btn-outline-secondary')
        e.target.className = "btn btn-info"
        this.props.onSearchValueChange(e.target.value)
    }

    render() {


        return (
            <div onClick = {this.onPress} className="btn-group">
                <button type="button" className="btn btn-info" value = {'all'}>
                    All
                </button>
                <button type="button" className="btn btn-outline-secondary" value = {'active'}>
                    Active
                </button>
                <button type="button" className="btn btn-outline-secondary" value = {'done'}>
                    Done
                </button>
            </div>
        )
    }
}
