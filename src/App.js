import React, {Component} from 'react'
import axios from 'axios'
import Todo from './Todo'
import TodoForm from './TodoForm'

class App extends Component {
    constructor(){
        super()
        this.state = {
            todos: [],
            title: ''
        }
    }


handleSubmit = e => {
    e.preventDefault()
    const newTodo = {
        title: this.state.title
    }
    axios.post('https://api.vschool.io/tim/todo', newTodo).then(response => {
        //console.log(response)
        this.setState(prevState => {
            return {
            todos: [...prevState.todos, response.data],
            title: ''
            }
        })
    })
}

handleChange = e => {
    const {name, value} = e.target
    this.setState({
        [name]: value
    })
}

componentDidMount(){
    axios.get('https://api.vschool.io/tim/todo').then(response => {
        //console.log(response)
        this.setState({
            todos: response.data
        })
    })
}

handleDelete = (id) => {
    axios.delete(`https://api.vschool.io/tim/todo/${id}`).then(response => {
        //console.log(response)

        //The following allows the browser to update without having to hit refresh
        this.setState(prevState => {
            return {
                todos: prevState.todos.filter(todo => todo._id !== id)
            }
        })
    })
}

handleEdit = (id, updates) => {
    axios.put(`https://api.vschool.io/tim/todo/${id}`, updates).then(response => {
        this.setState(prevState => ({
            todos: prevState.todos.map(todo => todo._id === id ? response.data : todo)
        }))
    })
}

render(){
    return(
        <div>
            <TodoForm 
            handleChange={this.handleChange} 
            handleSubmit={this.handleSubmit}
            />
            
            {this.state.todos.map(todo => 
            <Todo todo={todo.title} 
                  key={todo._id} 
                  handleDelete={this.handleDelete} 
                  handleEdit={this.handleEdit}
                  id={todo._id}/>)}
        </div>
        )
    }
}

export default App