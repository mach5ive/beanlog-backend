import { Router } from "express";
import * as beanCtrl from '../controllers/bean.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.post('/', authMiddleware, beanCtrl.createBean);
router.get('/', authMiddleware, beanCtrl.getBeans);
router.put('/:id', authMiddleware, beanCtrl.updateBean);
router.delete('/:id', authMiddleware, beanCtrl.deleteBean);

export default router;