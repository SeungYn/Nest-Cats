function required(key: string, defaultValue: any | null = 123) {
  const value = process.env[key] || defaultValue;

  if (value === null) {
    throw new Error(`key ${key} is undefined`);
  }

  return value;
}

const config = () => ({
  db: {
    mongodbURI: required('MONGODB_URI'),
  },
  host: {
    port: parseInt(required('PORT')),
  },
  mode: required('MODE'),
  swagger: {
    user: required('SWAGGER_USER'),
    password: required('SWAGGER_PASSWORD'),
  },
  jwt: {
    secret: required('JWT_SECRET'),
    expiresIn: required('JWT_EXPIRESIN'),
  },
});

export default config;
