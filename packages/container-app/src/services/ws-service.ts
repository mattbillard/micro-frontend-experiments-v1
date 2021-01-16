
// let username;
const url = 'wss://localhost:8080/server'
let connection;

// const connect = async (username: string) => {
export const connect = async (username: string) => {
  connection = new WebSocket(url);
}

// const get = (key: string) => {
// }

// const set = (key: string, value: any) => {
// }
