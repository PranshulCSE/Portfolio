import express from 'express';
import { getPortfolioData } from '../controllers/portfolioController.js';

const router = express.Router();

router.get('/', getPortfolioData);

export default router;
