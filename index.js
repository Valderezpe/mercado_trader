require('dotenv').config();
const axios = require('axios');
const WebSocket = require("ws");

const ws = new WebSocket("wss://ws.mercadobitcoin.net/ws");

ws.onopen = () =>{
    ws.send(JSON.stringify({
        "type": "subscribe",
        "subscription":{
            "name": "ticker",
            "id": process.env.STREAM_ID
        }
    }));
}

ws.onmessage = (evt)=> {
    console.clear();
    const obj = JSON.parse(evt.data);
    console.log(obj);
}

async function login(){
    const url = `https://api.mercadobitcoin.net/api/v4/authorize`;
    const body = {login: process.env.API_KEY, password: process.env.API_SECRET}
    const {data} = await axios.post(url, body);
    console.log("Acesso Autorizado!");
    
}