import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { loginSchema, registerSchema } from "../schemas";

//middleware: anything which returns the next method before the final controller () => next()... You can chain as many as you can 
//zValidator == middleware 

//c.req.valid only when using zValidator
//c.req.param to access parameter
const app = new Hono()
    .post("/login", zValidator("json",loginSchema), (c) => {
        const {email, password} = c.req.valid("json");

        console.log({email, password});

        return c.json({ email, password});
    })
    .post("/register", zValidator("json", registerSchema), (c) => {
        const {name, email, password} = c.req.valid("json");

        console.log({name, email, password});

        return c.json({ name, email, password});
    });
export default app;
