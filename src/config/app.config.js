import { config  } from "dotenv"

config();
//app configlar 
export const appConfig = {
    port:process.env.APP_PORT,
    host:process.env.APP_HOST,
}