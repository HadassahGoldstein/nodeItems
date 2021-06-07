const router = require('express').Router();
const categoriesDb = require('../db/categories');

router.get('/', async (req, res) => {
    const categories = await categoriesDb.getCategories();
    res.render('categories/index', { categories });
});
router.get('/newCategory', async (req, res) => {
    res.render('categories/newCategory');
})
router.get('/editCategory', async (req, res) => {
    const category = await categoriesDb.getById(req.query.id);
    res.render('categories/editCategory', { category });
})
router.post('/addCategory', async (req, res) => {
    await categoriesDb.addCategory(req.body);
    res.redirect('/categories');
})
router.post('/updateCategory', async (req, res) => {
    await categoriesDb.updateCategory(req.body);
    res.redirect('/categories');
})
module.exports = router;