import { Router } from 'express';
import {
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost,
} from '../controllers/postController.js';
import { protect } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import {createPostSchema} from '../validators/postSchemas.js';

const router = Router();

router.get('/', protect, getPosts);
router.get('/:id', protect, getPost);
router.post('/', protect, validate(createPostSchema), createPost);
router.put('/:id', protect, updatePost);
router.delete('/:id', protect, deletePost);

export default router;