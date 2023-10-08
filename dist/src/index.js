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
app.get("/api/blog-stats", middleware_1.middleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = req;
    const maxTitleLengthBlog = lodash_1.default.maxBy(data.blogs, (b) => b.title.length);
    const titlesContainingPrivacy = lodash_1.default.filter(data === null || data === void 0 ? void 0 : data.blogs, (b) => b.title.includes("Privacy") || b.title.includes("privacy"));
    const uniqueBlogTitles = lodash_1.default.uniqBy(data.blogs, "title");
    res.status(200).send({
        number_of_blogs: data.blogs.length,
        longest_title: Object.assign({}, maxTitleLengthBlog),
        blogs_containing_privacy: titlesContainingPrivacy,
        unique_blog_titles: uniqueBlogTitles.map((a) => a.title),
    });
}));
app.get("/api/blog-search", middleware_1.middleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = req;
    const { query } = req.query;
    const queryResult = lodash_1.default.filter(data === null || data === void 0 ? void 0 : data.blogs, (b) => b.title.toLowerCase().includes(query === null || query === void 0 ? void 0 : query.toString().toLowerCase()));
    res.status(200).send({
        results: queryResult.length != 0 ? queryResult : "Error 404: Not found",
    });
}));
app.listen(3000, () => {
    console.log("Connected to port 3000");
});
//# sourceMappingURL=index.js.map