import { useState } from 'react'
import Counter from './Counter'
import Unicafe from './Unicafe' 
import TodoList from './TodoList'
import Anecdotes from './Anecdotes'
const App = () => {
 return(
    <>
        <Counter></Counter>
        <Unicafe></Unicafe>
        <TodoList></TodoList>
        <Anecdotes></Anecdotes>
    </>
 )
}
export default App