import { connect } from "mongoose";


export const connectDatabase = async()=>{
    await connect(process.env.MONGODB as string);
    console.log('database connected')
}