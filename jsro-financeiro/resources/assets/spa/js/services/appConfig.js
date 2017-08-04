import config from '../config';

const location = window.location;

let localConfig = {
    host: `${location.protocol}//${location.hostname}:${location.port}`,
    get login_url(){
        return `${this.host}${config.app_path}${config.login_path}`;
    }
};

const appConfig = Object.assign({}, localConfig, config);

export default appConfig;