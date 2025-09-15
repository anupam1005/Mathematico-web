// Test script to verify all API routes are working
const https = require('https');

const BASE_URL = 'https://mathematico-backend-new.vercel.app';

// Test function
async function testRoute(endpoint, expectedStatus = 200) {
  return new Promise((resolve) => {
    const url = `${BASE_URL}${endpoint}`;
    console.log(`Testing: ${url}`);
    
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          console.log(`✅ ${endpoint} - Status: ${res.statusCode}`);
          console.log(`   Response: ${JSON.stringify(jsonData).substring(0, 100)}...`);
          resolve({ success: true, status: res.statusCode, data: jsonData });
        } catch (e) {
          console.log(`❌ ${endpoint} - Status: ${res.statusCode} - Parse Error`);
          console.log(`   Response: ${data.substring(0, 100)}...`);
          resolve({ success: false, status: res.statusCode, data });
        }
      });
    }).on('error', (err) => {
      console.log(`❌ ${endpoint} - Error: ${err.message}`);
      resolve({ success: false, error: err.message });
    });
  });
}

// Test all routes
async function runTests() {
  console.log('🚀 Testing Mathematico API Routes...\n');
  
  const routes = [
    '/api/v1',
    '/api/v1/health',
    '/api/v1/courses',
    '/api/v1/books',
    '/api/v1/live-classes',
    '/api/v1/auth/login',
    '/api/v1/users',
    '/api/v1/admin/dashboard'
  ];
  
  const results = [];
  
  for (const route of routes) {
    const result = await testRoute(route);
    results.push({ route, ...result });
    console.log(''); // Empty line for readability
  }
  
  // Summary
  console.log('📊 Test Summary:');
  const successful = results.filter(r => r.success).length;
  const total = results.length;
  console.log(`✅ Successful: ${successful}/${total}`);
  console.log(`❌ Failed: ${total - successful}/${total}`);
  
  if (successful === total) {
    console.log('\n🎉 All API routes are working correctly!');
  } else {
    console.log('\n⚠️  Some routes need attention.');
  }
}

runTests().catch(console.error);
