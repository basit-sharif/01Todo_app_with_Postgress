import { db } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";



// GET function for getting all the entries of Todos table
export async function GET(request: NextRequest) {

    const client = await db.connect();

    try {

        let res = await client.sql`SELECT * FROM todos;`;
        return NextResponse.json({ res });

    } catch (error) {

        console.log(error);
        return NextResponse.json({ message: error })

    }

};




export async function POST(request: NextRequest) {
    let req = await request.json();         //it no give anything if in json like {} not empty stop on this and error
    const client = await db.connect();

    try {

        // create table that takes id?,title,description,status as parameter
        // id is optional beacuse it is serail will increase as the product
        await client.sql`CREATE TABLE IF NOT EXISTS todos (
            id serial primary key,
            title varchar(100),
            description varchar(100),
            status boolean default true not null,
            userid int NOT NULL UNIQUE
        )`

        // if title and description is not available throw error
        if (req.title && req.description && req.userId) {

            // insert data into todos table
            await client.sql`INSERT INTO todos(title,description,status,userid) VALUES (${req.title},${req.description},false,${req.userId});`
            return NextResponse.json({ message: "succesfully created" });

        };
        throw ("Please provide title and description and userId in json format");

    } catch (error) {
        // console.log(error);
        return NextResponse.json({ message: error })
    }
};



export async function DELETE(request: NextRequest) {
    const url = await request.nextUrl.searchParams;
    const client = await db.connect();
    try {

        if (url.has("id")) {
            await client.sql`DELETE FROM todos WHERE id=${url.get("id")};`;
            return NextResponse.json({ message: `succesfully removed id=${url.get("id")} from todos list` });
        };

        throw "Please provide id in url to remove item"

    } catch (error) {
        return NextResponse.json({ message: error });
    };
};



export async function PUT(request: NextRequest) {
    const client = await db.connect();

    try {
        let req = await request.json();

        if (req.description && req.id) {
            await client.sql`UPDATE todos SET description=${req.description} WHERE id=${req.id}`
            return NextResponse.json({ message: "updated description sucessfully" });
        } else if (req.status && req.id) {
            await client.sql`UPDATE todos SET status=${req.status} WHERE id=${req.id}`;
            return NextResponse.json({ message: "updated status sucessfully" });
        } else if (req.title && req.id) {
            await client.sql`UPDATE todos SET title=${req.title} WHERE id=${req.id}`;
            return NextResponse.json({ message: "updated status sucessfully" });
        };

    } catch (error) {
        return NextResponse.json({ message: "please provide your description and status and id in json form" });
    }
}