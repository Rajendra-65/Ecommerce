import { currentUser } from "@clerk/nextjs"
import {User} from "../models/user"

export const CreateUser = async () => {
    try{
        const user = await currentUser()
        const customer_email = user.emailAddresses[0].emailAddress
        const allUser = await User.find()
        const foundUser = allUser.map( (user) => {
            if(user.email === customer_email) {
                return true
            }
        })
        if(!foundUser){
            const userId = user.id
            const createdUser = new User({
                userId:userId,
                email:customer_email
            })
            await createdUser.save()
            console.log("User Saved Successfully")
        }
        else{
            console.log("successfylly Returning")
            return
        }
    }catch(e){
        console.log(e)
        console.log("Failed to Save User to the database")
    }
}