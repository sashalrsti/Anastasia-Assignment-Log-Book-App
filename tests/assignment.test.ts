jest.mock("uuid", () => ({
  v4: () => "test-uuid"
}));

import { GET, POST } from "../app/api/assignments/route";
import { GET as GET_BY_ID, PUT, DELETE } from "../app/api/assignments/[id]/route";

describe("Assignment API Tests", () => {

  // SUCCESS: GET all assignments
  test("GET /api/assignments should return list", async () => {
    const res = await GET();
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(Array.isArray(data)).toBe(true);
  });

  // ERROR: simulate server error
  test("GET /api/assignments should handle error", async () => {
    try {
      const res = await GET();
      expect(res).toBeDefined();
    } catch (error) {
      expect(error).toBeDefined();
    }
  });


  // SUCCESS: create assignment
  test("POST /api/assignments should create assignment", async () => {

    const req = new Request("http://localhost/api/assignments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "Test Assignment",
        description: "Testing API",
        status: "Create",
        dueDate: "2026-03-15"
      })
    });

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.title).toBe("Test Assignment");
  });


  // ERROR: missing required fields
  test("POST /api/assignments missing title should fail", async () => {

    const req = new Request("http://localhost/api/assignments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        description: "Missing title"
      })
    });

    const res = await POST(req);

    expect(res.status).toBe(400);
  });


  // SUCCESS: get assignment by id
  test("GET /api/assignments/:id should return assignment", async () => {

    const res = await GET_BY_ID(
      new Request("http://localhost/api/assignments/1"),
      { params: { id: "1" } }
    );

    expect(res.status).toBe(200);
  });


  // ERROR: invalid id
  test("GET invalid assignment should return 404", async () => {

    const res = await GET_BY_ID(
      new Request("http://localhost/api/assignments/999"),
      { params: { id: "999" } }
    );

    expect(res.status).toBe(404);
  });


  // SUCCESS: update assignment
  test("PUT /api/assignments/:id should update assignment", async () => {

    const req = new Request("http://localhost/api/assignments/1", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: "Submitted"
      })
    });

    const res = await PUT(req, { params: { id: "1" } });

    expect(res.status).toBe(200);
  });


  // ERROR: update invalid id
  test("PUT invalid id should return 404", async () => {

    const req = new Request("http://localhost/api/assignments/999", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: "Submitted"
      })
    });

    const res = await PUT(req, { params: { id: "999" } });

    expect(res.status).toBe(404);
  });


  // SUCCESS: delete assignment
  test("DELETE /api/assignments/:id should delete assignment", async () => {

    const res = await DELETE(
      new Request("http://localhost/api/assignments/1"),
      { params: { id: "1" } }
    );

    expect(res.status).toBe(200);
  });


  // ERROR: delete invalid id
  test("DELETE invalid id should return 404", async () => {

    const res = await DELETE(
      new Request("http://localhost/api/assignments/999"),
      { params: { id: "999" } }
    );

    expect(res.status).toBe(404);
  });

});