import { Server } from 'http';
import { app } from './app';

const server = new Server(app);

server.listen(3000, () => {
    console.log('Server is running');
});
