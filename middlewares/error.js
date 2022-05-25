module.exports = (err, _req, res, _next) => {
  if (err.code) {
    const status = err.code || 500;

    return res.status(status).json({ message: err.message });
  }

  console.error(err);
  return res.status(500).json({ error: { code: 'internal', message: 'Internal server error' } });
};