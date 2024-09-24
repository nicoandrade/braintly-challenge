import { type NextRequest, NextResponse } from "next/server";

import mongodb from "@/lib/mongodb";
import { EditTodoSchema } from "@/lib/schemas";
import { z } from "zod";

// GET /api/todos
export async function GET(): Promise<Response> {
    try {
        const todos = mongodb.db("todosdb").collection("todos");

        // Find all the todos in the database
        const result = await todos
            .find({ isCompleted: { $ne: true } })
            .sort({ createdAt: -1 })
            .toArray();

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
export async function POST(request: NextRequest): Promise<Response> {
    try {
        // Validate the request body, to ensure that the data received is what we expect
        const todoItem = EditTodoSchema.parse(await request.json());

        // Insert the todo item into the database
        const result = await mongodb
            .db("todosdb")
            .collection("todos")
            .insertOne({
                ...todoItem,
                isCompletedAt: todoItem.isCompleted ? new Date() : null,
                createdAt: new Date(),
            });

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
