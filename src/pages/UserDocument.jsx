import React from 'react'

const UserDocument = () => {
    return (
        <>
            <div className="container mx-auto">
            <h3 className=" p-6 text-2xl text-start">User Details</h3>

            <div className="flex justify-center items-center h-fit px-6">

                <div className="w-full xl:w-full lg:w-full flex">

                    <div className="w-full lg:w-full bg-white p-5 rounded-lg lg:rounded-l-none  h-[27rem]">
                        <div className="text-center flex justify-end">
                            <Link to="/user-document">
                                <button class="w-40 px-2 py-2 rounded-full bg-blue-500 font-bold text-white rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline" type="button" >
                                    View document
                                </button>
                            </Link>
                        </div>
                        <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                            <div className="mb-4 md:flex md:justify-between">
                                <div className="w-5/12 mb-4 md:mr-2 md:mb-0">
                                    <label className="block mb-2 text-sm font-bold text-gray-700" for="firstName">
                                        Name
                                    </label>
                                    <input name="Name" className="w-full h-11 px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" value={user.name} type="text" placeholder="Name" readOnly />
                                </div>
                                <div className="w-5/12 mb-4 md:mr-2 md:mb-0">
                                    <label className="block mb-2 text-sm font-bold text-gray-700" >
                                        Email
                                    </label>
                                    <input name="genre" className="w-full h-11 px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" value={user.email} type="text" placeholder="Email" readOnly />
                                </div>
                            </div>
                            <div className="mb-4 md:flex md:justify-between">
                                <div className="w-5/12 md-2">
                                    <label className="block mb-2 text-sm font-bold text-gray-700" >
                                        Refrence code
                                    </label>
                                    <input name="refCode" className="w-full h-11 px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" value={user.refCode} type="text" placeholder="Not parchase anything yet" readOnly />
                                </div>
                                <div className="w-5/12 mb-4 md:mr-2 md:mb-0">
                                    <label className="block mb-2 text-sm font-bold text-gray-700" >
                                        Special code
                                    </label>
                                    <input name="specialCode" className="w-full h-11 px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" type="text" placeholder="No any code" readOnly />
                                </div>
                            </div>
                            <div className="mb-4 md:flex md:justify-between flex items-end">
                                <div className="w-5/12 md-2">
                                    <label className="block mb-2 text-sm font-bold text-gray-700" for="lastName">
                                        Created At
                                    </label>
                                    <input name="createdAt" className="w-full h-11 px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" value={moment(user.updatedAt).format('DD-MM-YYYY')} type="text" placeholder="Created At" readOnly />
                                </div>
                                <div className="w-5/12 mb-4 md:mr-2 md:mb-0">
                                    <label className="block mb-2 text-sm font-bold text-gray-700" >
                                        Assign code
                                    </label>
                                    <input name="specialCode" value={assignCode} className="w-full h-11 px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" type="text" placeholder="Assign code" readOnly />
                                </div>

                            </div>
                            <div className="mb-4 md:flex md:justify-between">
                                <div className="w-2/5 h-fit text-center">

                                </div>
                            </div>
                            <div className="mb-6 text-center">
                                <button class="w-40 px-2 py-2 rounded-full bg-blue-500 font-bold text-white rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline" type="button" onClick={() => setOpen(true)}>
                                    Assign Coupon
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
                                type="text" placeholder="Enter userId" name="userId" value={user._id} />
                        </div>
                        <form onSubmit={submit}>
                            <div class="flex justify-center">
                                <div class="mb-3 xl:w-[80%] ">
                                    <select value={code} onChange={handleCodeAssign} class="form-select h-11 appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-[#07bc0c] focus:outline-none" aria-label="Select code" required>
                                        <option selected>Select code</option>
                                        {
                                            allCodes.codes.map((code, idx) => {
                                                return (
                                                    <option key={idx}>{code.code}</option>
                                                )
                                            })
                                        }
                                    </select>
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
        </>
    )
}

export default UserDocument