import React, { Component } from "react"

import AppHeader from "../app-header"
import SearchPanel from "../search-panel"
import TodoList from "../todo-list"
import ItemStatusFilter from "../item-status-filter"
import AddItem from "../add-item"

import "./app.css"

export default class App extends Component {
    maxId = 100

    state = {
        todoData: [
            this.createTodoItem("Drink Coffee"),
            this.createTodoItem("Make Awesome App"),
            this.createTodoItem("Have a lunch"),
        ],
        term: "",
        value: "all",
    }

    createTodoItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++,
        }
    }

    deleteItem = (id) => {
        this.setState(({ todoData }) => {
            const idx = todoData.findIndex((el) => el.id === id)
            const newArray = [
                ...todoData.slice(0, idx),
                ...todoData.slice(idx + 1),
            ]
            return {
                todoData: newArray,
            }
        })
    }

    addItem = (text) => {
        this.setState(({ todoData }) => {
            const newItem = this.createTodoItem(text)

            const newArray = [...todoData, newItem]

            return {
                todoData: newArray,
            }
        })
    }

    toggleProperty(arr, id, propName) {
        const idx = arr.findIndex((el) => el.id === id)

        const oldItem = arr[idx]

        const newItem = { ...oldItem, [propName]: !oldItem[propName] }

        return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)]
    }

    onToggleDone = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, "done"),
            }
        })
    }

    onToggleImportant = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, "important"),
            }
        })
    }
    onSearchChange = (term) => {
        this.setState({ term })
    }

    onSearchValueChange = (value) => {
        this.setState({ value })
    }

    search = (items, term, value) => {
        if (term.length === 0 && value === "all") {
            return items
        }
        if (value === "active") {
            return items.filter((el) => {
                return (el.done === false && el.label.toUpperCase().indexOf(term.toUpperCase()) > -1)
            })
        }
        if (value === "done") {
            return items.filter((el) => {
                return (el.done === true && el.label.toUpperCase().indexOf(term.toUpperCase()) > -1)
            })
        }

        return items.filter((el) => {
            return el.label.toUpperCase().indexOf(term.toUpperCase()) > -1
        })
    }

    render() {
        const { todoData, term, value } = this.state

        const visibleItems = this.search(todoData, term, value)

        const doneCount = todoData.filter((el) => el.done).length

        const todoCount = todoData.length - doneCount
        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount} />
                <div className="top-panel d-flex">
                    <SearchPanel onSearchChange={this.onSearchChange} />
                    <ItemStatusFilter
                        onSearchValueChange={this.onSearchValueChange}
                    />
                </div>

                <TodoList
                    todos={visibleItems}
                    onDeleted={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone}
                />
                <AddItem addClick={this.addItem} />
            </div>
        )
    }
}
