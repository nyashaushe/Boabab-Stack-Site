import { query, closePool } from './database.js';

async function testConnection() {
  try {
    // Test basic connection
    const result = await query('SELECT NOW()');
    console.log('Database connection successful!');
    console.log('Current database time:', result.rows[0].now);

    // Test database version
    const version = await query('SELECT version()');
    console.log('PostgreSQL version:', version.rows[0].version);

    // List all databases
    const databases = await query('SELECT datname FROM pg_database');
    console.log('\nAvailable databases:');
    databases.rows.forEach(db => console.log('-', db.datname));

    // List all tables in current database
    const tables = await query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    console.log('\nTables in current database:');
    tables.rows.forEach(table => console.log('-', table.table_name));

  } catch (error) {
    console.error('Database connection test failed:', error);
  } finally {
    await closePool();
  }
}

testConnection(); 