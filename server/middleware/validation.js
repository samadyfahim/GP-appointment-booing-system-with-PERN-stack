// for all post

const validateHasParameters = (...args) => {
  return (req, res, next) => {
    const body = req.body;
    let valid = true;

    for (const arg of args) {
      if (body[arg] === undefined) {
        res.status(403).json({ error: arg + " not specified" });
        valid = false;
        break;
      }
    }
    if (valid) {
      next();
    }
  };
};

// these will use for user regestration if i have implemented.
const validatePasswordLength = (req, res, next) => {
  const { password } = req.body;
  if (!!password && password.length > 7) {
    next();
  } else {
    res.status(403).json({ error: "The password provided is not valid" });
  }
};

const validateEmailFormat = (req, res, next) => {
  const { email } = req.body;
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!!email && re.test(String(email).toLowerCase())) {
    next();
  } else {
    res.status(403).json({ error: "The email provided is not valid" });
  }
};

module.exports = {
  validateHasParameters,
  validatePasswordLength,
  validateEmailFormat,
};
