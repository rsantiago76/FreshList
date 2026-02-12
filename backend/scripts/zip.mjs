import fs from 'fs-extra';
import archiver from 'archiver';
import { execSync } from 'child_process';

const buildDir = 'build';
const distDir = 'dist';
const zipFile = 'lambda.zip';

// Clean
console.log('Cleaning build directory...');
fs.removeSync(buildDir);
fs.ensureDirSync(buildDir);

// Build TS
console.log('Compiling TypeScript...');
execSync('npm run build', { stdio: 'inherit' });

// Copy dist to build
console.log('Copying distribution files...');
fs.copySync(distDir, buildDir);

// Copy package.json to build
console.log('Copying package.json...');
fs.copySync('package.json', `${buildDir}/package.json`);

// Install production dependencies
console.log('Installing production dependencies...');
execSync('npm install --production', { cwd: buildDir, stdio: 'inherit' });

// Zip
console.log('Zipping lambda...');
const output = fs.createWriteStream(zipFile);
const archive = archiver('zip', { zlib: { level: 9 } });

output.on('close', function () {
    console.log(archive.pointer() + ' total bytes');
    console.log('Created backend/lambda.zip');
});

archive.on('error', function (err) {
    throw err;
});

archive.pipe(output);
archive.directory(buildDir, false);
archive.finalize();