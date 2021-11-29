export const validateEnv = ()=>{
    if(!process.env.BOT_TOKEN){
        console.warn('Missing discord bot token!');
        return false;

    }
    if(!process.env.MONGODB){
        console.warn('Missing mongoDB connection!');
        return false;
    }
    return true;
}