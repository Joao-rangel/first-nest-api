module.exports = [
  {
    name: 'default',
    type: 'mysql',
    url: process.env.DATABASE_URL,
    entities: ['./dist/**/*.entity{.ts,.js}'],
    migrations: ['./dist/migrations/*{.ts,.js}'],
    cli: {
      migrationsDir: './src/migrations',
    },
    synchronize: process.env.NODE_ENV === 'development' ? true : false,
  },
];
