const handleResponse = (res, data) => res.status(200).send(data);
const handleError = (res, err: any = {}) =>
  res.status(err.status || 500).send({ error: err.message });

module.exports = {
  asyncErrorHandler: (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch((error) => {
      next({ status: 500, message: error.message });
    }),
};
