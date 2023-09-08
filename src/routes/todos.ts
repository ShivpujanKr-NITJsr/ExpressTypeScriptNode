import {Router } from 'express'

import {Todo} from '../models/todo'

const todos :Todo[] =[]

type requestBody={text:string}
type requestParams={id:string}

const router =Router()

router.get('/',(req,res,next)=>{
    res.status(200).json({todos: todos})
})


router.post('/todo',(req,res,next)=>{
    const body =req.body as requestBody

    const newTodo: Todo={
        id:new Date().toISOString(),
        text: body.text
    }

    todos.push(newTodo);
})

router.put('/todo/:id',(req,res,next)=>{
    const params=req.params as requestParams
    const tid=params.id

    const body= req.body as requestBody
    const tod=todos.findIndex(todoItem=>todoItem.id===tid)
    if(tod>=0){
        todos[tod]={id:todos[tod].id,text:body.text}
        res.status(200).json({message:'updated todos',todos:todos})
    }
    res.status(404).json({message:'item not found '})
})

router.delete('/todo/:id',(req,res,next)=>{
    const params= req.params as requestParams
    const tid=params.id;
    const tod=todos.findIndex(todoItem=>todoItem.id===tid)
    if(tod>=0){
        // const del=todos[tod]
        todos.splice(tod,1);
        
        res.json({message:"deleted successfully",todos:todos})
    }
    
    res.status(404).json({message:"item not found "})
})

export default router