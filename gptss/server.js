// Import dependencies
const http = require('http');

// Define the port number
const port = process.env.PORT || 3000;

// Create a simple request handler function
const requestHandler = (req, res) => {
    // Set headers for JSON response
    res.setHeader('Content-Type', 'application/json');

    // Handle GET request
    if (req.method === 'GET' && req.url === '/') {
        res.statusCode = 200;
        res.end(JSON.stringify({ message: 'Hello World!' }));
    }

    // Handle POST request to /data endpoint
    else if (req.method === 'POST' && req.url === '/data') {
        let data = '';

        req.on('data', chunk => {
            data += chunk;
        });

        req.on('end', () => {
            try {
                const jsonData = JSON.parse(data);
                console.log('Received data:', jsonData);
                res.statusCode = 200;
                res.end(JSON.stringify({ status: 'success', data: jsonData }));
            } catch (error) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'Invalid JSON' }));
            }
        });
    }

    // Handle unsupported routes or methods
    else {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: 'Not Found' }));
    }
};

// Create a server instance and start listening on the specified port
const server = http.createServer(requestHandler);
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
