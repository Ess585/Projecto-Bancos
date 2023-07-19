import React from 'react'
import Card from './Card'
import Wdata from './Wdata'
import './Work.css'
import { Link } from 'react-router-dom/dist'

const Works = () => {
    return (
    <>
        <section className='popular works'>
            <div className='container'>
                <div className='heading'>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6P37XQzG55cVQyc-Ch6FWEOM1msOkJUJClQ&usqp=CAU" alt="" style={{ width: '70em' }}/>
                    <hr/> <hr/> <hr/> <hr/> <hr/> <hr/> <hr/> <hr/>
                    <div className='line'>
                        <Link to='/USER'>
                            <button className='btn btn-success'>Crear cliente</button>
                        </Link>
                    </div>
                </div>
                <div className='content grid'>
                    {Wdata.map((value,index) =>{
                        return <Card key={index} cover ={value.cover} title={value.title} desc={value.desc}/>
                    })}
                    
                </div>
            </div>
        </section>
    </>
    )
}

export default Works    