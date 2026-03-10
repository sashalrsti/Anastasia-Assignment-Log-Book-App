import { assignments } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

export async function GET() {
  return Response.json(assignments);
}

export async function POST(req: Request) {

  const body = await req.json();

  if (!body.title || !body.description || !body.dueDate) {
    return new Response(
      JSON.stringify({ error: "Missing required fields" }),
      { status: 400 }
    );
  }

  const newAssignment = {
    id: uuidv4(),
    title: body.title,
    description: body.description,
    status: body.status || "Create",
    assignmentDate: new Date().toISOString(),
    dueDate: body.dueDate
  };

  assignments.push(newAssignment);

  return Response.json(newAssignment);
}