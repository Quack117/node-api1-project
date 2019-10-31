// implement your API here
const express = require('express');

const server = express()

const db = require('./data/db.js')

const port = 4000

server.use(express.json())

server.listen(port, () => {
    console.log(`=== server is listening on port ${port} ===`)
})

server.get('/', (req, res) => {
    res.send('Hello World')
})

server.get('/users', (req, res) => {
    db.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json({
                message: err,
                success: false
            })
        })
})

server.get('/users/:id', (req, res) => {
    const { id } = req.params
    
    db.findById(id)
        .then(user => {
            if (user) {
                res.status(200).json(user)
            } else {
                res.status(404).json({
                    message: `Could not find user with id ${id}. Id may not exist`
                })
            }
            
        })
        .catch(err => {
            res.status(500).json({
              success: false,
              message: err  
            })
        })

    
})

server.post('/users', (req, res) => {
    const newUser = req.body

    db.insert(newUser)
        .then(user => {
            res.status(201).json({
                success: true,
                user
            })
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: err
            })

        })
})

server.put('/users/:id', (req, res) => {
    const newInfo = req.body
    const { id } = req.params

    db.update(id, newInfo)
        .then(user => {
            if (user) {
                res.status(200).json({
                    success: true,
                    newInfo
                })
            } else {
                res.status(404).json({
                    success: false,
                    message: `unble to find user with id of ${id}`
                })
            }
            
            
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                err
            })
        })
})

server.delete('/users/:id', (req, res) => {
    const { id } = req.body

    db.remove(id)
        .then(deletedUser => {

            if (deletedUser) {
                res.status(204).end()
            } else {
                res.status(404).json({
                    message: `id ${id} was not found. `
                })
            }
            
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                err
            })
        })
})

