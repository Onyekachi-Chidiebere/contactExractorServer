const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express();
const Port = process.env.PORT
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())
app.options('*', cors())

const siteUrl = 'https://www.google.co.in/search?q=yoga+gmail+91';
const axios = require("axios");
const cheerio= require('cheerio');
const phoneNo = new RegExp("\\+?\\(?\\d*\\)? ?\\(?\\d+\\)?\\d*([\\s./-]?\\d{2,})+", "g");
const email1 = new RegExp(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\. [a-zA-Z0-9._-]+)/gi)
const email2 = new RegExp(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi)

app.post('/get-data',async (req,res)=>{
 const webPage = await axios.get(siteUrl);
 const html = webPage.data;
 let $ = cheerio.load(html);
 const data = $.text().toString();
 const emails1 = data.match(email1);
    const emails2 = data.match(email2);
    const emails =[...emails1,...emails2]
    const phoneRaw = data. match(phoneNo);

    const phone = Array.from(phoneRaw)

    const number = phone.filter((no)=>{
      return (no.toString())
    })
    const num = number.filter((no)=>{
      return no.length>10
    })

    console.log('emails', emails ,'phone', num);

    res.json({emails,num})
})

app.listen((3000||port),()=>{
  console.log('app running on port 3000')
})

