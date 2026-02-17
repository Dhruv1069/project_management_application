"use client";
import { z } from "zod";
import {FaGoogle} from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { DottedSeparator } from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FileCogIcon } from "lucide-react";
import Link from "next/link";

import {
    Form,
    FormControl,
    FormField,
    FormLabel,
    FormMessage,
    FormItem,
} from "@/components/ui/form"
import { loginSchema } from "../schemas";
import { useLogin } from "../api/use-login";

export const SignInCard = () => {
    const { mutate, isPending } = useLogin();

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues:{
            email: "",
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof loginSchema>)=>{
        mutate({json : values});
    };

    return (
        <Card className="w-full h-full md:w-119.5 border-none shadow-none">
            <CardHeader className="flex items-center justify-center text-center p-x">
                <CardTitle className="text-2xl">
                    Welcome Back!
                </CardTitle>
            </CardHeader>
            <div className="px-7">
                <DottedSeparator/>
            </div>
                <CardContent className="p-7">
                    <Form {...form}>
                    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            name = "email"
                            control={form.control}
                            render = {({ field }) => (
                                <FormItem>
                                <FormControl>
                                <Input 
                                {...field}
                                type="email"
                                placeholder="Enter Email Address"
                                
                                />
                                </FormControl>
                                <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name = "password"
                            control={form.control}
                            render = {({ field }) => (
                                <FormItem>
                                <FormControl>
                                <Input 
                                {...field}
                                type="password"
                                placeholder="Enter Password"
                                
                                />
                                </FormControl>
                                <FormMessage/>
                                </FormItem>
                            )}
                        />
                        {/* <Input 
                        required
                        type="password"
                        value={""}
                        onChange={()=>{}}
                        placeholder="Enter Password"
                        disabled={false}
                        min={8}
                        max={256}
                        /> */}

                        <Button disabled={isPending} size="lg" className="w-full"> 
                            Login
                        </Button>

                    </form>
                    </Form>

                </CardContent>
                <div className="px-7">
                    <DottedSeparator/>

                </div>
                <CardContent className="p-7 flex flex-col gap-y-4">
                    <Button 
                    disabled={isPending}
                    variant="secondary"
                    size="lg"
                    className="w-full relative"
                    >
                    <svg className="mr-2 size-5" viewBox="0 0 24 24">
                        <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                        />
                        <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                        />
                        <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                        fill="#FBBC05"
                        />
                        <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                        />
                    </svg>
                    Login With Google
                    </Button>
                    <Button 
                    disabled={isPending}
                    // variant="default" // or your dark variant
                    size="lg"
                    className="w-full bg-[#24292e] text-white hover:bg-[#2c3137] border-none"
                    >
                    <FaGithub className="mr-2 size-5 fill-white"/>
                    Login With Github
                    </Button>
                </CardContent>
                <div className="px-7">
                    <DottedSeparator/>
                </div>
                    <CardContent className="p-2 flex items-center justify-center">
                        <p>
                            Don&apos;t have an account?
                            <Link href="/sign-up">
                            <span className="text-blue-700">
                                &nbsp;Sign Up
                            </span>

                            </Link>
                        </p>
                    </CardContent>
        </Card>
    );
};