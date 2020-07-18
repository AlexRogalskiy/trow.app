const isDevelopment = process.env.NODE_ENV === 'development'

const DEV_CONFIG = {
    host: 'localhost',
    port: 9000,
}

const PROD_CONFIG = {}

const peerConfig = isDevelopment ? DEV_CONFIG : PROD_CONFIG

export default peerConfig
