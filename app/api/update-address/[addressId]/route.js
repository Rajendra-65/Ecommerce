import { Address } from "../../../../models/Address";
import mongoose from "mongoose";

export const POST = async (request, { params }) => {
    try {
        console.log("Code Reached to the Post Request");
        const { addressId } = params;

        if (!addressId || !mongoose.Types.ObjectId.isValid(addressId)) {
            return NextResponse.json({ error: 'Invalid or missing addressId' }, { status: "400", statusText: "Bad Request" });
        }

        const convertedId = mongoose.Types.ObjectId(addressId);

        if (!request) {
            throw new Error('Request object is undefined or null.');
        }

        if (!request.body) {
            throw new Error('Request body is undefined.');
        }

        const { fullName, address, city, country, postalCode } = await request.json();
        const updatedAddress = await Address.findByIdAndUpdate(
            convertedId,
            {
                Name: fullName,
                Address: address,
                City: city,
                Country: country,
                PostalCode: postalCode
            },
            { new: true }
        );

        return NextResponse.json(updatedAddress, { status: "200", statusText: "Ok" });
    } catch (error) {
        console.log('Error in the Post route', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: "500", statusText: "Internal Server Error" });
    }
};