const dotenv = require('dotenv');
const path = require('path');
const dns = require('dns');

// Path to .env
const envPath = path.resolve(__dirname, 'server', '.env');
console.log('Loading .env from:', envPath);

const result = dotenv.config({ path: envPath, override: true });
if (result.error) {
    console.error('Error loading .env file:', result.error.message);
}

console.log('--- ENVIRONMENT DIAGNOSTIC ---');
const uri = process.env.MONGO_URI;
if (uri) {
    console.log('MONGO_URI found.');
    const masked = uri.replace(/:([^@]+)@/, ':****@');
    console.log('Masked URI:', masked);

    // Check for "sima" in the URI
    if (uri.includes('sima')) {
        console.log('!! WARNING: URI contains "sima" !!');
    }
} else {
    console.log('MONGO_URI NOT FOUND in process.env');
}

// Check DNS resolution for the Atlas host
const host = 'makeup.3anoac1.mongodb.net';
console.log(`Checking DNS for ${host}...`);
dns.resolveSrv(`_mongodb._tcp.${host}`, (err, addresses) => {
    if (err) {
        console.error('DNS SRV Resolution Failed:', err.message);
    } else {
        console.log('DNS SRV Resolution Success:', addresses);
    }
});
