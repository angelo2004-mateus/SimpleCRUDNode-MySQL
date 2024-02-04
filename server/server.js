import express from "express"
import mysql from "mysql"
import cors from "cors"


const app = express()
app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crud'
})

app.get('/', (req, res) => {
    const sql = "SELECT * FROM students"

    db.query(sql, (err, result) => {
        if(err) return res.json({msg: "Error inside server"})
        return res.json(result)
    })
})

app.post('/student', (req, res) => {
    const sql = "INSERT INTO students (`name`, `email`) VALUES (?)"
    const values = [
        req.body.name,
        req.body.email
    ]

    db.query(sql, [values], (err, result) => {
        if(err) return res.json(err)
        else res.json(result)
    })
})

app.get('/read/:id', (req, res) => {
    const sql = "SELECT * FROM students WHERE id = ?"
    const id = req.params.id

    db.query(sql, [id], (err, result) => {
        if(err) return res.json({msg: "Error inside server"})
        return res.json(result)
    })
})

app.put('/update/:id', (req, res) => {
    const sql = 'UPDATE students SET `name`=?, `email`=? WHERE ID = ?'
    const id = req.params.id
    db.query(sql, [req.body.name, req.body.email, id], (err, result) => {
        if(err) return res.json({msg: "Error inside server"})
        return res.json(result)
    })
})

app.delete('/delete/:id', (req, res) => {
    const sql = "DELETE FROM students WHERE id = ?"
    const id = req.params.id
    db.query(sql, [id], (err, result) => {
        if(err) return res.json({msg: "Error inside server"})
        return res.json(result)
    })
})

const port = 8081
app.listen(port, console.log('Server Running'))