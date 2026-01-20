import { defineAction } from "astro:actions";
import { z } from "astro/zod";
import { db, eq, Posts } from "astro:db";

export const updatePostLike = defineAction({
  input: z.object({
    postId: z.string(),
    increment: z.number(),
  }),
  handler: async ({ postId, increment }) => {
    const [post] = await db
      .select()
      .from(Posts)
      .where(eq(Posts.id, postId));

    if (!post) {
      await db.insert(Posts).values({
        id: postId,
        title: "Post not found",
        likes: increment,
      });

      return true;
    }

    await db
      .update(Posts)
      .set({
        likes: post.likes + increment,
      })
      .where(eq(Posts.id, postId));

    return true;
  },
});
