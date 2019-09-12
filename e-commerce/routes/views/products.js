const express = require('express');
const router = express.Router();
const productsService = require('../../services/products')
const {config} = require('../../config/index')

const cacheResponse = require('../../utils/cacheResponse');
const {FIVE_MINUTES_IN_SECONDS, SIXTY_MINUTES_IN_SECONDS} = require('../../utils/time')

const productService = new productsService()

router.get('/', async function(req, res, next){

    //Intervenimos el req para aplicar el cache
    cacheResponse(res, FIVE_MINUTES_IN_SECONDS)

    const {tags} = req.query;
    try{
        // throw new Error('This is an error')
        const products = await productService.getProducts({tags})
        console.log(config.dev)
        res.render("products", {products, dev: config.dev});
    }catch(err){
        next(err)
    }
})

module.exports = router