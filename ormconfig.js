const baseConfig = {
  type: 'mysql',
  port: 3306,
  host: process.env.hostDB,
  username: process.env.usernameDB,
  password: process.env.passwordDB,
  database: process.env.nameDB,
};

const prodConfig = {
  synchronize: false,
  logging: false,
  entities: [`${__dirname}/dist/**/*.entity{.ts,.js}`],
};

const devConfig = {
    synchronize: true,
    logging: true,
    entities: [`${__dirname}/src/**/*.entity.ts`],
};

const envConfig =
    process.env.NODE_ENV === 'production'
        ? prodConfig
        : devConfig;

module.exports = {
  ...envConfig,
  ...baseConfig,
};
