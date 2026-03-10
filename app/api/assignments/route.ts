import { assignments } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

export async function GET() {
  return Response.json(assignments);
}

export async function POST(req: Request) {

  const body = await req.json();

  if (!body.title || !body.course) {
    return new Response(
      JSON.stringify({ error: "Title and Course required" }),
      { status: 400 }
    );
  }

  const newAssignment = {
    id: uuidv4(),
    title: body.title,
    course: body.course,
    description: body.description,
    dueDate: body.dueDate,
    status: body.status || "pending"
  };

  assignments.push(newAssignment);

  return Response.json(newAssignment);
}