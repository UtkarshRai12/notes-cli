import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

// u can use __dirname__ also but it is not available in ES modules
// so we can use import.meta.url
// it gives the path of the current module

const DB_PATH = fileURLToPath(new URL('db.json', import.meta.url));

export const writeDB = async (newData, key = 'notes', options) => {
  try {
    let doesFile = true;
    try {
      await fs.access(DB_PATH);
    } catch {
      console.log('File does not exist, creating a new one...');
      doesFile = false;
    }
    let data = null;
    // console.log('doesFile', doesFile);
    if (doesFile) data = await fs.readFile(DB_PATH, 'utf-8');
    let parsedData = {};
    if (!options?.override) {
      try {
        parsedData = JSON.parse(data);
        parsedData[key] = newData;
      } catch (error) {
        parsedData = {
          [key]: newData,
        };
        console.error('Error parsing JSON:', error);
      }
    } else {
      parsedData[key] = newData;
    }
    console.log('parsedData before', parsedData);
    await fs.writeFile(DB_PATH, JSON.stringify(parsedData, null, 2));
  } catch (error) {
    console.error('Error writing to database:', error);
  }
};

export const readDB = async (key = 'notes') => {
  try {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    const parsedData = JSON.parse(data);
    const parsedDataForKey = key ? parsedData[key] : parsedData;
    return parsedDataForKey;
  } catch (error) {
    return [];
  }
};

export const filterDB = async (key, predicate) => {
  const parsedDataForKey = await readDB(key);
  if (Array.isArray(parsedDataForKey)) {
    return parsedDataForKey.filter(predicate);
  }
  if (typeof parsedDataForKey === 'object' && parsedDataForKey !== null) {
    return Object.values(parsedDataForKey).filter(predicate);
  }
};
