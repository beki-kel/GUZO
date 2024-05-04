import React,{useState} from 'react';
import orangeLoading from '../assets/orange-gif.gif';
import sheraton from '../assets/Sheraton_Hotel,_Addis_Ababa_(2058298419).jpg'

function StayFilterSection( {stayResponse,stayLoading,stayError}) {

    const [loading, setLoading] = useState(false);
    return (
        <div className='w-full my-10 flex flex-col'>
            {stayLoading ? <div className='w-full flex justify-center items-center mb-2 p-2'>
                <img src={orangeLoading} alt="Loading" className=" w-50 h-32 rounded-t-lg" />
            </div>:<></>}

            {stayError ? <div className='w-full text-center text-2xl text-red-600 p-9'> {stayError} </div> :<></> }

            {stayResponse?<div  className='w-full flex space-x-10'>
                            <div className='w-3/12 flex flex-col rounded-2xl px-10'>
                                <p className='text-2xl text-center m-2 mb-0 font-medium'> Filter By </p>
                                <p className='text-md mt-3 mx-2 font-medium text-center'>Cities </p>
                                <form className='flex w-full flex-col space-y-2 border-t-2 border-orange-500 text-center opacity-100'>
                                        <div className='w-full'>
                                            <input type="radio" id="html" name="fav_language" value="HTML"/>
                                            <label for="html">HTML</label>
                                        </div>

                                        <div className='w-full'>
                                            <input type="radio" id="html" name="fav_language" value="HTML"/>
                                            <label for="html">HTML</label>
                                        </div>

                                        <div className='w-full'>
                                            <input type="radio" id="html" name="fav_language" value="HTML"/>
                                            <label for="html">HTML</label>
                                        </div>

                                        <div className='w-full'>
                                            <input type="radio" id="html" name="fav_language" value="HTML"/>
                                            <label for="html">HTML</label>
                                        </div>
                                </form>

                                <p className='text-md mt-6 mx-2 font-medium text-center'>Room Amenities </p>
                                <form className='flex w-full flex-col  mx-auto space-y-2 border-t-2 border-orange-500 text-center'>
                                        <div className='w-full'>
                                            <input type="radio" id="html" name="fav_language" value="HTML"/>
                                            <label for="html">HTML</label>
                                        </div>

                                        <div className='w-full'>
                                            <input type="radio" id="html" name="fav_language" value="HTML"/>
                                            <label for="html">HTML</label>
                                        </div>

                                        <div className='w-full'>
                                            <input type="radio" id="html" name="fav_language" value="HTML"/>
                                            <label for="html">HTML</label>
                                        </div>

                                        <div className='w-full'>
                                            <input type="radio" id="html" name="fav_language" value="HTML"/>
                                            <label for="html">HTML</label>
                                        </div>
                                </form>

                                <p className='text-md mt-6 mx-2 font-medium text-center'>Accommodation Type</p>
                                <form className='flex w-full flex-col  mx-auto space-y-2 border-t-2 border-orange-500 text-center'>
                                        <div className='w-full'>
                                            <input type="radio" id="html" name="fav_language" value="HTML"/>
                                            <label for="html">HTML</label>
                                        </div>

                                        <div className='w-full'>
                                            <input type="radio" id="html" name="fav_language" value="HTML"/>
                                            <label for="html">HTML</label>
                                        </div>

                                        <div className='w-full'>
                                            <input type="radio" id="html" name="fav_language" value="HTML"/>
                                            <label for="html">HTML</label>
                                        </div>

                                        <div className='w-full'>
                                            <input type="radio" id="html" name="fav_language" value="HTML"/>
                                            <label for="html">HTML</label>
                                        </div>
                                </form>
                                
                                <p className='text-md mt-6 mx-2 font-medium text-center'>Room Type </p>
                                <form className='flex w-full flex-col  mx-auto space-y-2 border-t-2 border-orange-500 text-center'>
                                        <div className='w-full'>
                                            <input type="radio" id="html" name="fav_language" value="HTML"/>
                                            <label for="html">HTML</label>
                                        </div>

                                        <div className='w-full'>
                                            <input type="radio" id="html" name="fav_language" value="HTML"/>
                                            <label for="html">HTML</label>
                                        </div>

                                        <div className='w-full'>
                                            <input type="radio" id="html" name="fav_language" value="HTML"/>
                                            <label for="html">HTML</label>
                                        </div>

                                        <div className='w-full'>
                                            <input type="radio" id="html" name="fav_language" value="HTML"/>
                                            <label for="html">HTML</label>
                                        </div>
                                </form>

                                
                                <p className='text-md mt-6 mx-2 font-medium text-center'>Rating </p>
                                <form className='flex w-full flex-col  mx-auto space-y-2 border-t-2 border-orange-500 text-center'>
                                        <div className='w-full'>
                                            <input type="radio" id="html" name="fav_language" value="HTML"/>
                                            <label for="html">HTML</label>
                                        </div>

                                        <div className='w-full'>
                                            <input type="radio" id="html" name="fav_language" value="HTML"/>
                                            <label for="html">HTML</label>
                                        </div>

                                        <div className='w-full'>
                                            <input type="radio" id="html" name="fav_language" value="HTML"/>
                                            <label for="html">HTML</label>
                                        </div>

                                        <div className='w-full'>
                                            <input type="radio" id="html" name="fav_language" value="HTML"/>
                                            <label for="html">HTML</label>
                                        </div>
                                </form>
                            </div>

                            <div className='w-8/12 flex flex-col bg-white'>
                                <div className='w-full mr-32 bg-white  flex rounded-xl shadow-xl mb-6'>
                                    <div className='w-1/2 rounded-xl'>
                                        <img src={sheraton} alt="Loading" className="h-72 w-full rounded-lg " />
                                    </div>
                                    <p className="w-1/2 p-10 text-orange-600"> chala chube cheb fkajs aslkdfhaskd sdfjlaksjd asdkjfhalks</p>
                                </div>

                                <div className='w-full mr-32 bg-white flex rounded-xl shadow-xl mb-6'>
                                    <div className='w-1/2 rounded-xl'>
                                        <img src={sheraton} alt="Loading" className="h-72 w-full rounded-lg" />
                                    </div>
                                    <p className="w-1/2 p-10 text-orange-600"> chala chube cheb fkajs aslkdfhaskd sdfjlaksjd asdkjfhalks</p>
                                </div>

                                <div className='w-full mr-32 bg-white  flex rounded-xl shadow-xl mb-6'>
                                    <div className='w-1/2 rounded-xl'>
                                        <img src={sheraton} alt="Loading" className="h-72 w-full rounded-lg" />
                                    </div>
                                    <p className="w-1/2 p-10 text-orange-600"> chala chube cheb fkajs aslkdfhaskd sdfjlaksjd asdkjfhalks</p>
                                </div>
                            </div>
                        </div>
            :<></>}
        </div>
  )
}

export default StayFilterSection
