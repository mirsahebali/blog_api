import express, { Request } from "express";
import _ from "lodash";
import { Data } from "./type";
import { middleware } from "./middleware";

const app = express();
app.get(
  "/api/blog-stats",
  middleware,
  async (req: Request & { data?: Data }, res) => {
    const { data } = req;
    const maxTitleLengthBlog = _.maxBy(data.blogs, (b) => b.title.length);
    const titlesContainingPrivacy = _.filter(
      data?.blogs,
      (b) => b.title.includes("Privacy") || b.title.includes("privacy"),
    );
    const uniqueBlogTitles = _.uniqBy(data.blogs, "title");
    res.status(200).send({
      number_of_blogs: data.blogs.length,
      longest_title: { ...maxTitleLengthBlog },
      blogs_containing_privacy: titlesContainingPrivacy,
      unique_blog_titles: uniqueBlogTitles.map((a) => a.title),
    });
  },
);

app.get(
  "/api/blog-search",
  middleware,
  async (req: Request & { data?: Data }, res) => {
    const { data } = req;
    const { query } = req.query;
    const queryResult = _.filter(data?.blogs, (b) =>
      b.title.toLowerCase().includes(query?.toString()!.toLowerCase()!),
    );

    res.status(200).send({
      results: queryResult.length != 0 ? queryResult : "Error 404: Not found",
    });
  },
);

app.listen(3000, () => {
  console.log("Connected to port 3000");
});
