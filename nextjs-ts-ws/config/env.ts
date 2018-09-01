export const NODE_PORT = parseInt(process.env.NODE_PORT, 10) || 3000;
export const IS_DEVELOPMENT = process.env.NODE_ENV !== 'production';
export const GRAPHQL_ENDPOINT = `http://localhost:${NODE_PORT}/graphql`;
export const GRAPHQL_WS_ENDPOINT = `ws://localhost:${NODE_PORT}/graphql`;
