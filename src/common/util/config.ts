function required(key: string, defaultValue: any | null = 123) {
  const value = process.env[key] || defaultValue;

  if (value === null) {
    throw new Error(`key ${key} is undefined`);
  }

  return value;
}

export const config = () => ({
  db: {
    mongodbURI: required('MONGODB_URI'),
  },
  host: {
    port: parseInt(required('PORT')),
  },
  mode: required('MODE'),
});
