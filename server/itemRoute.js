const router = require('express').Router();
const ItemModel = require('./itemModel'); 

router.post('/api/item', async(req, res)=> {
    try {
        const model = new ItemModel({
            item: req.body.item,
        })
        const final = await model.save();
        res.status(200).json(final);
        console.log(final);
        
    } catch (error) {
        res.json(error);
        console.log(error);
        
    }
})

router.get('/api/getitems', async(req, res)=> {
    try {
       
        const allitem = await ItemModel.find({});
       
        res.status(200).json(allitem);
       
        console.log(allitem);
       
        
    } catch (error) {
        res.json(error);
        
    }
})

router.put('/api/updateitem/:id', async(req, res)=> {
    try {
        const updateditem = await ItemModel.findByIdAndUpdate(req.params.id, {$set: {item: req.body.item}});
        console.log('update call')
        res.status(200).json(updateditem);
        
    } catch (error) {
        res.json(error);
        
    }
})

router.delete(`/api/deleteitem/:id`, async(req, res)=> {
    try {
        const deleteitem = await ItemModel.findByIdAndDelete(req.params.id);
        res.status(200).json('item Deleted');
        
    } catch (error) {
        res.json(error);
        
    }
})

module.exports = router;
