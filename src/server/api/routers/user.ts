import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
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
            include: {
              likes: true,
              user: true,
            },
          },
          likes: {
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
      return user;
    }),
});
