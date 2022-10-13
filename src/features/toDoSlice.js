import { createSlice } from "@reduxjs/toolkit";
import { v4 } from "uuid";
import moment from "moment";


const initialState = []

const toDoSlice = createSlice({
    name:"todos",
    initialState,
    reducers: {
        add: (state,action) => {
            console.log("Action",action)
            const newTodo = {
                id: v4(), 
                title: action.payload.title,
                completed: false,
                createdAt: moment(Date.now()).format(),
                expiryDate:moment(action.payload.expiryDate).format()
                };
            state.push(newTodo)
        },
        remove: (state,action) => {
            return state.filter((todo) => todo.id !== action.payload)
        },
        toggleCompleted: (state,action) => {
            return state.map((todo) => (
                todo.id === action.payload)
                ? {...todo, completed: !todo.completed}
                : todo
                )
        },
        clearCompleted: (state) => {
            return state.filter(todo => !todo.completed )
        },
        markAllCompleted: (state) => {
            return state.map((todo) => ({...todo, completed:true}))
        },
        // startCountDown:(state,action)=>{
        //     // event date-today's date

        // },
        // updateCountdown:(state)=>{
        //      //update the timer every 1 or 2 minutes 
        // }

    }
})

export const { add , remove, toggleCompleted, clearCompleted, markAllCompleted } = toDoSlice.actions

export default toDoSlice.reducer
