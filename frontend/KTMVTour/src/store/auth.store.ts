import {create}from 'zustand'

interface AuthStore {
  isAuthenticated: boolean,
  setIsAuthenticated: (isAuthenticated:boolean) => void

  login: ()=> void
  logout: ()=> void
}


export const useAuthStore = create<AuthStore>((set,get)=>({
  isAuthenticated: false,
  setIsAuthenticated: (isAuthenticated) => set({isAuthenticated}),

  login: ()=>set({isAuthenticated:true}),
  logout: ()=>set({isAuthenticated:false})
}))