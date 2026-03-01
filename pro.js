const http = require('http');
const fs = require('fs');
const path = require('path');
const { EventEmitter } = require('events');

// --- INITIALIZATION ---
const PORT = 8080;
const DB_PATH = path.join(__dirname, 'database.json');
const eventTracker = new EventEmitter();

// Ensure Database exists
if (!fs.existsSync(DB_PATH)) fs.writeFileSync(DB_PATH, JSON.stringify({ users: [], posts: [] }));

// --- CUSTOM MIDDLEWARE & EVENTS ---
eventTracker.on('log', (msg) => {
    const logEntry = `[${new Date().toISOString()}] ${msg}\n`;
    fs.appendFile('activity.log', logEntry, (err) => { if (err) console.error(err); });
});

// --- CORE UTILITIES ---
const sendJSON = (res, status, data) => {
    res.writeHead(status, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
};

// --- THE SERVER ---
const server = http.createServer((req, res) => {
    const { method, url: reqUrl } = req;
    eventTracker.emit('log', `${method} request to ${reqUrl}`);

    // 1. HOME ROUTE (Modern HTML Dashboard)
    if (reqUrl === '/' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <body style="font-family: 'Segoe UI', sans-serif; background: #f0f2f5; padding: 40px;">
                <div style="max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 12px; shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    <h2 style="color: #1a73e8;">🚀 Node.js Core API Engine</h2>
                    <p>Status: <span style="color: green;">Online</span></p>
                    <hr>
                    <h4>Available Endpoints:</h4>
                    <ul>
                        <li><code>GET /status</code> - Check System Health</li>
                        <li><code>GET /data</code> - Fetch Database Content</li>
                        <li><code>POST /add-user?name=YourName</code> - Add User to JSON</li>
                    </ul>
                </div>
            </body>
        `);
    }

    // 2. SYSTEM STATUS (OS & Buffer Logic)
    else if (reqUrl === '/status' && method === 'GET') {
        const stats = {
            platform: process.platform,
            nodeVersion: process.version,
            memoryUsage: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`,
            uptime: `${process.uptime().toFixed(0)} Seconds`
        };
        sendJSON(res, 200, stats);
    }

    // 3. READ DATA (Using Streams for high performance)
    else if (reqUrl === '/data' && method === 'GET') {
        const readStream = fs.createReadStream(DB_PATH);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        readStream.pipe(res); // Memory efficient: directly pipes file to browser
    }

    // 4. ADD DATA (URL Params & File Update)
    else if (reqUrl.startsWith('/add-user') && method === 'POST') {
        const name = new URL(reqUrl, `http://localhost:${PORT}`).searchParams.get('name');
        
        if (!name) return sendJSON(res, 400, { error: "Name is required" });

        // Read, modify, and write back
        fs.readFile(DB_PATH, (err, data) => {
            const db = JSON.parse(data);
            const newUser = { id: Date.now(), name: name, joined: new Date() };
            db.users.push(newUser);

            fs.writeFile(DB_PATH, JSON.stringify(db, null, 2), (err) => {
                eventTracker.emit('log', `User Added: ${name}`);
                sendJSON(res, 201, { message: "User Created", user: newUser });
            });
        });
    }

    // 5. 404 - NOT FOUND
    else {
        sendJSON(res, 404, { error: "Resource Not Found" });
    }
});

// --- START SERVER ---
server.listen(PORT, () => {
    console.clear();
    console.log(`\x1b[36m%s\x1b[0m`, `[SERVER] Node Professional Engine Started on Port ${PORT}`);
    console.log(`[LOGS] Monitoring activity.log...`);
});