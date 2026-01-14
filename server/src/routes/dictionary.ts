import { Router } from 'express';
import { readFileSync } from 'fs';
import { join } from 'path';

const router = Router();
const dataDir = join(__dirname, '../data');

// GET /api/categories
router.get('/categories', (req, res) => {
  try {
    const data = JSON.parse(readFileSync(join(dataDir, 'categories.json'), 'utf-8'));
    res.json(data);
  } catch (error) {
    console.error('Error reading categories:', error);
    res.status(500).json({ error: 'Failed to load categories' });
  }
});

// GET /api/items/:categoryId
router.get('/items/:categoryId', (req, res) => {
  const { categoryId } = req.params;
  try {
    const data = JSON.parse(
      readFileSync(join(dataDir, 'items', `${categoryId}.json`), 'utf-8')
    );
    res.json(data);
  } catch (error) {
    res.status(404).json({ error: 'Category not found', code: 'CATEGORY_NOT_FOUND' });
  }
});

export default router;
