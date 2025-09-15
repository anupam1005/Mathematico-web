const mysql = require('mysql2/promise');
require('dotenv').config({ path: './config.env' });

async function testSimpleConnection() {
  console.log('🔍 Testing Simple MySQL Connection to Railway...');
  
  const connectionConfig = {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: {
      rejectUnauthorized: false,
    },
    connectTimeout: 60000,
    charset: 'utf8mb4',
    timezone: 'Z'
  };

  try {
    console.log('🔄 Connecting to Railway MySQL...');
    const connection = await mysql.createConnection(connectionConfig);
    
    console.log('✅ Connection successful!');
    
    // Test basic queries
    const [users] = await connection.execute('SELECT COUNT(*) as count FROM users');
    console.log('👥 Users count:', users[0].count);
    
    const [courses] = await connection.execute('SELECT COUNT(*) as count FROM courses');
    console.log('📚 Courses count:', courses[0].count);
    
    const [books] = await connection.execute('SELECT COUNT(*) as count FROM books');
    console.log('📖 Books count:', books[0].count);
    
    const [liveClasses] = await connection.execute('SELECT COUNT(*) as count FROM live_classes');
    console.log('🎓 Live Classes count:', liveClasses[0].count);
    
    await connection.end();
    console.log('✅ Connection closed successfully');
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    process.exit(1);
  }
}

testSimpleConnection();
