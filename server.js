const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const server = http.createServer();
const PORT = 8000;

server.on('request', (request, response) => {
  switch (request.url) {
    case '/': {
      fs.readFile(path.join(__dirname, 'index.html'), (error, content) => {
        if (error) {
          response.writeHead(500, { 'Content-Type': 'text/plain' });
          response.end('Server da samu error');
          return;
        }

        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end(content);
      });

      break;
    }
    case '/styles.css': {
      fs.readFile(path.join(__dirname, 'styles.css'), (error, content) => {
        if (error) {
          response.writeHead(500, { 'Content-Type': 'text/plain' });
          response.end('Server da samu error');
          return;
        }

        response.writeHead(200, { 'Content-Type': 'text/css' });
        response.end(content);
      });

      break;
    }
    case '/script.js': {
      fs.readFile(path.join(__dirname, 'script.js'), (error, content) => {
        if (error) {
          response.writeHead(500, { 'Content-Type': 'text/plain' });
          response.end('Server da samu error');
          return;
        }

        response.writeHead(200, { 'Content-Type': 'text/javascript' });
        response.end(content);
      });

      break;
    }
    default: {
      response.writeHead(404, { 'Content-Type': 'text/plain' });
      response.end('Not found');
    }
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

// DRY principle: DON'T REPEAT YOURSELF
