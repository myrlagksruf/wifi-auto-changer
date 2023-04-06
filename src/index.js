import dotenv from 'dotenv';
dotenv.config();
import { sendMessage } from "./discord.js";
import { changePass } from "./pass.js";
import crypto from 'crypto';

let isTest = process.argv.some(v => v === 'test');
let hma = crypto.createHmac('sha256', 'salt');
hma.update(String(Date.now()));

let pass = hma.digest('base64url').replaceAll('-', '').replaceAll('_', '').toLowerCase().slice(0, 10);
let flag = true;
try{
    if(!isTest){
        flag = await changePass(pass);
    }
    if(flag){
        await sendMessage(pass, isTest);
    }
} catch(err){
    console.error(err);
}