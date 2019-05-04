const parseCookies = (req, res, next) => {
  let obj = {};
  if (req.headers.cookie) {
    let cookiesString = req.headers.cookie.replace(/\s/g, '')
    let cookies = cookiesString.split(/=|;/)
    for (let i = 0; i < cookies.length; i += 2) {
      obj[cookies[i]] = cookies[i + 1];
    }
    req.cookies = obj;
    res.send(obj);
  } else {
    req.cookies = obj;
    res.send(obj)
  };
  req.cookies = obj;
  res.send(obj);
  next();
};



module.exports = parseCookies;