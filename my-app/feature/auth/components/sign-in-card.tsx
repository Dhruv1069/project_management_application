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
                    className="w-full">
                        <FaGoogle className="mr-2 size-5"/>
                        Login With Google
                    </Button>
                    <Button 
                    disabled={isPending}
                    variant="secondary"
                    size="lg"
                    className="w-full">
                        <FaGithub className="mr-2 size-5"/>
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