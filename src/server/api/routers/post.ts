import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const postRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z.object({
        limit: z.number(),
        cursor: z.string().nullish(),
        skip: z.number().optional(),
        sortBy: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { limit, skip, cursor, sortBy } = input;

      let orderBy = {};
      if (sortBy === "old") {
        orderBy = { createdAt: "asc" };
      } else if (sortBy === "top") {
        orderBy = { likes: { _count: "desc" } };
      } else {
        orderBy = { createdAt: "desc" };
      }

      const posts = await ctx.prisma.post.findMany({
        take: limit + 1,
        skip: skip,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy,
        include: {
          user: true,
          likes: true,
        },
      });

      let nextCursor: typeof cursor | undefined = undefined;
      if (posts.length > limit) {
        const nextItem = posts.pop();
        nextCursor = nextItem?.id;
      }

      return { posts, nextCursor };
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

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.post.delete({
        where: {
          id: input.id,
        },
      });
    }),

  updatePinned: protectedProcedure
    .input(z.object({ id: z.string(), pinned: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      if (input.pinned) {
        await ctx.prisma.$transaction(async (prisma) => {
          const existingPinnedPost = await prisma.post.findFirst({
            where: {
              user: {
                id: ctx.session.user.id,
              },
              pinned: true,
            },
          });

          if (existingPinnedPost) {
            await prisma.post.update({
              where: {
                id: existingPinnedPost.id,
              },
              data: {
                pinned: false,
              },
            });
          }

          await prisma.post.update({
            where: {
              id: input.id,
            },
            data: {
              pinned: true,
            },
          });
        });
      } else {
        await ctx.prisma.post.update({
          where: {
            id: input.id,
          },
          data: {
            pinned: false,
          },
        });
      }
    }),

  getById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const post = await ctx.prisma.post.findFirst({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          id: input.id,
        },
        include: {
          user: true,
          likes: true,
        },
      });
      if (!post)
        throw new TRPCError({
          code: "NOT_FOUND",
        });
      return post;
    }),
});
