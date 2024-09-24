import mongodb from "@/lib/mongodb";

const main = async () => {
    const todos = mongodb.db("todosdb").collection("todos");

    // First remove all the data in the collection
    await todos.deleteMany({});

    await todos.insertMany([
        {
            name: "Buy milk and bread",
            isCompleted: false,
            isCompletedAt: null,
            deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 días desde ahora
            createdAt: new Date(),
        },
        {
            name: "Call doctor for annual checkup",
            isCompleted: false,
            isCompletedAt: null,
            deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 semana desde ahora
            createdAt: new Date(),
        },
        {
            name: "Prepare presentation for meeting",
            isCompleted: true,
            isCompletedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // Completado ayer
            deadline: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // Fecha límite hace 2 días
            createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // Creado hace 5 días
        },
        {
            name: "Wash the car",
            isCompleted: false,
            isCompletedAt: null,
            deadline: null, // Sin fecha límite
            createdAt: new Date(),
        },
        {
            name: "Organize birthday party",
            isCompleted: false,
            isCompletedAt: null,
            deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 1 mes desde ahora
            createdAt: new Date(),
        },
        {
            name: "Learn to play guitar",
            isCompleted: false,
            isCompletedAt: null,
            deadline: null, // Sin fecha límite
            createdAt: new Date(),
        },
        {
            name: "Submit tax return",
            isCompleted: false,
            isCompletedAt: null,
            deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 2 semanas desde ahora
            createdAt: new Date(),
        },
        {
            name: "Plan summer vacation",
            isCompleted: false,
            isCompletedAt: null,
            deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 2 meses desde ahora
            createdAt: new Date(),
        },
        {
            name: "Clean out garage",
            isCompleted: false,
            isCompletedAt: null,
            deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 días desde ahora
            createdAt: new Date(),
        },
        {
            name: "Finish reading 'War and Peace'",
            isCompleted: false,
            isCompletedAt: null,
            deadline: null, // Sin fecha límite
            createdAt: new Date(),
        },
        {
            name: "Get car serviced",
            isCompleted: true,
            isCompletedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // Completado hace 3 días
            deadline: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // Fecha límite hace 5 días
            createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // Creado hace 15 días
        },
        {
            name: "Buy anniversary gift",
            isCompleted: false,
            isCompletedAt: null,
            deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 días desde ahora
            createdAt: new Date(),
        },
        {
            name: "Buy anniversary meals",
            isCompleted: false,
            isCompletedAt: null,
            deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 días desde ahora
            createdAt: new Date(),
        },
        {
            name: "Renew passport",
            isCompleted: true,
            isCompletedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Completado hace 7 días
            deadline: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // Fecha límite hace 2 días
            createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Creado hace 30 días
        },
        {
            name: "Paint the living room",
            isCompleted: true,
            isCompletedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // Completado hace 14 días
            deadline: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // Fecha límite hace 10 días
            createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000), // Creado hace 45 días
        },
        {
            name: "Update resume",
            isCompleted: true,
            isCompletedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // Completado hace 2 días
            deadline: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // Fecha límite ayer
            createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // Creado hace 10 días
        },
        {
            name: "Organize birthday party",
            isCompleted: true,
            isCompletedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // Completado ayer
            deadline: new Date(), // Fecha límite hoy
            createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000), // Creado hace 20 días
        },
        {
            name: "Learn to make sushi",
            isCompleted: true,
            isCompletedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // Completado hace 5 días
            deadline: null, // Sin fecha límite
            createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), // Creado hace 60 días
        },
    ]);

    console.log("Database seeded successfully");
    process.exit();
};

main().catch((error) => {
    console.error("Error seeding database:", error);
    process.exit(1);
});
