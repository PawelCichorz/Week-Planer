import bunyan from 'bunyan';

const logger = bunyan.createLogger({
  name: 'myapp',
  level: 'info',
  serializers: bunyan.stdSerializers, 
});

export default logger;