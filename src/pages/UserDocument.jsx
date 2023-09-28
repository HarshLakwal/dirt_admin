import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { imageURL, server } from '../server';
import { useParams } from 'react-router-dom';
import styles from '../styles/styles';
import { toast } from 'react-toastify';
import { RxCross1 } from 'react-icons/rx';


const UserDocument = () => {
    let { id } = useParams();
    const [data, setData] = useState(null)
    const [open, setOpen] = useState(false)
    const [subject, setSubject] = useState("")
    const [body, setBody] = useState("")
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
    const raiseIssue = async (e) => {
        e.preventDefault()
        await axios.post(`${server}/createIssue/${id}`, { subject: subject, body: body }).then((res) => {
            if (res.data) {
                setSubject()
                setBody()
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
    return (
        <>
            <div className="container mx-auto">
                <h3 className=" p-6 text-2xl text-start">User Document</h3>
                {
                    data === null ? <span style={{ display: 'flex', justifyContent: 'center' }}>Document not submitted</span> :
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

                    <button
                        onClick={() => onVerify({ verify: true })} style={{ backgroundColor: "green", }}
                        className={!data ? `cursor-not-allowed ${styles.button} text-white text-[18px] !h-[42px] m-auto mt-[4rem]` : `cursor-pointer ${styles.button} text-white text-[18px] !h-[42px] m-auto mt-[4rem]`}
                        type='button'
                        disabled={!data}
                    >
                        Verified
                    </button>
                    <button onClick={() => onVerify({ reject: true })}

                        style={{ backgroundColor: "red" }}
                        className={!data ? `cursor-not-allowed ${styles.button} text-white text-[18px] !h-[42px] m-auto mt-[4rem]` : `cursor-pointer ${styles.button} text-white text-[18px] !h-[42px] m-auto mt-[4rem]`}
                        type='button'
                        disabled={!data}

                    >
                        Reject
                    </button>
                    <button
                        className={!data ?`cursor-not-allowed ${styles.button} text-white text-[18px] !h-[42px] m-auto mt-[4rem]`:`cursor-pointer ${styles.button} text-white text-[18px] !h-[42px] m-auto mt-[4rem]`}
                        type='button'
                        onClick={() => setOpen(true)} 
                        disabled={!data}
                         >
                        Issue
                    </button>
                </div>
            </div>
            {open && (
                <div className="w-full fixed top-0 left-0 z-[999] bg-[#00000039] flex items-center justify-center h-screen">
                    <div className="w-[95%] 800px:w-[40%] min-h-[20vh] bg-white rounded shadow p-5">
                        <div className="w-full flex justify-end cursor-pointer">
                            <RxCross1 size={25} onClick={() => setOpen(false)} />
                        </div>
                        <form onSubmit={raiseIssue} >
                            <div className="flex justify-center items-center mb-10">
                                <input className="w-[80%] h-11 px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:border-[#07bc0c]"
                                    type="text" placeholder="Enter Subject" name="subject" onChange={(e) => setSubject(e.target.value)} required />
                            </div>
                            <div class="flex justify-center">
                                <textarea className="w-[80%] h-[30vh] px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:border-[#07bc0c]"
                                    type="text" placeholder="Type Issue..." name="body" onChange={(e) => setBody(e.target.value)} required />
                            </div>
                            <div className="w-full flex items-center justify-center">
                                <button className={`${styles.button} text-white text-[18px] !h-[42px] ml-4`} type='submit'  >
                                    Send
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default UserDocument