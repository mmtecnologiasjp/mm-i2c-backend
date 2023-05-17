import * as fs from 'fs';

const testFiles: string[] = [];

const getTestFiles = (folder: string) => {
  const files = fs.readdirSync(folder);

  for (const file of files) {
    const filePath = `${folder}/${file}`;
    const stats = fs.statSync(filePath);

    const isDirectory = stats.isDirectory();
    const isControllerTest = file.endsWith('.controller.spec.ts');
    const isVerifyPrismaMock = file.startsWith('verify-prisma');
    const isTestFile = file.endsWith('.spec.ts');

    if (isDirectory) {
      getTestFiles(filePath);
      continue;
    }

    if (isTestFile && !isControllerTest && !isVerifyPrismaMock) {
      testFiles.push(filePath);
    }
  }
};

const testFolder = './src/tests/';
getTestFiles(testFolder);

testFiles.forEach((file) => {
  const fileContent = fs.readFileSync(file, 'utf-8');
  const importLineRegex = /^import { prismaMock } from '..\/prisma-mock';$/m;
  const [line] = fileContent.split('\n');
  const firstImportLine = importLineRegex.test(line);

  test(`prismaMock must be the first import on ${file}`, () => {
    expect(firstImportLine).toBeTruthy();
  });
});
