import React from 'react'

const TodoForm = props => {
    const {handleChange, handleSubmit, title} = props
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input type='text' 
                       name='title' 
                       value={title} 
                       onChange={handleChange} 
                       placeholder='Title'/>
                <button>Add Todo</button>
            </form>
        </div>
    )
}

export default TodoForm