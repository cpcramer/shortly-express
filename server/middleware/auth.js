const models = require('../models');
const Promise = require('bluebird');
const _ = require('lodash')

module.exports.createSession = (req, res, next) => {
  if (_.isEmpty(req.cookies)) {
    models.Sessions.create()
      .then((session) => {
        //console.log(models.Sessions.get({ hash }))
        req.session = session
        console.log(req.session)
      })
      .catch(() => {
        console.log('failed')
      })
  }
  next();
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

