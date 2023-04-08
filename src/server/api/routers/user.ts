import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const userRouter = createTRPCRouter({
  getById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findFirst({
        where: {
          id: input.id,
        },
        select: {
          id: true,
          createdAt: true,
          name: true,
          image: true,
          posts: {
            orderBy: {
              createdAt: "desc",
            },
            include: {
              likes: true,
              user: true,
            },
          },
          likes: {
            orderBy: {
              createdAt: "desc",
            },
            include: {
              post: {
                include: {
                  user: true,
                  likes: true,
                },
              },
            },
          },
        },
      });

      if (!user)
        throw new TRPCError({
          code: "NOT_FOUND",
        });
      return user;
    }),
});
