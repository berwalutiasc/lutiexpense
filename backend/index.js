
import express from "express"
import cors from "cors"
import bcrypt from "bcryptjs"

import { PrismaClient } from "@prisma/client"


const app = express();
const prisma  = new PrismaClient();



const PORT = process.env.PORT;

app.use(cors());

app.use(express.json());

app.post("/api/users", async(req, res) => {
    const {userId, fname, lname, username, email, phone, profile, password} = req.body;

    //hash the password

    const hashedPass = bcrypt.hash(password, 10);

    try{
        const user = await prisma.client.create({
            data: {
                uuid: userId,
                fname,
                lname,
                username,
                email,
                phone,
                profile,
                password: hashedPass
            }
        });

        res.status(201).json(user);
    }catch(error){
        console.error(error);
        res.status(500).json({error: "Internal Server Error"});
    }
});




app.listen(PORT, () => {
    console.log("Server is running brother");
})