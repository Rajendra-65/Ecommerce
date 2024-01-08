import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { connectDb } from "../../../../../utils/connectdb";
import Order from "../../../../../models/Order";
import { Product } from "../../../../../models/Product";

export async function GET(req,{params}) {
  try {
    let extractAllOrders
    const user = await currentUser();
    if (user) {
      const {id} = params
      try{
        await connectDb();
        extractAllOrders = await Order.find({ user: id }).populate(
          "orderItems.product"
        );
      }catch(e){
        console.log('error in extracting Products',e)
      }
      if (extractAllOrders) {
        return NextResponse.json({
          success: true,
          data: extractAllOrders,
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Failed to Process Order ! try again after someTimes",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "Failed to get All Orders from the Database",
      });
    }
  } catch (e) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please Try again later",
    });
  }
}
