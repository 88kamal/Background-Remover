// import React, { useState } from 'react'
// import loadImage from "blueimp-load-image";
// import { useSelector, useDispatch } from "react-redux";
// import { setActionStatus } from '../../features/removeBackground';

// export default function RemoveBackground() {
//     const status = useSelector((state) => state.status.bgRemoved);
//     const dispatch = useDispatch();

//     let blob = null;

//     const [image, setImage] = useState(false);

//     const imgUpload = (e) => {
//         const img = e.target.files[0];
//         let input = document.getElementById("upload");
//         let infoArea = document.getElementById("upload-label");
//         let fileName = input.files[0].name;
//         infoArea.textContent = "File name: " + fileName;

//         setImage(img);
//     };

//     const uploadImage = async () => {
//         dispatch(setActionStatus(false));
//         const resizedImage = await loadImage(image, {
//             // resize before sending to Remove.bg for performance
//             maxWidth: 1500,
//             maxHeight: 1500,
//             canvas: true,
//         });

//         resizedImage.image.toBlob(async function (inputBlob) {
// const formData = new FormData();
// formData.append("image_file", inputBlob);

//             const response = await fetch("https://api.remove.bg/v1.0/removebg", {
//                 method: "POST",
//                 headers: {
//                     "X-Api-Key": "bX25tAzokCM1a1ZnXE42yQy5",
//                 },
//                 body: formData,
//             });

//             if (response.status === 200) {
//                 dispatch(setActionStatus(true));
//             } else {
//                 dispatch(setActionStatus(false));
//             }

//             const outputBlob = await response.blob();

//             blob = URL.createObjectURL(outputBlob);
//             const image = document.getElementById("imageResult");
//             console.log(image)
//             const down = document.getElementById("down");
//             image.src = blob;
//             down.href = blob;
//             down.download = "save.png";
//         });
//     };
//     return (
// <div className='flex justify-center'>
//     <div className="">
//         {/* Input  */}
//         <div className="input">
//             {/* Input Tag  */}
//             <div className="input border border-gray-700 px-2 py-2 rounded-lg bg-gray-950 mb-5">
//                 <input
//                     id="upload"
//                     type="file"
//                     onChange={imgUpload}
//                     className="text-sm text-gray-500 file:mr-5 file:py-1 file:px-3  file:text-xs file:font-medium file:border-0 file:rounded-md file:bg-gray-800 file:text-gray-500 hover:file:cursor-pointer hover:file:bg-blue-50 hover:file:text-blue-700 w-[40em]"
//                 />
//                 <label For="upload" id='upload-label' className='hidden'></label>
//             </div>

//             {/* Remove Background Button  */}
//             <div className="flex justify-center mb-5">
//                 <button
//                     type="button"
//                     onClick={uploadImage}
//                     className="text-black bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 font-medium  rounded-lg text-sm px-5 py-2.5 text-center"
//                 >
//                     Remove Background
//                 </button>
//             </div>
//         </div>

//         {/* Output  */}
//         <div className="image-area mt-4 justify-content-center">
//         {status === false ? (
//           <div class="lds-roller mb-3">
//             <div></div>
//             <div></div>
//             <div></div>
//             <div></div>
//             <div></div>
//             <div></div>
//             <div></div>
//             <div></div>
//           </div>
//         ) : (
//           <img
//             id="imageResult"
//             src="#"
//             alt=""
//             className="img-fluid rounded shadow-sm mx-auto d-block"
//           />
//         )}{" "}
//       </div>

//     </div>

// </div>
//     )
// }
import React, { useState } from 'react'

export default function RemoveBackground() {
    const [image, setImage] = useState(null);
    const [bgRemove, setBgRemove] = useState(null);
    const [loading, setLoading] = useState(false);


    const handleRemoveBackground = async () => {
        const apiKey = "KSi5tfbhLj3pQNvtWvUYbq23"
        const apiUrl = "https://api.remove.bg/v1.0/removebg"

        const formData = new FormData();
        formData.append("image_file", image, image.name);
        formData.append("size", 'auto');

        try {
            setLoading(true)
            const res = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'X-Api-Key': apiKey
                },
                body: formData
            })

            const data = await res.blob();

            const reader = new FileReader();
            reader.onloadend = () => setBgRemove(reader.result)
            reader.readAsDataURL(data);
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    console.log(image)

    return (
        <div>
            <div className='flex justify-center'>
                <div className="">
                    {/* Input  */}
                    <div className="input">
                        {/* Input Tag  */}
                        <div className="input border border-gray-700 px-2 py-2 rounded-lg bg-gray-950 mb-5">
                            <input
                                id="upload"
                                type="file"
                                onChange={(e) => setImage(e.target.files[0])}
                                className="text-sm text-gray-500 file:mr-5 file:py-1 file:px-3  file:text-xs file:font-medium file:border-0 file:rounded-md file:bg-gray-800 file:text-gray-500 hover:file:cursor-pointer hover:file:bg-blue-50 hover:file:text-blue-700 lg:w-[40em]"
                            />
                        </div>

                        {/* Remove Background Button  */}
                        <div className="flex justify-center mb-5">
                            <button
                                type="button"
                                onClick={handleRemoveBackground}
                                className="text-black bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 font-medium  rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                Remove Background
                            </button>
                        </div>
                    </div>

                    {/* Output  */}

                        <div className="flex gap-1 mb-5 ">
                            {image && <div className="border-2 border-gray-500 rounded-l-lg border-dashed flex justify-center p-2 w-40 lg:w-80">
                                {image && <img className="w-90 h-90" src={image ? URL.createObjectURL(image) : ""} alt="" />}
                            </div>}

                            {bgRemove && <div className="border-2 border-gray-500 rounded-r-lg border-dashed flex justify-center p-2 w-40 lg:w-80">
                                {loading && <h1 className='text-white'>loading ...</h1>}
                                {
                                    bgRemove && <img className="w-90 h-90" src={bgRemove} alt="img" />
                                }
                            </div>}
                        </div>

                    {bgRemove && <div className="flex justify-center">
                       <a className='w-full' href={bgRemove} download={'save.png'}>
                       <button className=' bg-gray-800 text-white w-full py-2 px-3 rounded-lg border border-gray-600'>Download</button>
                       </a>
                    </div>}

                </div>

            </div>
        </div>
    )
}
