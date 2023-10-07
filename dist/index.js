"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const lodash_1 = __importDefault(require("lodash"));
const middleware_1 = require("./middleware");
const app = (0, express_1.default)();
app.get("/api/blog-stats", (__, res) => __awaiter(void 0, void 0, void 0, function* () {
    const get = yield (0, middleware_1.getData)();
    if (!get.ok || get.status != 200) {
        res.status(500).send({ Error: get.statusText });
    }
    const data = (yield get.json());
    const maxTitleLengthBlog = lodash_1.default.maxBy(data.blogs, (b) => b.title);
    const titlesContainingPrivacy = lodash_1.default.filter(data === null || data === void 0 ? void 0 : data.blogs, (b) => b.title.includes("Privacy") || b.title.includes("privacy"));
    const uniqueBlogTitles = lodash_1.default.uniqBy(data.blogs, "title");
    res.send({
        number_of_blogs: data.blogs.length,
        longest_title: Object.assign({}, maxTitleLengthBlog),
        blogs_containing_privacy: titlesContainingPrivacy,
        unique_blog_titles: uniqueBlogTitles.map((a) => a.title),
    });
    res.send({ Error: "Error while fetching data" });
}));
app.get("/api/blog-search", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const get = yield (0, middleware_1.getData)();
    if (!get.ok || get.status != 200) {
        res.status(500).send({ Error: get.statusText });
    }
    const data = (yield get.json());
    const { query } = req.query;
    const queryResult = lodash_1.default.filter(data === null || data === void 0 ? void 0 : data.blogs, (b) => b.title.toLowerCase().includes(query === null || query === void 0 ? void 0 : query.toString().toLowerCase()));
    if (queryResult.length === 0) {
        res.send({ Error: `No blogs found for query: \'${query}\'` });
    }
    res.send({ results: queryResult });
}));
app.listen(3000, () => {
    console.log("Connected to http://localhost:3000");
});
//# sourceMappingURL=index.js.map