function createUserSession(req, user, action) {
  // __id is the mongodb identifier
  console.log(req.session);
  req.session.uid = user._id.toString();
  //action is the anonymous function in the auth contoller
  req.session.save(action);
}

function destroyUserAuthSession(req) {
  req.session.uid = null;
}

module.exports = {
  createUserSession: createUserSession,
  destroyUserAuthSession: destroyUserAuthSession,
};
