import { UserDetails } from "../services/userDetails";

export const userView = async () => {
    try{
        const user = await UserDetails()
        if(user.email === "rajedndrbehera9@gmail.com"){
            return true
        }else{
            return false
        }
    }catch(e){

    }
}