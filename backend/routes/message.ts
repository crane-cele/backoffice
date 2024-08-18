import { Router } from 'express';
import { create, readAll, update, remove } from '../controllers/MessageController';
import { verifyToken } from '../utils/auth';

const router = Router();

router.post('/', verifyToken, create);
router.get('/', verifyToken, readAll);
router.put('/:id', verifyToken, update);
router.delete('/:id', verifyToken, remove);

export default router;