import { assignments } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const assignment = assignments.find(a => a.id === params.id);

  if (!assignment) {
    return new Response(
      JSON.stringify({ error: "Assignment not found" }),
      { status: 404 }
    );
  }

  return Response.json(assignment);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {

  const body = await req.json();

  const index = assignments.findIndex(a => a.id === params.id);

  if (index === -1) {
    return new Response(
      JSON.stringify({ error: "Assignment not found" }),
      { status: 404 }
    );
  }

  assignments[index] = {
    ...assignments[index],
    ...body
  };

  return Response.json(assignments[index]);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {

  const index = assignments.findIndex(a => a.id === params.id);

  if (index === -1) {
    return new Response(
      JSON.stringify({ error: "Assignment not found" }),
      { status: 404 }
    );
  }

  assignments.splice(index, 1);

  return Response.json({ message: "Assignment deleted" });
}