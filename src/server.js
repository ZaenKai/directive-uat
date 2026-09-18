import { createServer as createHttpServer } from "node:http";

/**
 * Build the health response payload.
 *
 * @param {() => Date} now - Clock function used to produce the timestamp.
 * @returns {{ ok: true, ts: string }} The health response body.
 */
export function healthPayload(now = () => new Date()) {
  const timestamp = now();
  if (!(timestamp instanceof Date) || Number.isNaN(timestamp.getTime())) {
    throw new TypeError("now must return a valid Date");
  }

  return { ok: true, ts: timestamp.toISOString() };
}

/**
 * Create the HTTP server for Story A.
 *
 * @param {{ now?: () => Date }} [options] - Injectable clock for deterministic tests.
 * @returns {import("node:http").Server} The unstarted HTTP server.
 * @throws {TypeError} If the supplied clock is not a function.
 */
export function createServer({ now = () => new Date() } = {}) {
  if (typeof now !== "function") {
    throw new TypeError("now must be a function");
  }

  return createHttpServer((request, response) => {
    if (request.url !== "/health") {
      response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
      response.end("Not Found");
      return;
    }

    if (request.method !== "GET") {
      response.writeHead(405, {
        "allow": "GET",
        "content-type": "text/plain; charset=utf-8"
      });
      response.end("Method Not Allowed");
      return;
    }

    const body = JSON.stringify(healthPayload(now));
    response.writeHead(200, {
      "content-type": "application/json; charset=utf-8",
      "content-length": Buffer.byteLength(body)
    });
    response.end(body);
  });
}

/**
 * Start the Story A server.
 *
 * @param {{ port?: number, host?: string }} [options] - Listening options.
 * @returns {Promise<import("node:http").Server>} The listening server.
 */
export function startServer({ port = Number(process.env.PORT ?? 3000), host = "127.0.0.1" } = {}) {
  if (!Number.isInteger(port) || port < 0 || port > 65535) {
    return Promise.reject(new RangeError("port must be an integer from 0 to 65535"));
  }

  const server = createServer();
  return new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(port, host, () => {
      server.off("error", reject);
      resolve(server);
    });
  });
}

/* v8 ignore start -- executable startup wrapper is excluded from module coverage. */
