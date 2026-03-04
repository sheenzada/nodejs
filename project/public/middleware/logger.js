// سادہ لاگر middleware
const logger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();  // اگلے middleware یا روٹ پر جانے کے لیے ضروری
};

module.exports = logger;