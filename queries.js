var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://10.254.144.101:5432/sustainability';
var db = pgp(connectionString);

// query functions
function getBackedScans(req, res, next) {
    db.any('select * from member').then(function (data) {
        res.status(200).json({
            status: 'success',
            data: data,
            message: 'Retrieved ALL Backed up Scans'
        });
    }).catch(function (err) {
        return next(err);
    });
};

function getSingleUser(req, res, next) {
  var ID = parseInt(req.params.id);
  db.one('select * from member where id = $1', ID).then(function (data) {
        res.status(200).json({
            status: 'success',
            data: data,
            message: 'Retrieved ONE user'
        });
    }).catch(function (err) {
        return next(err);
    });
};

function createUser(req, res, next){
    db.none('insert into member(token, name, created, auth)' +
        'values(${token}, ${name}, current_timestamp, ${auth})',
      req.body).then(function () {
          res.status(200).json({
              status: 'success',
              message: 'Inserted one user'
          });
      })
      .catch(function (err) {
          return next(err);
    });
};

function createScan(req, res, next){
    db.none('insert into scan(token, created, location, type)' +
        'values(${token}, ${created}, ${location}, ${type})',
      req.body).then(function () {
          res.status(200).json({
              status: 'success',
              message: 'Inserted one scan'
          });
      })
      .catch(function (err) {
          return next(err);
    });
};

function updateUser(req, res, next) {
    db.none('update member set name=$1 where token=$2',
     [req.body.name, req.params.id]).then(function () {
        res.status(200).json({
            status: 'success',
            message: 'Updated name'
        });
    })
    .catch(function (err) {
        return next(err);
    });
};

function removeUser(req, res, next) {
  var ID = req.params.id;
  db.result('delete from member where id = $1', ID).then(function (result) {
      /* jshint ignore:start */
      res.status(200).json({
          status: 'success',
          message: 'Removed ${result.rowCount} user'
      });
      /* jshint ignore:end */
  })
  .catch(function (err) {
      return next(err);
  });
};

module.exports = {
  getBackedScans: getBackedScans,
  getSingleUser: getSingleUser,
  createUser: createUser,
  createScan: createScan,
  updateUser: updateUser,
  removeUser: removeUser
};
