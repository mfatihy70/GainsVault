const logger = (req, res, next) => {
  console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`)
  console.log(`Middleware executed at ${new Date()}`)
  next()
}

export default logger