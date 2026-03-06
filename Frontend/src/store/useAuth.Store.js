import {create} from "zustand"
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io} from "socket.io-client";
const BACKEND_URL = import.meta.env.MODE === "development" ?   "http://localhost:8000" : "/"
export const useAuthStore = create((set, get) =>({
     
     authUser: null,
     isLoggingIn: false,
     isSigningUp: false,
     isUpdatingProfile: false,
     onlineUsers: [],
     Socket:null,
     
     isCheckingAuth: true,

     checkAuth: async () =>{
          try {
               const res = await axiosInstance.get("/auth/check")
               set({authUser: res.data})
               get().connectSocket()
          } catch (error) {
               console.log("error from Use auth store", error.message)
               set({authUser:null})
          }finally{
               set({isCheckingAuth: false})
          }
     },

     signup: async (data) =>{
          set ({isSigningUp: true})
          try {
               const res = await axiosInstance.post("/auth/signup", data);
               set({authUser : res.data})
               toast.success("Account created successfully")
               get().connectSocket()
          } catch (error) {
               toast.error(error.response.data.message)
          }finally{
               set({isSigningUp:false})
          }
     }, 
     
     Login: async (data) =>{
          set ({isLoggingIn: true})
          try {
               const res = await axiosInstance.post("/auth/login", data)
               set({authUser:res.data})
               toast.success("Login success")
               get().connectSocket()
          } catch (error) {
               toast.error(error.response.data.message)
          }finally{
               set({isLoggingIn:false})
          }
     },

     logout: async () =>{
          try {
               await axiosInstance.post("/auth/logout")
               set ({authUser:null})
               toast.success("Logout Successful")
               get().disConnectSocket()
          } catch (error) {
               toast.error(error.response.data.message)   
          }
     },

     updateProfile: async (data) =>{
          set({isUpdatingProfile : true})
          try {
               const res = await axiosInstance.put("/auth/update-profile", data)
               set({authUser: res.data})
               toast.success("Profile pic uploaded successfully")
          } catch (error) {
               console.log("error from updatingProfile", error.message);
               toast.error(error.response.data.message )
          }finally{
               set({isUpdatingProfile: false})
          }
     },

     connectSocket: async() =>{
          const {authUser} = get()
          if(!authUser || get().socket?.connected) return;

          const socket = io(BACKEND_URL, {
               query :{
                    userId : authUser._id
               }
          })
          socket.connect()
          set ({Socket : socket})

          socket.on("getOnlineUsers", (userId)=>{
               set({onlineUsers:userId})
          })
     },
     disConnectSocket: async() =>{
          if(get().Socket?.connected) get().Socket.disconnect();
     }
}))