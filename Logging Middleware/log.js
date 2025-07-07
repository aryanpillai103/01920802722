const fs = require('fs');
const path = require('path');
const { format } = require('date-fns');

// Create logs directory if it doesn't exist
const logDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Current date for log file naming
const currentDate = format(new Date(), 'yyyy-MM-dd');
const logFilePath = path.join(logDir, `${currentDate}.log`);

// Log levels
const LOG_LEVELS = {
  ERROR: 'ERROR',
  WARN: 'WARN',
  INFO: 'INFO',
  DEBUG: 'DEBUG'
};

// Simple logger object
const logger = {
  // Write log to file and console
  _writeLog: (level, message) => {
    const timestamp = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
    const logMessage = `[${timestamp}] [${level}] ${message}\n`;
    
    // Console output (colorized)
    const colors = {
      ERROR: '\x1b[31m', // Red
      WARN: '\x1b[33m',  // Yellow
      INFO: '\x1b[32m',  // Green
      DEBUG: '\x1b[36m'  // Cyan
    };
    console.log(`${colors[level]}${logMessage}\x1b[0m`);
    
    // File output
    fs.appendFile(logFilePath, logMessage, (err) => {
      if (err) console.error('Failed to write to log file:', err);
    });
  },

  // Log methods
  error: (message) => logger._writeLog(LOG_LEVELS.ERROR, message),
  warn: (message) => logger._writeLog(LOG_LEVELS.WARN, message),
  info: (message) => logger._writeLog(LOG_LEVELS.INFO, message),
  debug: (message) => logger._writeLog(LOG_LEVELS.DEBUG, message),

  // Simple middleware for Express
  middleware: (req, res, next) => {
    const start = Date.now();
    
    res.on('finish', () => {
      const duration = Date.now() - start;
      logger.info(`${req.method} ${req.originalUrl} - ${res.statusCode} (${duration}ms)`);
    });
    
    next();
  }
};

module.exports = logger;