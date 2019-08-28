const express = require('express');
const router = express.Router();
const productsService = require('../../services/products')
const {config} = require('../../config/index')

const productService = new productsService()

router.get('/', async function(req, res, next){
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