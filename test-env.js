require('dotenv').config({ path: './config.env' });

console.log('🔍 Testing Environment Variables...');
console.log('');

console.log('📊 Database Configuration:');
console.log(`   DB_HOST: ${process.env.DB_HOST}`);
console.log(`   DB_PORT: ${process.env.DB_PORT}`);
console.log(`   DB_DATABASE: ${process.env.DB_DATABASE}`);
console.log(`   DB_USERNAME: ${process.env.DB_USERNAME}`);
console.log(`   DB_PASSWORD: ${process.env.DB_PASSWORD ? '***' : 'NOT SET'}`);
console.log('');

console.log('🔐 JWT Configuration:');
console.log(`   JWT_SECRET: ${process.env.JWT_SECRET ? '***' : 'NOT SET'}`);
console.log(`   JWT_REFRESH_SECRET: ${process.env.JWT_REFRESH_SECRET ? '***' : 'NOT SET'}`);
console.log('');

console.log('💳 Payment Configuration:');
console.log(`   RAZORPAY_KEY_ID: ${process.env.RAZORPAY_KEY_ID || 'NOT SET'}`);
console.log(`   RAZORPAY_KEY_SECRET: ${process.env.RAZORPAY_KEY_SECRET ? '***' : 'NOT SET'}`);
console.log('');

console.log('🌐 Server Configuration:');
console.log(`   PORT: ${process.env.PORT}`);
console.log(`   NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`   BACKEND_URL: ${process.env.BACKEND_URL}`);
console.log(`   FRONTEND_URL: ${process.env.FRONTEND_URL}`);
console.log('');

console.log('✅ Environment variables loaded successfully!');
