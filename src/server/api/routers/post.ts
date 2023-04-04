import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { z } from "zod";

export const postRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(z.object({ limit: z.number() }))
    .query(async ({ ctx, input }) => {
      const posts = await ctx.prisma.post.findMany({
        take: input.limit,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          user: true,
        },
      });
      return posts;
    }),
  create: protectedProcedure
    .input(z.object({ image: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.prisma.post.create({
        data: {
          userId: ctx.session.user.id,
          image: input.image,
        },
      });
      return post;
    }),
});
