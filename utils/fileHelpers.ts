import * as fs from 'fs';
import * as csv from 'csv-parser';
import * as xlsx from 'xlsx';

interface DataRecord {
  [key: string]: any;
}

function readCSV(filePath: string): Promise<DataRecord[]> {
  return new Promise((resolve, reject) => {
    const results: DataRecord[] = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data: DataRecord) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (err: Error) => reject(err));
  });
}

function readExcel(filePath: string): DataRecord[] {
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  return xlsx.utils.sheet_to_json(sheet);
}

export { readCSV, readExcel };
