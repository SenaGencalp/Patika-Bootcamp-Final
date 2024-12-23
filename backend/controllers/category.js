const categoryService = require('../services/category');

const createCategory = async (req, res) => {
  const { categoryName } = req.body;
  try {
    const category = await categoryService.createCategory(categoryName);
    return res.status(201).json({ message: 'Category created successfully', category });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await categoryService.getCategories();
    return res.status(200).json({ categories });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const getCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await categoryService.getCategoryById(id);
    return res.status(200).json({ category });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { categoryName } = req.body;
  try {
    const updatedCategory = await categoryService.updateCategory(id, categoryName);
    return res.status(200).json({ message: 'Category updated successfully', updatedCategory });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCategory = await categoryService.deleteCategory(id);
    return res.status(200).json({ message: 'Category deleted successfully', deletedCategory });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
