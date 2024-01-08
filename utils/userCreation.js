import { currentUser } from "@clerk/nextjs"
import {User} from "../models/user"

export const CreateUser = async () => {
    try {
        const user = await currentUser();

        if (user) {
            const customer_email = user.emailAddresses[0].emailAddress;

            const existingUser = await User.findOne({ email: customer_email });

            if (!existingUser) {
                const userId = user.id;
                const createdUser = new User({
                    userId: userId,
                    email: customer_email,
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
