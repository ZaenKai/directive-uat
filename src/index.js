import { startServer } from "./server.js";

startServer().then((server) => {
  const address = server.address();
  console.log(`Health server listening on http://${address.address}:${address.port}`);
}).catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
