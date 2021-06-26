const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // 
  try {
    const TagData = await Tag.findAll(
      {
       include: [{ model: Product, through: ProductTag, as: 'products_data' }],
    }
    );
    res.status(200).json(TagData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// GET single tag
router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  //http://localhost:3001/api/tags/3
  try {
    const TagData = await Tag.findByPk(req.params.id, 
      {
      // be sure to include its associated Product data
      include: [{ model: Product, through: ProductTag, as: 'products_data' }],
    }
    );
    if (!TagData) {
      res.status(404).json({ messgae: 'No such tag exists!'});
      return;
    }
    res.status(200).json(TagData);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.post('/', async (req, res) => {
  // create a new tag
  try {
    const TagData = await Tag.create(req.body);
    res.status(200).json(TagData);
  } catch (err) {
    res.status(400).json(err);
  }
});
router.put('/:id', async (req, res) => {
  try {
    const TagData = await Tag.update(req.body, {
      where: { id: req.params.id,}
    });
    if (!TagData){
      res.status(404).json({message: 'No such tag exists!'});
      return;
    }
    res.status(200).json(TagData);
  } catch (err){
    res.status(500).json(err);
  }
});
router.delete('/:id', async (req, res) => {
  // delete tag 
  try {
    const TagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!TagData) {
      res.status(404).json({ message: 'No such tag exists!' });
      return;
    }
    res.status(200).json(TagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
