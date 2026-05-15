import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function convert() {
    console.log("Starting conversion...");
    const baseDir = path.resolve('./public');
    const bgDir = path.resolve(baseDir, 'bg');
    
    if (!fs.existsSync(bgDir)) fs.mkdirSync(bgDir);

    const inputDay = path.resolve(baseDir, 'anime_city_day.png');
    
    // Day Conversion
    if (fs.existsSync(inputDay)) {
        console.log("Processing Day Background...");
        const img = sharp(inputDay);
        
        await img.resize(1920).webp({ quality: 90 }).toFile(path.resolve(bgDir, 'day_desktop.webp'));
        await img.resize(1024).webp({ quality: 85 }).toFile(path.resolve(bgDir, 'day_tablet.webp'));
        // For mobile, crop vertically (like 9:16)
        await img.resize({ width: 768, height: 1366, fit: 'cover' }).webp({ quality: 80 }).toFile(path.resolve(bgDir, 'day_mobile.webp'));
        console.log("Day conversion complete.");
    } else {
        console.log("inputDay not found at: " + inputDay);
    }
}

convert().catch(console.error);
