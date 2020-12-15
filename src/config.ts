import * as dotenv from 'dotenv';

dotenv.config();

export default {
  userEndpoint: process.env.USER_ENDPOINT ?? '',
  jaegerHost: process.env.JAEGER_HOST ?? '',
  serviceName: process.env.SERVICE_NAME ?? 'web',
};
