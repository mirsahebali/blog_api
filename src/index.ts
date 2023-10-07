import express from "express";
import _ from "lodash";
import { Data } from "./type";
import { getData } from "./middleware";

const app = express();

app.get("/api/blog-stats", async (__, res) => {
  const get = await getData();
  if (!get.ok || get.status != 200) {
    res.status(500).send({ Error: get.statusText });
  }
  const data = (await get.json()) as Data;

  const maxTitleLengthBlog = _.maxBy(data.blogs, (b) => b.title);
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
});

app.get("/api/blog-search", async (req, res) => {
  const get = await getData();
  if (!get.ok || get.status != 200) {
    res.sendStatus(500).send({ Error: get.statusText });
  }
  const data = (await get.json()) as Data;

  const { query } = req.query;
  const queryResult = _.filter(data?.blogs, (b) =>
    b.title.toLowerCase().includes(query?.toString()!.toLowerCase()!),
  );
  if (queryResult.length === 0) {
    res
      .sendStatus(404)
      .send({ Error: `No blogs found for query: \'${query}\'` });
  }
  res.status(200).send({ results: queryResult });
});
app.listen(3000, () => {
  console.log("Connected to http://localhost:3000");
});
