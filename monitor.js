const http = require('http');
const os = require('os');
const fs = require('fs');

const server = http.createServer((req, res) => {
    // 1. OS se real-time data nikalna
    const freeMemory = (os.freemem() / 1024 / 1024 / 1024).toFixed(2); // GB mein
    const totalMemory = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);
    const cpuModel = os.cpus()[0].model;
    const uptime = (os.uptime() / 3600).toFixed(2); // Hours mein

    // 2. Data ko Object mein convert karna
    const healthData = {
        status: "Running",
        memory: `${freeMemory}GB free out of ${totalMemory}GB`,
        processor: cpuModel,
        systemUptime: `${uptime} Hours`
    };

    // 3. Log file mein entry save karna (Unique step)
    const logMessage = `[${new Date().toISOString()}] RAM: ${freeMemory}GB Free | Uptime: ${uptime} hrs\n`;
    fs.appendFileSync('system_logs.txt', logMessage);

    // 4. HTML Response (Unique Interface)
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
        <body style="font-family: sans-serif; background: #121212; color: #00ff00; padding: 50px;">
            <h1 style="border-bottom: 2px solid #00ff00;">💻 Node.js System Monitor</h1>
            <div style="background: #1e1e1e; padding: 20px; border-radius: 10px; box-shadow: 0 0 20px rgba(0,255,0,0.2);">
                <p><b>System Status:</b> ✅ Online</p>
                <p><b>CPU:</b> ${healthData.processor}</p>
                <p><b>RAM Usage:</b> ${healthData.memory}</p>
                <p><b>Uptime:</b> ${healthData.systemUptime}</p>
            </div>
            <p style="color: #888; margin-top: 20px;">Refreshing this page updates the <i>system_logs.txt</i> file automatically.</p>
            <script>setTimeout(() => { location.reload(); }, 5000);</script>
        </body>
    `);
});

server.listen(4000, () => {
    console.log('Monitor started at http://localhost:4000');
});