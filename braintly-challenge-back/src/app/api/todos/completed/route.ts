import { NextResponse } from "next/server";

import mongodb from "@/lib/mongodb";

// GET /api/todos
export async function GET(): Promise<Response> {
    try {
        const todos = mongodb.db("todosdb").collection("todos");

        // Find all the todos in the database
        const result = await todos
            .find({ isCompleted: { $eq: true } })
            .sort({ isCompletedAt: -1 })
            .toArray();

        const count = await todos.countDocuments({ isCompleted: { $eq: true } });

        const response = NextResponse.json({ data: result, count });
        response.headers.set("Access-Control-Allow-Origin", "*");
        return response;
    } catch (error) {
        console.log(error);
        const response = NextResponse.json({ error: error, message: "Error" }, { status: 400 });
        response.headers.set("Access-Control-Allow-Origin", "*");
        return response;
    }
}
export const dynamic = "force-dynamic";
