import path from 'path';
import fs from 'fs';

export const filePath = path.join(
    __dirname,
    '../../client/sample_960x400_ocean_with_audio.mp4'
);
export const fileSize = fs.statSync(filePath).size;

export const CHUNK_SIZE = 10 ** 6; // 1MB