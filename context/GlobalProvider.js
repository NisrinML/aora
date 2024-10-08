import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { getCurrentUser } from "../lib/appwrite";

const { createContext } = require("react");

const GlobalContext = createContext();
export const useGlobalContext = ()=>useContext(GlobalContext)
export const GlobalProvider = ({ children})=>{
    const [isLoggedIn,setIsLoggedIn]=useState(false)
    const [user,setUser]=useState(null)
    const [isLoading,setIsLoading]= useState(true)

    useEffect(()=>{
        getCurrentUser()
        .then((res)=>{
            if(res){
                setIsLoggedIn(true)
                setUser(res)
             
            }else{
                setIsLoggedIn(false)
                setUser(null)
            }
        }).catch((err)=>{
            console.log(err)
        }).finally(()=>{
            setIsLoading(false)
        })
    },[])
    return(
        <GlobalContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                user,
                setUser,
                isLoading
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}