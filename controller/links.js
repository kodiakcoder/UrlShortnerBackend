const express = require('express')
const linksRouter = express.Router()
const shortid = require('shortid')
const bodyParser = require('body-parser')
const Link = require('../model/linkModel')
const validURL = require('valid-url')
require('dotenv').config()

linksRouter.use(bodyParser.json())


linksRouter.get('/:code', async(request, response) => {
    const shortCode = request.params.code

    const result = await Link.findOne({shortCode})
    //console.log(result)
    if(result == null)
    {
        response.status(400).send('No Such short code')
    }
    else
    {
    response.redirect(result.link)
    //response.send(request.params.code)
    }
})

linksRouter.post('/', async (request, response) => {
    const {mainUrl,shortCode} = request.body

    //console.log(shortCode)
    if(validURL.isUri(mainUrl))
    {
        if(shortCode)
        {

            console.log("User sent a custom code")
            response.status(200).send('Done')
        }

        else{
            try
            {
            console.log('Looks like a proper URI')
            const generatedCode = shortid.generate();
            const thisLink = new Link(
                {
                    link:mainUrl,
                    shortCode:generatedCode
                }
            )
            //console.log('Just before await')
            const savedLink = await thisLink.save()
            //console.log('Just after await')
            response.json(savedLink)
            } catch(exception)
            {
                console.log(exception)
            }
        }
        
        
    }
    else 
    {
        response.send('Not A Valid URI',403)
    }
    //console.log(mainUrl,shortCode)
    //response.sendStatus(200)
})


module.exports = linksRouter