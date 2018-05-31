module.exports = function(express) {
  //Create a route
  var router = express.Router();

  //Configure routes
  router.get('/', function(req, res, next) {
    res.status(200).json({"message": "Hello Mag!"});
  });

  return router;
};
