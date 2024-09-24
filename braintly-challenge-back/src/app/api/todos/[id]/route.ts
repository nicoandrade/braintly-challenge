import { type NextRequest, NextResponse } from "next/server";

import mongodb from "@/lib/mongodb";
import { EditTodoSchema } from "@/lib/schemas";
import { ObjectId } from "mongodb";
import { z } from "zod";

// GET /api/todos
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
): Promise<Response> {
    try {
        const { id } = z.object({ id: z.string() }).parse(params);
        const todos = mongodb.db("todosdb").collection("todos");
        // Find the todo item with the given id
        const result = await todos.findOne({ _id: new ObjectId(id) });

        const response = NextResponse.json({ data: result });
        response.headers.set("Access-Control-Allow-Origin", "*");
        return response;
    } catch (error) {
        console.log(error);
        const response = NextResponse.json({ error: error, message: "Error" }, { status: 400 });
        response.headers.set("Access-Control-Allow-Origin", "*");
        return response;
    }
}

// POST /api/todos
export async function POST(
    request: NextRequest,
    { params }: { params: { id: string } }
): Promise<Response> {
    try {
        const { id } = z.object({ id: z.string() }).parse(params);

        // Validate the request body, to ensure that the data received is what we expect
        const todoItem = EditTodoSchema.parse(await request.json());

        // Insert the todo item into the database
        const result = await mongodb
            .db("todosdb")
            .collection("todos")
            .findOneAndUpdate(
                {
                    _id: new ObjectId(id),
                },
                {
                    $set: {
                        ...todoItem,
                        isCompletedAt: todoItem.isCompleted ? new Date() : null,
                    },
                },
                {
                    returnDocument: "after",
                }
            );

        const response = NextResponse.json({ data: result });
        response.headers.set("Access-Control-Allow-Origin", "*");
        return response;
    } catch (error) {
        console.log(error);
        // If it's a zod error (validation of the data received)
        if (error instanceof z.ZodError) {
            const response = NextResponse.json(
                {
                    error: error.issues,
                    message: "Error with the data received",
                    code: "ZOD_ERROR",
                },
                { status: 400 }
            );
            response.headers.set("Access-Control-Allow-Origin", "*");
            return response;
        } else {
            // If it's a generic error
            const response = NextResponse.json({ error: error, message: "Error" }, { status: 400 });
            response.headers.set("Access-Control-Allow-Origin", "*");
            return response;
        }
    }
}

// DELETE /api/todos
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
): Promise<Response> {
    try {
        const { id } = z.object({ id: z.string() }).parse(params);
        const todos = mongodb.db("todosdb").collection("todos");
        const result = await todos.deleteOne({ _id: new ObjectId(id) });
        const response = NextResponse.json({ data: result });
        response.headers.set("Access-Control-Allow-Origin", "*");
        return response;
    } catch (error) {
        console.log(error);
        if (error instanceof z.ZodError) {
            const response = NextResponse.json(
                {
                    error: error.issues,
                    message: "Error with the data received",
                    code: "ZOD_ERROR",
                },
                { status: 400 }
            );
            response.headers.set("Access-Control-Allow-Origin", "*");
            return response;
        } else {
            // If it's a generic error
            const response = NextResponse.json({ error: error, message: "Error" }, { status: 400 });
            response.headers.set("Access-Control-Allow-Origin", "*");
            return response;
        }
    }
}

// OPTIONS /api/todos
// This is used to check if the CORS policy is working
export async function OPTIONS(): Promise<Response> {
    const response = NextResponse.json({ message: "OK" });
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    return response;
}

// always run, no cache
export const dynamic = "force-dynamic";
