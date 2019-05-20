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
    migrations: [`${__dirname}/dist/migrations/*{.ts,.js}`,],
    cli: {
        migrationsDir: 'dist/migrations'
    }
};

const devConfig = {
    synchronize: false,
    logging: true,
    entities: [`${__dirname}/src/**/*.entity.ts`],
    migrations: [`${__dirname}/migrations/*{.ts,.js}`,],
    cli: {
        migrationsDir: 'migrations'
    }
};

const envConfig =
    process.env.NODE_ENV === 'production'
        ? prodConfig
        : devConfig;

module.exports = {
  ...envConfig,
  ...baseConfig,
};
