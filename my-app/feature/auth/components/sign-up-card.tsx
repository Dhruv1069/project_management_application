"use client";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { z } from "zod";
import Link, { LinkProps } from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { DottedSeparator } from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
    Form,
    FormControl,
    FormField,
    FormLabel,
    FormMessage,
    FormItem,
} from "@/components/ui/form"


import { Input } from "@/components/ui/input";
import { FileCogIcon } from "lucide-react";
import { registerSchema } from "../schemas";
import { useRegister } from "../api/use-register";








export const SignUpCard = () => {
    const { mutate, isPending } = useRegister();

    const form = useForm<z.infer<typeof registerSchema>>({
            resolver: zodResolver(registerSchema),
            defaultValues:{
                name: "",
                email: "",
                password: "",
            },
});


const onSubmit = (values: z.infer<typeof registerSchema>)=>{
    mutate({json : values});
}


  return (
    <Card className="w-full h-full md:w-[478px] border-none shadow-none">
      <CardHeader className="flex items-center justify-center text-center p-x flex-col">
        <CardTitle className="text-2xl">Sign Up</CardTitle>
        <div className="text-sm text-muted-foreground">
          {" "}
          {/* Replaces CardDescription if it's a <p> tag */}
          By Signing UP, you agree to our{" "}
          <Link href="/privacy" className="text-blue-700 hover:underline">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link href="/terms" className="text-blue-700 hover:underline">
            Terms of service
          </Link>
        </div>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
                            name = "name"
                            control={form.control}
                            render = {({ field }) => (
                                <FormItem>
                                <FormControl>
                                <Input 
                                {...field}
                                type="name"
                                placeholder="Enter your name"
                                
                                />
                                </FormControl>
                                <FormMessage/>
                                </FormItem>
                            )}
                        />
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
                                placeholder="Enter your password"
                                
                                />
                                </FormControl>
                                <FormMessage/>
                                </FormItem>
                            )}
                        />

          <Button disabled={isPending} size="lg" className="w-full">
            Register
          </Button>
        </form>
        </Form>
      </CardContent>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7 flex flex-col gap-y-4">
        <Button
          disabled={isPending}
          variant="secondary"
          size="lg"
          className="w-full"
        >
          <FaGoogle className="mr-2 size-5" />
          Login With Google
        </Button>
        <Button
          disabled={isPending}
          variant="secondary"
          size="lg"
          className="w-full"
        >
          <FaGithub className="mr-2 size-5" />
          Login With Github
        </Button>
      </CardContent>
      <div className="px-7">
                    <DottedSeparator/>
                </div>
                    <CardContent className="p-2 flex items-center justify-center">
                        <p>
                            Already have an account? 
                            <Link href="/sign-in">
                            <span className="text-blue-700">
                                &nbsp;Sign In
                            </span>

                            </Link>
                        </p>
                    </CardContent>
    </Card>
  );
};
