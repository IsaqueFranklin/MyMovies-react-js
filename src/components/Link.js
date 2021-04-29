import React, {useEffect, useState} from 'react'
import LinkForm from './LinkForm'
import {db} from '../firebase'
import {toast} from 'react-toastify'

function Link() {

    const [links, setLinks] = useState([])
    const [currentId, setCurrentId] = useState('')

    const addOrEditLink = async (linkObject) => {
        if(currentId === ''){
            await db.collection('links').doc().set(linkObject)
            toast('New movie added', {
                type: 'success'
            })
        }else{
            await db.collection('links').doc(currentId).update(linkObject);
            toast('Movie updated successfully.', {
                type: 'info'
            })
            setCurrentId('');
        }
    }

    const onDeleteLink = async (id) => {
        if (window.confirm('Are you sure?')){
            await db.collection('links').doc(id).delete();
            toast('Movie deleted.', {
                type: 'error',
                autoClose: 2000,
            })
        }
    }

    const getLinks = async () => {
        db.collection('links').onSnapshot((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach(doc => {
                docs.push({...doc.data(), id:doc.id})
            });
            setLinks(docs);
        })
    }

    useEffect(() => {
        getLinks();
    }, [])


    return (
        <div>
            <div className='col-md-4 p-2'>
                <LinkForm {...{addOrEditLink, currentId, links}} />
            </div>
            <div className='max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between'>
                {links.map(link => (
                  <div className='card mb-1' key={link.id}>
                      <div className='card-body'>
                        <div className='d-flex justify-content-between'>
                            <h4 className="text-3xl font-normal tracking-tight text-gray-900 sm:text-4xl">{link.movie}</h4>
                            <h4 className="text-3xl font-normal tracking-tight text-gray-900 sm:text-4xl">{link.plataform}</h4>
                            <br/>
                            <button className='bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded' onClick={() => onDeleteLink(link.id)}>Remove</button>
                            <button className='bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded' onClick={() => setCurrentId(link.id)}>Edit</button>
                        </div>
                        <br/>
                        <p className='text-2xl font-normal tracking-tight text-gray-900 sm:text-2xl'>{link.description}</p>
                      </div>
                  </div>  
                ))}    
            </div>    
            <hr/>       
        </div>
    )
}

export default Link
