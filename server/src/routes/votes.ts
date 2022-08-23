import { Request, Response, Router } from "express";
import userMiddleWare from '../middlewares/user';
import authMiddleWare from '../middlewares/auth';
import { User } from "../entities/User";
import Post from "../entities/Post";
import Vote from "../entities/Vote";
import Comment from "../entities/Comment";


const vote = async (req:Request, res:Response) => {
  const { identifier, slug, commentIdentifier, value } = req.body;
  // Check if value only comes -1, 0, 1
  if(![-1, 0 ,1].includes(value)) {
      return res.status(400).json({ value: "Can only be -1, 0 ,1."});
  }

  try {
      const user: User = res.locals.user;
      let post: Post = await Post.findOneByOrFail({ identifier, slug});
      let vote: Vote | undefined;
      let comment: Comment;

          if(commentIdentifier) {
              // Find vote by comment identifier
              comment = await Comment.findOneByOrFail({ identifier: commentIdentifier});
              vote = await Vote.findOneBy({ username: user.username, commentId: comment.id});
          } else {
              // Find vote by post
              vote = await Vote.findOneBy({ username: user.username, postId: post.id});
          }

          if(!vote && value === 0 ) {
              // return error when both no vote and 0 value.
              return res.status(404).json({ error: "Cannot find Vote."});
          } else if( !vote) {
              vote = new Vote();
              vote.user = user;
              vote.value = value;

              // vote in Post OR vote in Comment
              if(comment) vote.comment = comment
              else vote.post = post;
              await vote.save();
          } else if(value === 0) {
              vote.remove();
          } else if ( vote.value !== value) {
              vote.value = value;
              await vote.save();
          }

          post = await Post.findOneOrFail({
              where: {
                  identifier, slug
              }, 
              relations: ["comments", "comments.votes", "sub", "votes"]
          })

          post.setUserVote(user);
          post.comments.forEach(c => c.setUserVote(user));

          return res.json(post);
  } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Something went wrong in votes.ts."})
  }
}

const router = Router();
router.post("/", userMiddleWare, authMiddleWare, vote);
export default router;