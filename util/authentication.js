function createUserSession(req, user, action) {
  // __id is the mongodb identifier
  req.session.uid = user._id.toString();

  req.session.isAdmin = user.isAdmin;

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
