import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createServer, healthPayload, startServer, statusPage } from "../src/server.js";

describe("healthPayload", () => {
  it("uses the current clock by default", () => {
    expect(healthPayload()).toMatchObject({ ok: true });
  });

  it("rejects an invalid clock result", () => {
    expect(() => healthPayload(() => new Date("invalid"))).toThrow("valid Date");
  });
});

describe("server configuration", () => {
  it("requires a clock function", () => {
    expect(() => createServer({ now: "not a function" })).toThrow("now must be a function");
  });

  it("rejects ports outside the valid range", async () => {
    await expect(startServer({ port: -1 })).rejects.toThrow("port must be an integer");
  });

  it("starts and closes on an available ephemeral port", async () => {
    const server = await startServer({ port: 0 });
    expect(server.address()).toMatchObject({ address: "127.0.0.1" });
    await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  });
});

describe("statusPage", () => {
  it("renders a page that checks health and displays the service state", () => {
    const page = statusPage();

    expect(page).toContain("<title>Health status</title>");
    expect(page).toContain('fetch("/health")');
    expect(page).toContain('textContent = ok ? "UP" : "DOWN"');
    expect(page).toContain('textContent = ts');
    expect(page).toContain('id="request-time"');
    expect(page).toContain("performance.now()");
    expect(page).toContain('"Request time: "');
  });
});

describe("GET /health", () => {
  let server;
  let baseUrl;

  beforeAll(async () => {
    server = createServer({ now: () => new Date("2026-09-18T03:00:00.000Z") });
    await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
    const { port } = server.address();
    baseUrl = `http://127.0.0.1:${port}`;
  });

  afterAll(async () => {
    await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  });

  it("returns a healthy JSON payload with an ISO 8601 UTC timestamp", async () => {
    const response = await fetch(`${baseUrl}/health`);
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("application/json");
    expect(payload).toEqual({ ok: true, ts: "2026-09-18T03:00:00.000Z" });
  });

  it("serves the health status page", async () => {
    const response = await fetch(`${baseUrl}/`);
    const page = await response.text();

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("text/html");
    expect(page).toContain("Health status");
    expect(page).toContain('fetch("/health")');
  });

  it("rejects non-GET requests", async () => {
    const response = await fetch(`${baseUrl}/health`, { method: "POST" });

    expect(response.status).toBe(405);
    expect(await response.text()).toBe("Method Not Allowed");
  });

  it("returns not found for other paths", async () => {
    const response = await fetch(`${baseUrl}/missing`);

    expect(response.status).toBe(404);
    expect(await response.text()).toBe("Not Found");
  });
});
