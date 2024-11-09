const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const server = http.createServer();
const PORT = 8000;

function serveFile(filePath, contentType, response) {
  fs.readFile(filePath, (error, content) => {
    if (error) {
      response.writeHead(500, { 'Content-Type': 'text/plain' });
      response.end('Server da samu error');
      return;
    }

    response.writeHead(200, { 'Content-Type': contentType });
    response.end(content);
  });
}

server.on('request', (request, response) => {
  let filePath = '';
  let contentType = '';

  switch (request.url) {
    case '/': {
      filePath = path.join(__dirname, 'index.html');
      contentType = 'text/html';
      break;
    }
    case '/styles.css': {
      filePath = path.join(__dirname, 'styles.css');
      contentType = 'text/css';
      break;
    }
    case '/script.js': {
      filePath = path.join(__dirname, 'script.js');
      contentType = 'text/javascript';
      break;
    }
    case '/image.jpg': {
      filePath = path.join(__dirname, 'image.jpg');
      contentType = 'image/jpeg';
      break;
    }
    default: {
      response.writeHead(404, { 'Content-Type': 'text/plain' });
      response.end('Not found');
    }
  }

  serveFile(filePath, contentType, response);
});

server.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

// DRY principle: DON'T REPEAT YOURSELF
// .png, .webp
// Refactoring

// ExpressJS
