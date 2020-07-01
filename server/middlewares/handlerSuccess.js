export default async (ctx, next) => {
  ctx.success = (obj) => {
    if (obj && typeof obj.toJSON === 'function') {
      obj = obj.toJSON();
    }

    return Object.assign({
      success: true
    }, obj);
  };

  await next();
};
