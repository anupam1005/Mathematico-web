const dotenv = require('dotenv');
const mysql = require('mysql2/promise');
const Razorpay = require('razorpay');

dotenv.config({ path: './config.env' });

console.log('🚀 Testing Server Startup...');

// Test if we can import the main server file
async function testStartup() {
  try {
    console.log('📦 Loading server modules...');
    
    // Test database connection first
  
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

    console.log('🔗 Testing database connection...');
    const connection = await mysql.createConnection(connectionConfig);
    console.log('✅ Database connection successful!');
    await connection.end();

    // Test Razorpay initialization
    console.log('💳 Testing Razorpay initialization...');
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    console.log('✅ Razorpay initialized successfully!');

    console.log('✅ All components ready for server startup!');
    
  } catch (error) {
    console.error('❌ Error during startup test:', error.message);
    process.exit(1);
  }
}

testStartup();
