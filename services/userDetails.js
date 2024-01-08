import {auth,currentUser} from "@clerk/nextjs"
import axios from "axios"

export const UserDetails = async () => {
    try{
        const user = await axios.get('/api/user')
        return user.data
    }catch(error){
        console.log(error)
    }
}