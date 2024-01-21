import request from "supertest";
import api from "../src/server";

describe("API Endpoints", () => {
  test('GET /api/hello should return "Hello, World!"', async () => {
    const response = await request(api).get("/api/elevators/status");
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Hello, World!");
  });
});
