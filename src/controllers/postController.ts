import type { Response } from 'express';
import type { AuthRequest } from '../middlewares/auth.js';
import { prisma } from '../lib/prisma.js';

// GET /api/posts — fetch all posts with author email
export const getPosts = async (req: AuthRequest, res: Response): Promise<void> => {
    const posts = await prisma.post.findMany({
        include: {
            author: {
                select: { email: true },
            },
        },
        orderBy: { createdAt: 'desc' },
    });

    res.json(posts);
};

// GET /api/posts/:id — fetch one post
export const getPost = async (req: AuthRequest, res: Response): Promise<void> => {
    const id = req.params['id'];
    if (!id) {
        res.status(400).json({ message: 'Missing post id' });
        return;
    }

    const post = await prisma.post.findUnique({
        where: { id: Number(id) },
        include: {
            author: {
                select: { email: true },
            },
        },
    });

    if (!post) {
        res.status(404).json({ message: 'Post not found' });
        return;
    }

    res.json(post);
};

// POST /api/posts — create a new post
export const createPost = async (req: AuthRequest, res: Response): Promise<void> => {
    const { title, content } = req.body as { title: string; content: string };

    const post = await prisma.post.create({
        data: {
            title,
            content,
            authorId: req.userId!,
        },
    });

    res.status(201).json(post);
};

// PUT /api/posts/:id — update a post (only by its author)
export const updatePost = async (req: AuthRequest, res: Response): Promise<void> => {
    const id = req.params['id'];
    if (!id) {
        res.status(400).json({ message: 'Missing post id' });
        return;
    }

    // Check post exists
    const post = await prisma.post.findUnique({ where: { id: Number(id) } });
    if (!post) {
        res.status(404).json({ message: 'Post not found' });
        return;
    }

    // Only the author can update
    if (post.authorId !== req.userId) {
        res.status(403).json({ message: 'Forbidden: you are not the author' });
        return;
    }

    const { title, content } = req.body as { title: string; content: string };

    const updated = await prisma.post.update({
        where: { id: Number(id) },
        data: { title, content },
    });

    res.json(updated);
};

// DELETE /api/posts/:id — delete a post (only by its author)
export const deletePost = async (req: AuthRequest, res: Response): Promise<void> => {
    const id = req.params['id'];
    if (!id) {
        res.status(400).json({ message: 'Missing post id' });
        return;
    }

    // Check post exists
    const post = await prisma.post.findUnique({ where: { id: Number(id) } });
    if (!post) {
        res.status(404).json({ message: 'Post not found' });
        return;
    }

    // Only the author can delete
    if (post.authorId !== req.userId) {
        res.status(403).json({ message: 'Forbidden: you are not the author' });
        return;
    }

    await prisma.post.delete({ where: { id: Number(id) } });

    res.json({ message: 'Post deleted successfully' });
};