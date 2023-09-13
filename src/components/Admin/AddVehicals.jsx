import React, { useState } from 'react';
import { useParams } from 'react-router-dom'
import { IoMdAddCircleOutline } from 'react-icons/io'
import { AiOutlineDelete } from 'react-icons/ai';
import { server } from '../../server.js'
import { toast } from 'react-toastify';

import axios from 'axios';

const AddVehicals = () => {
    const [vehicalCategory, setVehicalCategory] = useState("")
    const [vehicals, setVehicals] = useState([
        {
            vehicalName: "",
            vehicalPrice: "",
            image: null
        }
    ]);
    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const newVehical = [...vehicals];
        newVehical[index][name] = value;
        setVehicals(newVehical);
    };

    const handelImageChanges = (index, event) => {
        const file = event.target.files[0];
        const newVehical = [...vehicals];
        newVehical[index].image = file;
        setVehicals(newVehical);
    }
    const handleAddMoreVehical = () => {
        setVehicals([...vehicals, {
            vehicalCategory: "",
            vehicalName: "",
            vehicalPrice: "",
            image: null
        }]);
    };
    const handleRemoveVehical = (index) => {
        const newVehical = [...vehicals];
        newVehical.splice(index, 1);
        setVehicals(newVehical);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('vehicals', JSON.stringify(vehicals))
            formData.append('vehicalCategory', vehicalCategory)
            vehicals.forEach((vehical, index) => {
                formData.append(`image`, vehical.image);
            });
            const response = await axios.post(`${server}/add-vehicle`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Set the correct Content-Type for file upload
                },
            })
            if (response) {
                toast.success("Vehicals added successfully")
            }
        }
        catch (err) {
            console.log(err)
            // toast.error(err.response.data.message)
        }
    };

    return (
        <>
            <div className="container mx-auto">
                <h3 className=" p-6 text-2xl text-start">Add vehicals</h3>
                <div className="flex justify-center items-center h-fit px-6">
                    <div className="w-full lg:w-full bg-white p-5 rounded-lg lg:rounded-l-none">
                        <div className="flex-col w-full">
                            <form onSubmit={handleSubmit} className=" mb-4 bg-white rounded overflow-y-scroll h-[23rem]" >
                                {vehicals.map((vehical, index) => (
                                    <div key={index + 1} className='flex mb-8'>
                                        <div className='w-[95%] mr-2'>
                                            <div className="mb-4 md:flex md:justify-between">
                                                <div className="w-5/12 mb-4 md:mr-2 md:mb-0">
                                                    <label className="block mb-2 text-sm font-bold text-gray-700" >
                                                        Vehical Category
                                                    </label>
                                                    <input name='vehicalCategory' value={vehicalCategory} onChange={(event) => setVehicalCategory(event.target.value)} className="w-full h-11 px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" placeholder='Vehical Category' required />
                                                </div>
                                                <div className="w-5/12 mb-4 md:mr-2 md:mb-0">
                                                    <label className="block mb-2 text-sm font-bold text-gray-700" >
                                                        Vehical Name
                                                    </label>
                                                    <input name="vehicalName" value={vehical.vehicalName} onChange={(event) => handleInputChange(index, event)} className="w-full h-11 px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" type='text' placeholder='Vehical name' required />
                                                </div>
                                            </div>
                                            <div className="mb-4 md:flex md:justify-between">
                                                <div className="w-5/12 md-2">
                                                    <label className="block mb-2 text-sm font-bold text-gray-700">
                                                        Vehical Price
                                                    </label>
                                                    <input name="vehicalPrice" value={vehical.vehicalPrice} onChange={(event) => handleInputChange(index, event)} className="w-full h-11 px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" type='number' placeholder='Vehical price' required />
                                                </div>
                                                <div className="w-5/12 mb-4 md:mr-2 md:mb-0">
                                                    <label className="block mb-2 text-sm font-bold text-gray-700" >
                                                        Vehical Image
                                                    </label>
                                                    <input name='image' onChange={(event) => handelImageChanges(index, event)} className="w-full h-11 px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" type="file" accept='image/*' required />
                                                </div>
                                            </div>

                                        </div>
                                        <div type="button" onClick={() => handleRemoveVehical(index)} className="w-[1rem] flex justify-center items-center bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded cursor-pointer">
                                            <span className='inline-block'>
                                                <AiOutlineDelete size={20} />
                                            </span>
                                        </div>
                                    </div>
                                ))}
                                <div type="button" onClick={handleAddMoreVehical} className="w-[15%] flex justify-between items-center bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded cursor-pointer">
                                    <span className="mr-1">Add More</span>
                                    <span className='inline-block'>
                                        <IoMdAddCircleOutline size={20} />
                                    </span>
                                </div>
                                <div className="flex w-full justify-center ">
                                    <button type="submit" className="w-3/12 mt-4 px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline" >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default AddVehicals;
