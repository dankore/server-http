const http = require('node:http');
const fs = require('node:fs')

const server = http.createServer();
const PORT = 8000;

server.on('request', (request, response) => {
  // PATH
  fs.readFile('./index.html', (error, content) => {
    if (request.url === '/') {
      // send index.html
      if (error) {
        // yes error, send error message to the client/browser
        // HTTP Status
        response.writeHead(500, { 'Content-Type': 'text/plain' });
        response.end('Server da samu error');
      } else {
        // no error, send HTML file to the client/browser
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end(content);
      }
    }

    if (request.url == '/styles.css') {
      // send css
      fs.readFile('./styles.css', (error, content) => {
        if (error) {
          response.writeHead(500, { 'Content-Type': 'text/plain'})
          response.end('Server error')
        } else {
          response.writeHead(200, {'Content-Type': 'text/css'})
          response.end(content)
        }
      })
    }
  
  })
})

server.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`)
});

// DRY principle: DON'T REPEAT YOURSELF
