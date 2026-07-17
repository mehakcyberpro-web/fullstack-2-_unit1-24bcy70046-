import express from "express";
import Post from "../models/Post.js";

const router = express.Router();

const platformLimits = {
  Twitter: 280,
  Facebook: 63206,
  Instagram: 2200,
  LinkedIn: 3000,
};

router.post("/", async (req, res) => {

  const { content, platforms } = req.body;

  if (!content || platforms.length === 0) {
    return res.status(400).json({
      message: "Content and platform are required",
    });
  }

  for (const platform of platforms) {

    if (content.length > platformLimits[platform]) {

      return res.status(400).json({

        message: `${platform} allows only ${platformLimits[platform]} characters.`,

      });

    }

  }

  const post = await Post.create({

    content,

    platforms,

  });

  res.status(201).json({

    message: "Post published successfully",

    post,

  });

});

export default router;