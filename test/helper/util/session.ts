import * as os from 'os';
import * as fs from 'fs';
import { load } from './config';

const TMP_DIR = os.tmpdir();
const TMP_NAME = load('appName')
const TMP_PATH = `${TMP_DIR}/${TMP_NAME}`;
const FORMAT = 'utf8';

export class Session {
    public static write(key: string, value: any): void {
        if (fs.existsSync(TMP_PATH)) {
            const input = fs.readFileSync(TMP_PATH, FORMAT);
            const data = JSON.parse(input);
            data[key] = value;
            const output = JSON.stringify(data);
            fs.writeFileSync(TMP_PATH, output);
        } else {
            const data = { [key]: value };
            const output = JSON.stringify(data);
            fs.writeFileSync(TMP_PATH, output);
        }
    }

    public static read(key: string): any {
        const input = fs.readFileSync(TMP_PATH, FORMAT);
        const data = JSON.parse(input);
        return data[key];
    }

    public static clear(key: string): void {
        const input = fs.readFileSync(TMP_PATH, FORMAT);
        const data = JSON.parse(input);
        delete data[key];
        const output = JSON.stringify(data);
        fs.writeFileSync(TMP_PATH, output);
    }

    public static clearAll(): void {
        if (fs.existsSync(TMP_PATH)) {
            fs.unlinkSync(TMP_PATH);
        }
    }
}
