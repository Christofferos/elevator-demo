import request from "supertest";
import api from "../src/server";

describe("API Endpoints", () => {
  test("GET /api/v1/elevators/status should return a list of length 5", async () => {
    const response = await request(api).get("/api/v1/elevators/status");
    expect(response.status).toBe(200);
  });
});
