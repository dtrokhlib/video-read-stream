import express, { Request, Response } from 'express';
import path from 'path';
import { CHUNK_SIZE, filePath, fileSize } from './video/video';
import fs from 'fs';

const app = express();

app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.get('/video', (req: Request, res: Response) => {
    const range = req.headers.range;
    if (!range) {
        return res.status(400).send('Requires Range header');
    }

    const start = Number(range.replace(/\D/g, ''));
    const end = Math.min(start + CHUNK_SIZE, fileSize - 1);

    res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': end - start + 1,
        'Content-Type': 'video/mp4',
    });

    const videoStream = fs.createReadStream(filePath, { start, end });

    videoStream.pipe(res);
});

export { app };
