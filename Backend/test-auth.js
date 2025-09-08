// Test auth endpoints
console.log('🧪 Testing auth endpoints...');

// Load the serverless function
let handler;
try {
  handler = require('./api/index.js');
  console.log('✅ Serverless function loaded successfully');
} catch (error) {
  console.error('❌ Failed to load serverless function:', error.message);
  process.exit(1);
}

// Test login endpoint
const testLogin = () => {
  console.log('\n1️⃣ Testing login endpoint...');
  
  const loginReq = {
    method: 'POST',
    url: '/api/v1/auth/login',
    headers: {
      'content-type': 'application/json',
      'origin': 'https://mathematico-frontend.vercel.app'
    },
    body: {
      email: 'dc2006089@gmail.com',
      password: 'Myname*321'
    },
    originalUrl: '/api/v1/auth/login'
  };
  
  const loginRes = {
    status: (code) => {
      console.log(`📋 Login endpoint - Status: ${code}`);
      return loginRes;
    },
    json: (data) => {
      if (data.success) {
        console.log('✅ Login successful');
        console.log('📋 User:', data.user.email);
        console.log('📋 Role:', data.user.role);
        return loginRes;
      } else {
        console.log('❌ Login failed:', data.message);
        return loginRes;
      }
    },
    end: () => { return loginRes; },
    setHeader: () => { return loginRes; },
    getHeader: () => { return undefined; },
    removeHeader: () => { return loginRes; }
  };

  // Mock express.json() middleware
  loginReq.body = JSON.stringify(loginReq.body);
  
  handler(loginReq, loginRes);
};

// Test auth status endpoint
const testAuthStatus = () => {
  console.log('\n2️⃣ Testing auth status endpoint...');
  
  const statusReq = {
    method: 'GET',
    url: '/api/v1/auth/status',
    headers: {
      'authorization': 'Bearer ' + Buffer.from('dc2006089@gmail.com:1234567890').toString('base64'),
      'origin': 'https://mathematico-frontend.vercel.app'
    },
    originalUrl: '/api/v1/auth/status'
  };
  
  const statusRes = {
    status: (code) => {
      console.log(`📋 Auth status endpoint - Status: ${code}`);
      return statusRes;
    },
    json: (data) => {
      if (data.success) {
        console.log('✅ Auth status check successful');
        console.log('📋 User:', data.user.email);
        return statusRes;
      } else {
        console.log('❌ Auth status check failed:', data.message);
        return statusRes;
      }
    },
    end: () => { return statusRes; },
    setHeader: () => { return statusRes; },
    getHeader: () => { return undefined; },
    removeHeader: () => { return statusRes; }
  };

  handler(statusReq, statusRes);
};

// Test CORS headers
const testCORS = () => {
  console.log('\n3️⃣ Testing CORS headers...');
  
  const corsReq = {
    method: 'OPTIONS',
    url: '/api/v1/auth/login',
    headers: {
      'origin': 'https://mathematico-frontend.vercel.app',
      'access-control-request-method': 'POST',
      'access-control-request-headers': 'content-type, authorization'
    },
    originalUrl: '/api/v1/auth/login'
  };
  
  const corsRes = {
    status: (code) => {
      console.log(`📋 CORS preflight - Status: ${code}`);
      return corsRes;
    },
    header: (name, value) => {
      console.log(`📋 CORS Header: ${name} = ${value}`);
      return corsRes;
    },
    end: () => {
      console.log('✅ CORS preflight handled correctly');
      return corsRes;
    },
    json: () => { return corsRes; },
    setHeader: () => { return corsRes; },
    getHeader: () => { return undefined; },
    removeHeader: () => { return corsRes; }
  };

  handler(corsReq, corsRes);
};

// Run all tests
testLogin();
testAuthStatus();
testCORS();

console.log('\n🎉 Auth endpoint tests completed!');
