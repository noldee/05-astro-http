import { getGreeting } from "./greetings/get-greetings.action";
import { getPostLikes } from "./posts/get-posts-likes.action";
import { updatePostLike } from "./posts/update-likes.actions";

export const server = {
  getGreeting,

  // posts
  getPostLikes,
  updatePostLike,
};
