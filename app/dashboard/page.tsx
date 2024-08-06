'use client'

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useUser } from "@clerk/nextjs"
import { useToast } from "@/components/ui/use-toast"
import { useCallback, useEffect, useState } from "react"
import Navbar from "@/components/Navbar"
import { Loader2,RefreshCcw } from "lucide-react"
import axios from "axios"
import { ToastAction } from "@/components/ui/toast"
import { MessageCard } from "@/components/MessageCard"
import { useMemo } from "react"
import NotSignedIn from "@/components/NotSignedIn"

function UserDashboard() {
  const[messages,setMessages] = useState<Message[]>([]);
  const [isMessage,setIsMessage] = useState(true);
  const [isLoading,setIsLoading] = useState(false);


  const { toast } = useToast()
  const { user } = useUser()

 const profileUrl = useMemo(() =>{
  return `${window.location.protocol}//${window.location.host}/u/${user?.firstName}`
 },[user?.firstName])

 
  
 const fetchMessages = useCallback(async () => {
  const userEmail = user?.emailAddresses[0]?.emailAddress
  if (!userEmail) return

  setIsLoading(true)
  try {
    const response = await axios.get<{userMessage : Message[]}>('/api/get-message', {
      params: { email: userEmail },
    })
    setMessages(response.data.userMessage)
  } catch (error) {
    toast({
      variant: "destructive",
      title: "Can't Fetch",
      description: "Can't able to fetch",
      action: <ToastAction altText="Try again">Try again</ToastAction>
    })
  } finally {
    setIsLoading(false)
  }
}, [toast, user])


  function copyToClipBoard() {
    navigator.clipboard.writeText(profileUrl)
    toast({
      variant: "default",
      title: "URL Copied",
      description: "Profile URL has been copied to clipboard.",
    })
  }


  const handleDeleteMessage = (messageId: number) => {
    setMessages(prevMessages => prevMessages.filter((message) => message.id !== messageId));
  };

  async function handleMessageToggle(checked : boolean){
    setIsMessage(checked);
    try {
      await axios.post('/api/accept-message',{
        email :  user?.emailAddresses[0]?.emailAddress,
          isAcceptingMessages : checked
        }
      );
      toast({
        title : "Settings Updated",
        description : `Message acceptance is now ${checked ? "enabled" : "disabled"}`
      })

    } catch (error) {
      console.error("Error updating message status:", error);
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: "Failed to update message acceptance status.",
      });
    }
  }

  


  useEffect(() =>{
    
    fetchMessages();
     
   },[fetchMessages])
  return (
    <>
    <Navbar/>
    <div className="p-20">
      <h1 className="text-4xl font-bold mb-4">User Dashboard</h1>
      <p className="text-lg font-semibold mb-2">Copy your Unique URL</p>
      <div className="flex items-center gap-2">
        <input
          type="text"
          disabled
          value={profileUrl}
          className="w-full p-2 bg-slate-300 rounded border"
        />
        <Button onClick={copyToClipBoard}>Copy Url</Button>
      </div>
      <div className="flex item-center space-x-2 mt-4 mb-4">
        <Switch id="accept-msg" 
       checked={isMessage}
        onCheckedChange={handleMessageToggle}
        />
        <Label htmlFor="accept-msg" className="text-md">Accept message: {isMessage ? "ON" : "OFF"}</Label>
      </div>
      <Button
      variant={"outline"}
      onClick={(e) =>{
        e.preventDefault()
        fetchMessages()
      }}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin"  /> 
        ):(
         <RefreshCcw className="h-4 w-4" />
         )}
      </Button>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
      {messages.length > 0 ? (
            messages.map((message, index) => (
                  <MessageCard
                    key={index}
                    message={message}
                    onMessageDelete={handleDeleteMessage}
                  />
              ))
            
          ) : (
            <p>No message to display</p>
          )}
      </div>

    </div>
    </>
    
    
  )
}

function MainDashboard() {
  const { isSignedIn } = useUser()

  return (
    <>
      {isSignedIn ? (
        <UserDashboard />
      ) : (
        <NotSignedIn/>
      )}
    </>
  )
}

export interface Message{
  id : number,
  content : string,
  createdAt : Date
}

export default MainDashboard