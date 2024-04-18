import { NextResponse } from "next/server";
import { Cart } from "../../../../models/Cart";
import { currentUser } from "@clerk/nextjs";
import { User } from "../../../../models/User";
import { connectDb } from "../../../../utils/connectdb";
export async function POST(request, { params }) {
    const { productId } = params;
    const presentUser = await currentUser();
    const customer_email = presentUser.emailAddresses[0].emailAddress;
    try {
        // Find the user by email
        await connectDb()
        const userDetails = await User.findOne({ email: customer_email });

        if (userDetails) {
            const userId = userDetails._id;

            // Find the existing cart for the user
            const existingCart = await Cart.findOne({ user: userId });

            if (existingCart) {
                // If cart exists, add productId to the cartItem array
                if (!existingCart.cartItem.includes(productId)) {
                    existingCart.cartItem.push(productId);
                    await existingCart.save();
                    return NextResponse.json(existingCart, {
                        status: 200,
                        statusText: "OK",
                    });
                } else {
                    // If productId is already in the cart, return a response
                    return NextResponse.json({
                        message: "Product is already in the cart",
                    });
                }
            } else {
                // If no cart exists, create a new cart and save it
                const newCart = new Cart({ user: userId, cartItem: [productId] });
                const savedCart = await newCart.save();
                return NextResponse.json(savedCart, {
                    status: 200,
                    statusText: "OK",
                });
            }
        } else {
            return NextResponse.json({
                message: "User not found",
            });
        }
    } catch (error) {
        console.error("Error updating cart:", error);
        throw error;
    }
}
