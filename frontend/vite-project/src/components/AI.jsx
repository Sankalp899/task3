import React, {useContext, useState} from 'react'
import AiImg from '../assets/AI.png'
import { shopDataContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function AI() {

    let [activeAI , setactiveAI] = useState(false)
    let {showSearch, setShwoSearch} = useContext(shopDataContext)
    let navigate = useNavigate()

    function speak(message){
      let utterence = new SpeechSynthesisUtterance(message)
      window.speechSynthesis.speak(utterence)
    }



    const speechRecognition = window.speechRecognition || window.webkitSpeechRecognition
    const recognition = new speechRecognition()

    if(!recognition){
      console.log("Not supported")
    }

    recognition.onresult = (e) =>{
      const transScript = e.result[0][0].transScript.trim();
      if(transScript.toLowerCase().includes("search") && transScript.toLowerCase().includes("open") && !showSearch){
        speak("Opening search")
        setShwoSearch(true)
        navigate("/collection")
      }
      else if(transScript.toLowerCase().includes("search")&& transScript.toLowerCase.includes("close") && showSearch){
        speak("closing search")
        setShwoSearch(false)
      }
      else if(transScript.toLowerCase().includes("collection") || 
      transScript.toLowerCase().includes("collections") ||
      transScript.toLowerCase().includes("product") || 
      transScript.toLowerCase().includes("products")){
        speak("opeming collection page")
        navigate("/collection")
      }

      else if(transScript.toLowerCase().includes("about")||
      transScript.toLowerCase().includes("aboutpage")){
        speak("opening about page")
        navigate("/about")
        setShwoSearch(false)
      }

       else if(transScript.toLowerCase().includes("home")||
      transScript.toLowerCase().includes("homepage")){
        speak("opening home page")
        navigate("/")
        setShwoSearch(false)
      }

       else if(transScript.toLowerCase().includes("cart")||
      transScript.toLowerCase().includes("kaat")|| transScript.toLowerCase().includes("cart")){
        speak("opening your cart")
        navigate("/cart")
        setShwoSearch(false)
      }

       else if(transScript.toLowerCase().includes("contact")){
        speak("opening Contact cart")
        navigate("/contact")
        setShwoSearch(false)
      }

       else if(transScript.toLowerCase().includes("order")||
          transScript.toLowerCase().includes("myorders")|| transScript.toLowerCase().includes("orders") || 
        transScript.toLowerCase().includes("my order")){
        speak("opening your orders page")
        navigate("/order")
        setShwoSearch(false)
      }
      else{
        toast.error("Try Again")
      }
    }
    recognition.onend=()=>{
      setactiveAI(false)
    }
  return (
    <>
    <div className='fixed lg:bottom-[20px] md:bottom-[40px] bottom-[80px] right-[-1.2%]' onClick={()=>{recognition.start(); 
      setactiveAI(true)
      }}>

        <img src={AiImg} alt='' className={`w-[200px] h-[100px] cursor-pointer ${activeAI ? 'translate-x-[10%] translate-y-[-10%] scale-125': 'translate-x-[0] translate-y-[0] scale-100'}
    transition-transform`} style={{filter:`${activeAI?"drop-shadow(0px 0px 30px #00d2fc)":"drop-shadow(0px 0px 20px black"}`
    }} />
    </div>
    </>
  )
}

export default AI