// const catchAsync = (fn) => {
//   return (req, res, next) => {
//     fn(req, res, next).catch((err) => next(err));
//   };
// };

// module.exports = catchAsync;

module.exports = (fn) => (req, res, next) => {
  fn(req, res, next).catch(next);
};
