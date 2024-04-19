import { currentUser } from "@clerk/nextjs"
import {User} from "../models/User"

export const CreateUser = async () => {
    try {
        let admin = false
        const user = await currentUser();

        if (user) {
            const customer_email = user.emailAddresses[0].emailAddress;

            const existingUser = await User.findOne({ email: customer_email });

            if (!existingUser) {
                const userId = user.id;
                for(let i=0;i<adminEmails.length;i++){
                    if(userEmail === adminEmails[i]){
                        admin = true
                        break
                    }
                }
                const createdUser = new User({
                    userId: userId,
                    email: customer_email,
                    admin: admin,
                });

                await createdUser.save();
            } else {
                console.log("User already exists in the database");
                return;
            }
        } else {
            console.log("No user found");
            return;
        }
    } catch (e) {
        console.log(e);
        console.log("Failed to Save User to the database");
    }
};
