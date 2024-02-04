import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const Read = () => {

    const {id} = useParams()
    const [student, setStudent] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8081/read/' + id)
        .then(res => {
          console.log(res.data)
          setStudent(res.data[0])
        })
        .catch(err => console.log(err))
    }, [])

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
       <div className='p-2'>
        <h2>Student Details</h2>
        <p>{student.id}</p>
        <p>{student.name}</p>
        <p>{student.email}</p>
       </div>
       <Link to="/" className='btn btn-warning me-2'>Back</Link>
       <Link to={`/edit/${student.id}`} className='btn btn-info me-2'>Edit</Link>
      </div>
    </div>
  )
}

export default Read
