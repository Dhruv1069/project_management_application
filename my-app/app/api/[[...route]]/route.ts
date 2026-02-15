import { Hono } from "hono";
import { handle } from "hono/vercel";
import auth from "@/feature/auth/server/route";
import { Apple } from "lucide-react";
import workspaces from "@/feature/workspaces/server/route"
// to build RPC we have to chain instances from one to another. We need to have one constant to have the entire type 
// specifications to the entire app.. This makes sure that the types are transferred properly!

const app = new Hono().basePath("/api");

const routes = app
    .route("/auth", auth)
    .route("/workspaces", workspaces);

export const GET = handle(app); 
export const POST = handle(app); //native next.js app api routes requires explicit export of GET POST PUT DELETE (Anything about REST API operations)
export const PATCH = handle(app);
export type AppType = typeof routes; //holds the entire api 