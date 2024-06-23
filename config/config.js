import dotenv from  'dotenv'

dotenv.config()

 export const  config= {
    databaseMongoDB: process.env.DATABASENAME,
    urlMongoDB: process.env.URLMONGODB,
    port: process.env.PORT ?? 8080,
    saltRounts:  parseInt(process.env.SALT_ROUNDS),
    secret_key: process.env.SECRET_KEY
}



