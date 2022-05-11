import { Sequelize } from 'sequelize';
import pg from 'pg';

const env = 'development';
const config = require('../../config/config.json')[env];

export class Database {

  public static sequelize: Sequelize;

  public static get() {
    if (!Database.sequelize) {
      Database.initialize();
    }
    return Database.sequelize;
  }

  public static initialize() {
    console.log('database starting');
    if (!Database.sequelize) {
      try {
        console.log('database pool connection');
        Database.doInstance();
      } catch (err) {
        console.log('Database connection error!');
        console.log(err);
      }
    }
  }

  private static doInstance() {
    Database.sequelize = new Sequelize(
      process.env.DATABASE_NAME || config.database,
      process.env.DATABASE_USERNAME || config.username,
      process.env.DATABASE_PASSWORD || config.password,
      {
        host: process.env.DATABASE_HOST || config.host,
        dialect: 'postgres',
        dialectModule: pg,
        database: process.env.DATABASE_NAME || config.database,
        logging: !process.env.PRODUCTION,
        logQueryParameters: !process.env.PRODUCTION
      }
    );
  }
}
