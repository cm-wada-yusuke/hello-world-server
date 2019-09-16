import * as fs from 'fs';

const config = fs.readFileSync('tsas.config.json', 'utf8');
const data = JSON.parse(config);

const load = (key: string): string | number => {
  return data[key];
};

export { load };
