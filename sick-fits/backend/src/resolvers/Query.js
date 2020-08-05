const { forwardTo } = require("prisma-binding");

const Query = {
  // async items(parent, args, ctx, info) {
  //   console.log("getting items");
  //   const items = await ctx.db.query.items();

  //   return items;
  // },

  items: forwardTo("db"),
};

module.exports = Query;
