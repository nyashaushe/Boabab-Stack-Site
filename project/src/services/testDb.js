import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Log the environment variables (without the password)
console.log('Database Configuration:');
console.log('Host:', process.env.DATABASE_HOST);
console.log('Port:', process.env.DATABASE_PORT);
console.log('Database:', process.env.DATABASE_NAME);
console.log('Username:', process.env.DATABASE_USERNAME);

const pool = new Pool({
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT || '5432'),
  database: 'baobab_stack',  // Using a simpler database name
  user: 'baobabstack',
  password: 'Nyashaushe@2399'
});

async function testConnection() {
  try {
    const client = await pool.connect();
    console.log('Successfully connected to the database!');
    
    // Test a simple query
    const result = await client.query('SELECT NOW()');
    console.log('Current database time:', result.rows[0].now);
    
    // List all databases
    const databases = await client.query('SELECT datname FROM pg_database');
    console.log('\nAvailable databases:');
    databases.rows.forEach(db => console.log('-', db.datname));
    
    client.release();
  } catch (error) {
    console.error('Error connecting to the database:', error);
  } finally {
    await pool.end();
  }
}

testConnection(); 