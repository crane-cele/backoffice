import { Router } from 'express';
import { create, readAll, update, remove, addUser, removeUser } from '../controllers/SegmentController';
import { verifyToken } from '../utils/auth';

const router = Router();

router.post('/', verifyToken, create);
router.get('/', verifyToken, readAll);
router.put('/:id', verifyToken, update);
router.delete('/:id', verifyToken, remove);
router.post('/:id/users', verifyToken, addUser);
router.delete('/:id/users/:userId', verifyToken, removeUser);

export default router;