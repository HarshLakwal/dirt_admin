import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { imageURL, server } from '../server';
import { useParams } from 'react-router-dom';
import styles from '../styles/styles';
import { toast } from 'react-toastify';


const UserDocument = () => {
    let { id } = useParams();
    const [data, setData] = useState(null)
    const [selectData, setSelectData] = useState("Adhar Card")
    const getData = async () => {
        await axios.get(`${server}/get-user-document/${id}`).then((res) => {
            setData(res.data.document)
        })
    }
    const onVerify = async (data) => {
        await axios.post(`${server}/verify-document/${id}`, data).then((res) => {
            if (res.data) {
                return toast.success(res.data.result)
            }
            toast.error(res.data.response.message)
        })
    }
    useEffect(() => {
        getData()
    }, [id])
    const handleChange = (e) => {
        setSelectData(e.target.value)
    }
{console.log(data)}
    return (
        <>
            <div className="container mx-auto">
                <h3 className=" p-6 text-2xl text-start">User Details</h3>
                {
                    data === null ? "No data" :
                        (<div className="flex justify-center items-center h-fit px-6">
                            <div className="w-full xl:w-full lg:w-full flex justify-between">
                                <div className="flex flex-col items-center bg-white border border-gray-200 
                rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700
                 dark:bg-gray-800 dark:hover:bg-gray-700">
                                    {
                                        selectData === "Adhar Card" ? (
                                                <img
                                                    className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-[25rem] md:rounded-none md:rounded-l-lg"
                                                    src={`${imageURL}/${data.userDocumentsDetails.adharImage}`}
                                                    alt="img"
                                                />
                                            ) : (
                                                <img
                                                    className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-[25rem] md:rounded-none md:rounded-l-lg"
                                                    src={`${imageURL}/${data.userDocumentsDetails.PANImage}`}
                                                    alt="img"
                                                />
                                            )
                                    }

                                </div>
                                <div className="mb-4 md:flex flex-col md:justify-center w-[32rem]">
                                    <div class="flex ">
                                        <div class="mb-3 xl:w-[50%] ">
                                            <label className="block mb-2 text-sm font-bold text-gray-700" >
                                                ID Proof
                                            </label>
                                            <select onChange={handleChange} class="form-select h-11 appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-[#07bc0c] focus:outline-none" aria-label="Select code" required>
                                                <option selected>Select code</option>
                                                <option>Adhar Card</option>
                                                <option>PAN Card</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="xl:w-[50%]  mb-4 md:mr-2 md:mb-0">
                                        <label className="block mb-2 text-sm font-bold text-gray-700" >
                                            {selectData}
                                        </label>
                                        <input value={selectData === "Adhar Card" ? data.userDocumentsDetails.adharNumber : data.userDocumentsDetails.PANNumber} className="w-full h-11 px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" type="text" placeholder="Adhar Number" readOnly />
                                    </div>
                                </div>

                            </div>
                        </div>)
                }

                <div style={{ display: 'flex' }}>
                    <button onClick={() => onVerify({ verify: true })} style={{ backgroundColor: "green" }} className={`${styles.button} text-white text-[18px] !h-[42px] m-auto mt-[4rem]`} type='button'  >
                        Verified
                    </button>
                    <button onClick={() => onVerify({ reject: true })} style={{ backgroundColor: "red" }} className={`${styles.button} text-white text-[18px] !h-[42px] m-auto mt-[4rem]`} type='button'  >
                        Reject
                    </button>
                    <button className={`${styles.button} text-white text-[18px] !h-[42px] m-auto mt-[4rem]`} type='submit'  >
                        Issue
                    </button>
                </div>

            </div>
        </>
    )
}

export default UserDocument