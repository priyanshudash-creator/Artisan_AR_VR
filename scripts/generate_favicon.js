import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imgPath = path.join(__dirname, '..', 'public', 'favicon.jpg');
const svgPath = path.join(__dirname, '..', 'public', 'favicon.svg');

if (fs.existsSync(imgPath)) {
  const imgBase64 = fs.readFileSync(imgPath).toString('base64');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <clipPath id="wheel-circle">
      <circle cx="50" cy="50" r="50"/>
    </clipPath>
  </defs>
  <circle cx="50" cy="50" r="49" fill="#B85C38" stroke="#E8DCCB" stroke-width="2"/>
  <image width="100" height="100" href="data:image/jpeg;base64,${imgBase64}" clip-path="url(#wheel-circle)"/>
</svg>`;
  fs.writeFileSync(svgPath, svg);
  console.log('Successfully wrote favicon.svg with Konark wheel!');
} else {
  console.error('favicon.jpg not found');
}
