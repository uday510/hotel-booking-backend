const jestMock = require('jest-mock');


exports.mockRequest = () => {
  const req = {};
  req.body = jestMock.fn().mockReturnValue(req);
  req.params = jestMock.fn().mockReturnValue(req);

  return req;
}

exports.mockResponse = () => {
  const res = {};
  res.status = jestMock.fn().mockReturnValue(res);
  res.json = jestMock.fn().mockReturnValue(res);
  res.send = jestMock.fn().mockReturnValue(res);

  return res;
}