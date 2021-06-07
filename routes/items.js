const router=require('express').Router();
const toDoItemsDb=require('../db/items');
const categoriesDb=require('../db/categories');

router.get('/',async (req,res)=>{
    const items=await toDoItemsDb.getToDoItems();
    res.render('items/index',{items});
});
router.get('/completedItems',async(req,res)=>{
    const items=await toDoItemsDb.getCompletedItems();
    res.render('items/completedItems',{items});
})
router.get('/getByCategory',async(req,res)=>{
    const items=await toDoItemsDb.getItemsForCategory(req.query.id);
    res.render('items/itemsByCat',{items});
})
router.get('/newItem',async (req,res)=>{
    const categories=await categoriesDb.getCategories();
    res.render('items/newItem',{categories});
})
router.post('/addItem',async(req,res)=>{
    await toDoItemsDb.addItem(req.body);
    res.redirect('/items/');
})
router.post('/markAsCompleted',async(req,res)=>{
    await toDoItemsDb.markAsCompleted(req.body.id);
    res.redirect('/items/');
})
module.exports=router;