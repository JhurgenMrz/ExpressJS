const express = require('express')
const passport = require('passport')
const router = express.Router();
const ProductsService = require('../../services/products')
const {
    productIdSchema,
    updateProductSchema,
    createProductSchema,
    productTagSchema } = require('../../utils/schemas/products')
const validation = require('../../utils/middlewares/validationHandler')

const cacheResponse = require('../../utils/cacheResponse');
const {FIVE_MINUTES_IN_SECONDS, SIXTY_MINUTES_IN_SECONDS} = require('../../utils/time')

// JWT
require('../../utils/auth/strategies/jwt');



function productsApi(app){
    const router = express.Router();
    app.use("/api/products", router);
    const productsService = new ProductsService();




router.get('/', async function(req, res,next){

    cacheResponse(res, FIVE_MINUTES_IN_SECONDS);

    const {tags} = req.query;
    try{
        // throw new Error('This is an error from the API');
        const products = await productsService.getProducts({tags})
        res.status(200).json({
        data: products,
        message: "products listed"
        })
    }catch(err){
        next(err)
    }
    
})

router.get('/:productId',async function(req, res, next ){

    cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);
    const {productId} = req.params;

    try{
        const product = await productsService.getProduct({productId})
        res.status(200).json({
        data: product,
        message: "products retrieved"
    })
    }catch(err){
        next(err)
    }
})

router.post('/', validation(createProductSchema), async function(req, res){
    const { body: product} = req;


    try{
        const CreatedProduct = await productsService.createProduct({product})
        res.status(201).json({
            data: CreatedProduct,
            message: "products listed"
        })
    }catch(err){
        next(err)
    }
})

router.put('/:productId', passport.authenticate("jwt", {session: false}),
validation({ productId: productIdSchema}, "params"), validation(updateProductSchema), async function(req, res){
    const {productId} = req.params; 
    const {body: product} = req;

    try{
    const updateProduct = await productsService.updateProduct({productId, product})
    res.status(200).json({
        data: updateProduct,
        message: "products updated"
    })
    }catch(err){
        next(err)
    }
})

router.delete('/:productId',passport.authenticate("jwt", {session: false}),
async function(req, res){
    const {productId} = req.params;

    try{
        const product = await productsService.deleteProduct({productId})
        res.status(200).json({
        data: product,
        message: "products deleted"
    })
    }catch(err){
        next(err)
    }
    
})

}


module.exports = productsApi;