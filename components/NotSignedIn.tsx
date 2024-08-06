import Navbar from "./Navbar"


export default function NotSignedIn(){
    return(
        <div className="h-screen flex flex-col">
            <Navbar/>
            <div  className="flex-grow flex justify-center items-center">
                <div>Sign in to continue</div>
            </div>
        </div>
    )
}