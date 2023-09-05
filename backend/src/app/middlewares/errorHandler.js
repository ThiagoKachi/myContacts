module.exports = (error, req, res, next) => {
  console.log(error);
  return res.sendStatus(500);
};
