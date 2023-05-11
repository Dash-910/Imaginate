import React,{useState} from "react";
import {useNavigate} from 'react-router-dom';
import {preview} from  "../assets";
import {getRandomPrompt} from "../utils";
import { Loader,FormField } from "../components";

const CreatePost= ()=>{
    // used naigate hoook to route in between pages
     const navigate = useNavigate();

     //intialized form with blank values
     const [form,setForm] = useState({
            name:'',
            prompt:'',
            photo:''
     });

     const [generatingImg,setGeneratingImg] = useState(false);
     const [loading,setLoading] = useState(false);

     //Used spred operator to render change by the user in the form
     const handleChange = (e)=>setForm({
        ...form,[e.target.name]:e.target.value
     });

     //used to select prompt form our assest prompts
    const handleSurpriseMe = ()=>{
        const randomPrompt = getRandomPrompt(form.prompt);
        setForm({...form,prompt:randomPrompt});
    };

    const generateImage = async () =>{
        if(form.prompt)
        {
            try{
                setGeneratingImg(true);
                const response = await fetch('http://dalle-arbb.onrender.com/api/v1/dalle',
                {
                    method:'POST',
                    headers:{
                        'content-Type':'application/json',
                    },
                    body:JSON.strinigfy({
                        prompt:form.prompt,
                    }),
                });
                
                const data = await response.json();
                //Form is update||Set the starting string with the common image format in base64
                setForm({...form,photo:'data:image/jpeg;base64,${data.photo}'});
            }catch(error)
            {
                alert(err);
            }finally{
                setGeneratingImg(false);
            }
        }
        else{
            alert('Please proivde a proper prompt');
        }
    };

    const handleSubmit = async(e)=>{
        e.preventDefault();
        //when prompt and photo are present(true)
        if(form.prompt && form.photo){
            setLoading(true);
            try{
                const response = await fetch(
                    'http://dalle-arbb.onrender.com/api/v1/post',
                    {
                        method:'POST',
                        headers:{
                            'Content-Type':'application/json',
                        },
                        body:JSON.stringify({...form}),
                    }
                );
                await response.json();
                alert('Success');
                navigate('/');
            }catch(error)
            {
                alert(error);
            }finally{
                setLoading(false);
            }
        }else{
            alert('Please generate an image with proper details');
        }
    };
return(
       <section className="max-w-7x1 mx-auto">
            <div>
                <h1 className="font-extrabold text-[#222328] text-[32px]">
                    Create
                </h1>
                <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">
                    Generate an imaginative image through DALL-E AI and share it with the friends
                </p>
            </div>
            <form className="mt-16 max-w-3x1" onSubmit={handleSubmit}>
{/* Div that contains both the Field and the image div */}
                <div className="flex flex-col gap-5">
                    {/* FormField is a component */}
                    <FormField
                        labelName="Your Name"
                        type="text"
                        name="name"
                        placeholder="Ex., Akash Tale"
                        value = {form.name}
                        handleChange={handleChange}
                    />

                    <FormField 
                        labelName="Prompt"
                        type="text"
                        name="prompt"
                        placeholder="Pune city covered in Snow"
                        value={form.prompt}
                        handleChange={handleChange}
                        isSurpriseMe
                        handleSurpriseMe={handleSurpriseMe}
                    />
 {/* Div That renders the Image */}
                    <div className="relative bg-gray-50 border border-gray-300 text-gray-900
                    text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 
                    flex justify-center items-center">
                        {form.photo ? (
                            <img 
                                 src={form.photo}
                                 alt={form.prompt}
                                 className="w-full h-full object-contain"/>
                        ) : (
                                <img 
                                    src={preview}
                                    alt="preview"
                                    className="w-9/12 h-9/12 object-contain opacity-40"/>
                        )}

                        {generatingImg && (
                            <div className="absolute insert-0 z-0 flex justify-center items-center bg-[rgbs(0,0,0,0.5)] rounded-lg">
                                <Loader />
                            </div>
                        )}
                    </div>
{/* Button div : Will show generating if generating  state is true */}
                    <div className="mt-5 flex gap-5">
                        <button 
                             type="button"
                             onClick={generateImage}
                             className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto
                             px-5 py-2.5 text-center">
                        {generatingImg ? "Generating..." :"Generate"}
                        </button>
                    </div>
{/* Button div: To share the generate image  */}
                    <div className="mt-10">
                        <p className="mt-2 text-[#666e75] text-[14px]">
                            Once you have created the image you want,you can share it among yours friends
                        </p>
                        <button 
                            type="Submit"
                            className="mt-3 text-white bg-[#6469ff] font-medium rounded-md
                            text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                                {loading ? 'Sharing...' : 'Share among friends'}
                        </button>
                    </div>
                </div>
            </form>
       </section> 
 ); 
};  


export default CreatePost