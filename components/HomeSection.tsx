import { FlipWords } from "./ui/flip-words"

export default function HomeSection(){
    const words = ["Anonymous","Faster","Safe"]
    return(
        <div className=" h-screen w-screen flex justify-center items-center ">
            <div className="text-5xl mx-auto font-bold">
                    The Perfect Application To Send
                    <FlipWords 
                    words={words} 
                    className="text-white"
                    duration={1000} 
                    /> <br />
                     Messages to others 
            </div>
        </div>
    )
}