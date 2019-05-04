const models = require('../models');
const Promise = require('bluebird');
const _ = require('lodash')

module.exports.createSession = (req, res, next) => {
  req.session = {};
  if (_.isEmpty(req.cookies)) {
    models.Sessions.create()
      .then((session) => {
        return models.Sessions.get({ "id": session.insertId })
      })
      .then((results) => {
        req.session = results
        req.session.hash = results.hash;
        res.cookies['shortlyid'] = { 'value': results.hash }
        next();
      })
      .catch(() => {
        console.log('failed')
        res.send();
        next();
      })
  } else {
    models.Sessions.get({ "hash": req.cookies.shortlyid })
      .then((results) => {
        if (!results) {
          models.Sessions.create()
            .then((session) => {
              return models.Sessions.get({ "id": session.insertId })
            })
            .then((results) => {
              req.session = results
              req.session.hash = results.hash;
              res.cookies['shortlyid'] = { 'value': results.hash }
              next();
            })
            .catch(() => {
              console.log('failed')
              res.send();
              next();
            })
        } else {
          req.session = results
          next();
        }
      })
      .catch(() => {
        console.log('failed')
        res.send();
        next();
      })
    //next();
  }
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

