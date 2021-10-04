const routesHandler = (req,res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.write('<html>')
        res.write('<head><title>My greeting page</title>');
        res.write('<body>')
        res.write('<h1>Hello!</h1>')
        res.write('<form method="POST" action="/create-user"><input type="text" name="username"><button type="submit">Create</button></form>')
        res.write('</body>')
        res.write('</html>')
        return res.end();
    }
    if (url === '/users') {
        res.write('<html>');
        res.write('<head><title>My users page</title>');
        res.write('<body>')
        res.write('<h1>Users</h1>');
        res.write('<ul><li>User1</li><li>User2</li></ul>')
        res.write('</body>')
        res.write('</html>');
        res.end();
    }
    if (url === '/create-user' && method === 'POST') {
        const body = [];
        res.write('<html>');
        res.write('<head><title>I Create this page</title>');
        res.write('<body>')
        res.write('<h1>Created page</h1>');
        // console.log('data', username)
        res.write('</body>')
        res.write('</html>');
        res.end();
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            console.log('data', message)
            });
        res.statusCode = 302;
        res.setHeader('location', '/');
        return res.end();
    }
    res.write('<html>')
    res.write('<head><title>Not Found</title>');
    res.write('<body>')
    res.write('<h1>Page not found!</h1>')
    res.write('</body>')
    res.write('</html>')
    res.end();
};

module.exports = routesHandler;
