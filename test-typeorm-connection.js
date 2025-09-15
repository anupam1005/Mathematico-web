const { AppDataSource } = require('./dist/config/data-source');
require('dotenv').config({ path: './config.env' });

async function testTypeORMConnection() {
  console.log('🔍 Testing TypeORM Database Connection...');
  console.log('📊 Connection Details:');
  console.log(`   Host: ${process.env.DB_HOST}`);
  console.log(`   Port: ${process.env.DB_PORT}`);
  console.log(`   Database: ${process.env.DB_DATABASE}`);
  console.log(`   Username: ${process.env.DB_USERNAME}`);
  console.log('');

  try {
    console.log('🔄 Initializing TypeORM DataSource...');
    await AppDataSource.initialize();
    console.log('✅ TypeORM DataSource initialized successfully!');
    
    // Test a simple query
    const result = await AppDataSource.query('SELECT 1 as test, NOW() as currentTime');
    console.log('✅ Test query successful:', result[0]);
    
    // Check if tables exist
    const tables = await AppDataSource.query('SHOW TABLES');
    console.log('📋 Tables in database:', tables.length > 0 ? tables.map(row => Object.values(row)[0]) : 'No tables found');
    
    // Test entity queries
    const userCount = await AppDataSource.query('SELECT COUNT(*) as count FROM users');
    console.log('👥 Users count:', userCount[0].count);
    
    const courseCount = await AppDataSource.query('SELECT COUNT(*) as count FROM courses');
    console.log('📚 Courses count:', courseCount[0].count);
    
    await AppDataSource.destroy();
    console.log('✅ TypeORM DataSource destroyed successfully');
    
  } catch (error) {
    console.error('❌ TypeORM connection failed:');
    console.error('   Error:', error.message);
    console.error('   Stack:', error.stack);
    process.exit(1);
  }
}

// Run the test
testTypeORMConnection();
