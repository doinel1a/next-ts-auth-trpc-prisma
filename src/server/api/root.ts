import { postRouter } from './routers/v1/post';
import { createCallerFactory, createTRPCRouter } from './trpc';

export const appRouter = createTRPCRouter({
  v1: {
    post: postRouter
  }
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
