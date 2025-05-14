import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

async function createDatabase() {
  // Connect to default postgres database first
  const pool = new Pool({
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '5432'),
    database: 'postgres', // Connect to default postgres database
    user: process.env.DATABASE_USERNAME || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'postgres'
  });

  try {
    // Check if database exists
    const checkDb = await pool.query(
      "SELECT 1 FROM pg_database WHERE datname = $1",
      [process.env.DATABASE_NAME || 'baobab_stack']
    );

    if (checkDb.rows.length === 0) {
      // Create database if it doesn't exist
      await pool.query(
        `CREATE DATABASE ${process.env.DATABASE_NAME || 'baobab_stack'}`
      );
      console.log('Database created successfully!');
    } else {
      console.log('Database already exists.');
    }

    // Close the connection to postgres database
    await pool.end();

    // Connect to the new database to verify
    const newPool = new Pool({
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT || '5432'),
      database: process.env.DATABASE_NAME || 'baobab_stack',
      user: process.env.DATABASE_USERNAME || 'postgres',
      password: process.env.DATABASE_PASSWORD || 'postgres'
    });

    // Test the connection
    const result = await newPool.query('SELECT NOW()');
    console.log('Successfully connected to new database!');
    console.log('Current database time:', result.rows[0].now);

    await newPool.end();

  } catch (error) {
    console.error('Error creating database:', error);
  }
}

createDatabase(); 