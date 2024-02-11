import { NextFunction, Request, Response } from "express";
import { hashSync, compareSync, genSaltSync } from "bcrypt";
import jwt, { decode, sign } from 'jsonwebtoken'
import { db } from "../lib/db";
//register new users
async function registerUser(req: Request, res: Response,next:NextFunction) {
    const { name,email, password,phoneNumber } = req.body;
    const salt: string = genSaltSync(10)
    const encryptedPassword: string = hashSync(password, salt)
    try{
      const newUser = await db.faculty.create({
        data:{
          name,
          email,
          phoneNumber,
          password:encryptedPassword
        }
      })
      next() // in case of successfull register pass on to login
    }
    catch(err){
      res.json({err,msg:'Something went wrong !'})
    }
}
//create session for existing users
async function loginUser(req: Request, res: Response) {
    const { email, password } = req.body;
    const userData = await db.faculty.findUnique({
      where: { email:email },
    });
    if (userData === null)
        return res.json({
            msg: "user does not exist", //user not found
            success: false
        });
    if (compareSync(password, userData.password)) {
        //create a json token
        const token = sign({
            email: email,
            id: userData.id,
            time: Date.now()
        },
            process.env.JWT_SECRET_KEY as string,
            {
                expiresIn: "30d"
            });
        return res.json({
            success: true,
            msg: 'authenticated',
            id: userData.id,
            token: token //Needs to be stored in client cookies as session-token
        });
    }
    else
        res.json({
            success: false,
            msg: 'authentication failed' //invalid credentials - Unauthorized
        });
}
//identifies the current user
function getUser(req: Request, res: Response) {
    
    const { id } = req.user;

    db.faculty.findUnique({
      where:{id:id}
    })
}
export {
    registerUser,
    loginUser,
    getUser
};