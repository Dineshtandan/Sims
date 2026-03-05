const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

async function runTests() {
    console.log('--- Starting API Tests ---');

    try {
        // 1. Health Check
        const health = await axios.get('http://localhost:5000/');
        console.log('✅ Health Check:', health.data);

        // 2. Admin Login
        console.log('Attempting Admin Login...');
        const loginRes = await axios.post(`${API_URL}/users/login`, {
            email: 'sima@website.com',
            password: 'Sima'
        });
        const token = loginRes.data.token;
        console.log('✅ Login Successful. Token received.');

        // 3. Get Availability
        const availRes = await axios.get(`${API_URL}/bookings/availability`);
        console.log('✅ Get Availability:', Array.isArray(availRes.data) ? `Found ${availRes.data.length} events` : 'Failed');

        // 4. Create a Training Session (Protected)
        console.log('Creating Training Session...');
        const sessionRes = await axios.post(`${API_URL}/training-sessions`, {
            title: 'Test Masterclass',
            date: new Date(Date.now() + 86400000), // tomorrow
            price: 150,
            duration: 120,
            capacity: 10
        }, {
            headers: { 'x-auth-token': token }
        });
        console.log('✅ Training Session Created:', sessionRes.data.title);

        // 5. Create a Booking
        console.log('Creating Booking...');
        const bookingRes = await axios.post(`${API_URL}/bookings`, {
            name: 'John Doe',
            email: 'john@example.com',
            phone: '1234567890',
            date: new Date(Date.now() + 172800000), // day after tomorrow
            service: 'Natural Glow'
        });
        console.log('✅ Booking Created:', bookingRes.data._id);

        // 6. Verify Booking in Admin List (Protected)
        const adminBookings = await axios.get(`${API_URL}/bookings`, {
            headers: { 'x-auth-token': token }
        });
        console.log('✅ Admin Booking Fetch:', adminBookings.data.some(b => b.name === 'John Doe') ? 'Booking found in admin list' : 'Booking NOT found');

        console.log('\n--- All Tests Passed! ---');
    } catch (error) {
        console.error('❌ Test Failed:', error.response ? error.response.data : error.message);
        process.exit(1);
    }
}

runTests();
