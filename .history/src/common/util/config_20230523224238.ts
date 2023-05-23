function required(key: string, defaultValue: any | null = null) {
  const value = process.env[key] || defaultValue;

  if (value === null) {
    throw new Error(`key ${key} is undefined`);
  }

  return value;
}

export const config = {
  db: {
    mongodbURI: required('MONGODB_URI'),
  },
};
