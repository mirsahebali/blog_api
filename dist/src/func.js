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
exports.values = void 0;
const lodash_1 = __importDefault(require("lodash"));
function getData() {
    return __awaiter(this, void 0, void 0, function* () {
        const headers = {
            "x-hasura-admin-secret": "32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6",
        };
        try {
            const response = yield fetch("https://intent-kit-16.hasura.app/api/rest/blogs", {
                method: "GET",
                headers: headers,
            });
            if (response.status != 200 || !response.ok) {
                return response.statusText;
            }
            return (yield response.json());
        }
        catch (error) {
            throw new Error(error);
        }
    });
}
exports.values = lodash_1.default.memoize(getData);
//# sourceMappingURL=func.js.map