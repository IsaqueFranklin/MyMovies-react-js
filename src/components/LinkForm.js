import React, {useEffect, useState} from 'react'
import { db } from '../firebase'

function LinkForm(props) {

    const initialStateValues = {
        movie: '',
        plataform: '',
        description: ''
    }

    const [values, setValues] = useState(initialStateValues);
    
    const handleInputChange = e => {
        const {name, value} = e.target;
        setValues({...values, [name]: value});
    }

    const handleSubmit = e => {
        e.preventDefault();
        props.addOrEditLink(values);
        setValues({...initialStateValues})
    }

    const getLinkById = async (id) => {
        const doc = await db.collection('links').doc(id).get();
        setValues({...doc.data()})
    }

    useEffect(() => {
        if (props.currentId == ''){
            setValues({...initialStateValues})
        }else{
            getLinkById(props.currentId);
        }
    }, [props.currentId])


    return (
    
         <form class='card card-body' onSubmit={handleSubmit}>
             <div class="bg-white-50">
            <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
                <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                <span class="block">Movies List</span>
                <span class="block text-gray-600">List all your movies.</span>
                </h2>
            </div>
            </div>

            <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
                <div class="">

                    <label class="block">
                    <input class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-2 pr-12 sm:text-sm border-gray-500 rounded-md" placeholder='Movie name' 
                    name='movie' 
                    onChange={handleInputChange}
                    value={values.movie} />
                    </label>
                </div>
            </div>

            <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
                <div class="">

                    <label class="block">
                    <input class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-2 pr-12 sm:text-sm border-gray-300 rounded-md" placeholder='Platform where you saw it' 
                    name='plataform'
                    onChange={handleInputChange}
                    value={values.plataform} />
                    </label>
                </div>
            </div>

            <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
                <div class="">
                    <label class="block">
                    <textarea name='description' class="resize border rounded-md" rows="" placeholder=' Write a description'
                    onChange={handleInputChange}
                    value={values.description}></textarea>
                    </label>
                </div>
            </div>

            <div class="max-w-7xl mx-auto py-2 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
                <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                    {props.currentId === '' ? 'Save': 'Update'}
                </button>
            </div>
        </form>
    )
}

export default LinkForm
