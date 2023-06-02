module.exports = {
  asyncErrorHandler: (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch((error) => {
      next({ status: 500, message: error.message });
    }),
};
