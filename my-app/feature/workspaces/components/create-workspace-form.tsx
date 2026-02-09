"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createWorkspaceSchema } from "../schemas";
import z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { DottedSeparator } from "@/components/dotted-separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateWorkspace } from "../api/use-create-workspace";
import React, { useRef } from "react";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ImageIcon } from "lucide-react";


interface createWorkspaceFormProps {
    onCancel?: () => void; //optional prop
};

export const CreateWorkspaceForm = ({onCancel} : createWorkspaceFormProps) => {
    const { mutate, isPending } = useCreateWorkspace();

    const inputRef = useRef<HTMLInputElement>(null);
     
    const form = useForm<z.infer<typeof createWorkspaceSchema>>({
        resolver: zodResolver(createWorkspaceSchema),
        defaultValues: {
            name: "",
        },
    });

    const onSubmit = (values: z.infer<typeof createWorkspaceSchema>) => {
        const finalValues = {
        ...values,
        image: values.image instanceof File ? values.image : "",
        };

        mutate({ form: finalValues }, {
            onSuccess: () => {
                form.reset();
                onCancel?.();
            }
        });
    };
    

    const handleImageChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        
        if(file) {
            form.setValue("image", file)
        }
    }

    return (
        <Card className="w-full h-full border-none shadow-none">
            <CardHeader className="flex p-7">
                <CardTitle className="text-xl font-bold">
                    Create a new workspace
                </CardTitle>
            </CardHeader>
                <div className="px-7">
                    <DottedSeparator />
                </div>
            <CardContent className="p-7">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-y-4">
                            <FormField 
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Workspace Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Enter workspace name" disabled={isPending} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="image"
                                render={({ field }) => (
                                    <div className="flex flex-col gap-y-2">
                                        <div className="flex items-center gap-x-5">
                                            {field.value ? (
                                                <div className="size-18 relative rounded-md overflow-hidden border border-neutral-200">
                                                    <Image 
                                                        src={field.value instanceof File ? URL.createObjectURL(field.value) : field.value}
                                                        alt="Logo"
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                            ) : (
                                                <Avatar className="size-18">
                                                    <AvatarFallback className="bg-neutral-100">
                                                        <ImageIcon className="size-9 text-neutral-400"/>
                                                    </AvatarFallback>
                                                </Avatar>
                                            )}
                                            <div className="flex flex-col">
                                                <p className="text-sm font-medium">Workspace Icon</p>
                                                <p className="text-xs text-muted-foreground">JPG, PNG, SVG or JPEG, max 1MB</p>
                                                <input 
                                                    className="hidden"
                                                    accept=".jpg, .png, .jpeg, .svg"
                                                    type="file"
                                                    ref={inputRef}
                                                    disabled={isPending}
                                                    onChange={handleImageChange}
                                                />
                                                <Button 
                                                    type="button" 
                                                    disabled={isPending} 
                                                    variant="teritary" 
                                                    size="xs" 
                                                    className="w-fit mt-2 bg-[#DDE7FF] text-[#2563EB] hover:bg-[#DDE7FF]/80 shadow-none font-semibold" 
                                                    onClick={() => inputRef.current?.click()}
                                                >
                                                    Upload Image
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            />
                        </div>
                        
                        <DottedSeparator className="my-7"/>
                        
                        <div className="flex items-center justify-between">
                            <Button 
                                type="button" 
                                size="lg" 
                                variant="secondary" 
                                onClick={onCancel}
                                disabled={isPending} 
                            >
                                Cancel
                            </Button>
                            <Button type="submit" size="lg" variant="primary" disabled={isPending} className="bg-[#2563EB]">
                                Create Workspace
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
};

//we will use this form in many different ways. 
//one is being used in a model for that it needs to have proper instructions about how to close that model
//thats why onCancel is added

//useRef will help in opening the file explorer