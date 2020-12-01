export interface Variables {
    API_BASE: string;
    API_PORT: number;
    APP_PORT: number;
}

require('dotenv').config({
    path: '../.env',
});

let environmentVariables : any = {
    ...process.env,
}

export default {
    get variables(): Variables {
        return environmentVariables;
    },
    get isDev(): boolean {
        return process.env.NODE_ENV !== 'production';
    }
}