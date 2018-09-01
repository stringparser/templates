
export const NODE_PORT = parseInt(process.env.NODE_PORT, 10) || 3000;
export const GRAPHQL_PORT = NODE_PORT + 1000;
export const IS_DEVELOPMENT = process.env.NODE_ENV !== 'production';
