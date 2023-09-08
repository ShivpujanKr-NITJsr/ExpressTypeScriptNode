import {Router } from 'express'

import {Todo} from '../models/todo'

const todos :Todo[] =[]

const router =Router()

router.get('/',(req,res,next)=>{
    res.status(200).json({todos: todos})
})


router.post('/todo',(req,res,next)=>{
    const newTodo: Todo={
        id:new Date().toISOString(),
        text: req.body.text
    }

    todos.push(newTodo);
})

router.put('/todo/:id',(req,res,next)=>{
    const tid=req.params.id
    const tod=todos.findIndex(todoItem=>todoItem.id===tid)
    if(tod>=0){
        todos[tod]={id:todos[tod].id,text:req.body.text}
        res.status(200).json({message:'updated todos',todos:todos})
    }
    res.status(404).json({message:'item not found '})
})

router.delete('/todo/:id',(req,res,next)=>{
    const tid=req.params.id;
    const tod=todos.findIndex(todoItem=>todoItem.id===tid)
    if(tod>=0){
        // const del=todos[tod]
        todos.splice(tod,1);
        
        res.json({message:"deleted successfully",todos:todos})
    }
    
    res.status(404).json({message:"item not found "})
})

export default router