const { values } = require("../src/func");
test("memoized the function", async () => {
  console.log(await values());
});
