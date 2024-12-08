import { z } from "zod";
// import { TRPCError } from "@trpc/server";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  // create: publicProcedure
  //   .input(z.object({ name: z.string().min(1) }))
  //   .mutation(async ({ ctx, input }) => {
  //     try {
  //       return await ctx.db.post.create({
  //         data: {
  //           name: input.name,
  //         },
  //       });
  //     } catch (error) {
  //       throw new TRPCError({
  //         code: "INTERNAL_SERVER_ERROR",
  //         message: "Failed to create post",
  //       });
  //     }
  //   }),

  // getLatest: publicProcedure.query(async ({ ctx }) => {
  //   try {
  //     const post = await ctx.db.post.findFirst({
  //       orderBy: { createdAt: "desc" },
  //     });
  //     return post;
  //   } catch (error) {
  //     throw new TRPCError({
  //       code: "INTERNAL_SERVER_ERROR",
  //       message: "Failed to fetch latest post",
  //     });
  //   }
  // }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
