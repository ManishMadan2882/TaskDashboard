import {Request} from 'express';

export interface RequestCustom extends Request
{
    user: {
        email:String,
        id:number,
        time:Date
    };
}