import React, { useEffect, useState } from 'react'
import styles from '../styles/styles'
import { RxCross1 } from 'react-icons/rx'
import { imageURL, server } from '../server'
import Lottie from 'react-lottie'
import Loader from '../Assests/animations/loader.json'
import axios from 'axios'
import { useParams } from 'react-router-dom'
const PreviewVehical = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: Loader,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };
    const [open, setOpen] = useState(false)
    const [data, setData] = useState([])
    const { id, category } = useParams()
    const getData = async () => {
        await axios.post(`${server}/get-vehicle/${id}`, { category: category })
            .then((res) => {
                setData(res.data.result);
            });
    };
    useEffect(() => {
        getData()
    }, [])
    console.log(data)
    return (
        <div className="container mx-auto">
            <h3 className=" p-6 text-2xl text-start">Vehical Details</h3>
            <div className="flex justify-center items-center h-fit px-6">
                <div className="w-full xl:w-full lg:w-full flex">
                    <div className="w-full lg:w-full bg-white p-5 rounded-lg lg:rounded-l-none  h-[27rem]">
                        <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                            <div className='flex items-center mb-6 border-2 w-[12rem] h-[11rem]'>
                                {
                                    data.length === 0 ? <Lottie
                                        options={defaultOptions}
                                        height={50}
                                        width={50}
                                    /> : <img src={`${imageURL}/${data[0].vehicalImg}`} alt="" />
                                }

                            </div>

                            <div className="mb-4 md:flex md:justify-between">
                                <div className="w-5/12 mb-4 md:mr-2 md:mb-0">
                                    <label className="block mb-2 text-sm font-bold text-gray-700" for="firstName">
                                        Vehical Name
                                    </label>
                                    <input style={{ textTransform: 'capitalize' }} name="vehicalName" value={data.length === 0 ? "" : data[0].vehicalName} className="w-full h-11 px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" type="text" placeholder="Name" />
                                </div>
                                <div className="w-5/12 mb-4 md:mr-2 md:mb-0">
                                    <label className="block mb-2 text-sm font-bold text-gray-700" >
                                        Vehical Price
                                    </label>
                                    <input name="vehicalPrice" value={data.length === 0 ? "" : data[0].vehicalPrice} className="w-full h-11 px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" type="text" placeholder="Email" />
                                </div>
                            </div>
                            {/* <div className="mb-4 md:flex md:justify-between">
                                <div className="w-5/12 mb-4 md:mr-2 md:mb-0">
                                    <label className="block mb-2 text-sm font-bold text-gray-700" for="firstName">
                                        Vehical Price
                                    </label>
                                    <input name="Name" className="w-full h-11 px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" type="text" placeholder="Name" />
                                </div>
                                
                            </div> */}


                            <div className="mb-6 text-center">
                                <button class="w-40 px-2 py-2 rounded-full bg-blue-500 font-bold text-white rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline" type="button" onClick={() => setOpen(true)}>
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {open && (
                <div className="w-full fixed top-0 left-0 z-[999] bg-[#00000039] flex items-center justify-center h-screen">
                    <div className="w-[95%] 800px:w-[40%] min-h-[20vh] bg-white rounded shadow p-5">
                        <div className="w-full flex justify-end cursor-pointer">
                            <RxCross1 size={25} onClick={() => setOpen(false)} />
                        </div>
                        <div className="flex justify-center items-center mb-10">
                            <input className="w-[80%] h-11 px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:border-[#07bc0c]"
                                type="text" placeholder="Enter userId" name="userId" />
                        </div>
                        <form >
                            <div class="flex justify-center">
                                <div class="mb-3 xl:w-[80%] ">

                                </div>
                            </div>
                            <div className="w-full flex items-center justify-center">
                                <div className={`${styles.button} text-white text-[18px] !h-[42px] mr-4`} style={{ backgroundColor: '#' }}
                                    onClick={() => setOpen(false)}
                                >
                                    Cancel
                                </div>
                                <button className={`${styles.button} text-white text-[18px] !h-[42px] ml-4`} type='submit'  >
                                    Assign
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            )}
        </div>
    )
}

export default PreviewVehical