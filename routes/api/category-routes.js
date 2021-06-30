const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async(req, res) => {
  // grabs all categories shirts, shorts, music etc...
  // http://localhost:3001/api/categories
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
} catch (err) {
    res.status(500).json(err);
}
});

router.get('/:id', async(req, res) => {
  // grabs music...!
  // http://localhost:3001/api/categories/3
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product, }]
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No such category exists!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.post('/', async (req, res) => {
  // create a new category
  try{
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err){
    res.status(400).json(err);
  }
});
router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update(req.body, {
      where: { id: req.params.id,}
    });
    if (!categoryData){
      res.status(404).json({message: 'No such category exists!'});
      return;
    }
    res.status(200).json(categoryData);
  }catch (err){
    res.status(500).json(err);
  }
});
router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try{
    const categoryData = await Category.destroy({
      where: { id: req.params.id}
    });
    if (!categoryData){
      res.status(404).json({message: 'No such category exists!'});
      return;
    }
    res.status(200).json(categoryData);
  }catch (err){
    res.status(500).json(err);
  }
});





module.exports = router;
