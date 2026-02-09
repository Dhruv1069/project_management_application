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
import { cn } from "@/lib/utils"

interface createWorkspaceFormProps {
    onCancel?: () => void; //optional prop
};

export const CreateWorkspaceForm = ({onCancel} : createWorkspaceFormProps) => {
    const { mutate, isPending } = useCreateWorkspace();
     
    const form = useForm<z.infer<typeof createWorkspaceSchema>>({
        resolver: zodResolver(createWorkspaceSchema),
        defaultValues: {
            name: "",
        },
    });

    const onSubmit = (values: z.infer<typeof createWorkspaceSchema>) => {
        mutate({ json: values }, {
            onSuccess: () => {
            form.reset();
            onCancel?.(); // Close the modal automatically on success
            }
        });
    };

    return (
        <Card className="w-full h-full border-none shadow-none">
            <CardHeader className="flex p-7">
                <CardTitle className="text-xl font-bold">
                    Create a new workspace
                </CardTitle>
            </CardHeader>
            <div className="p-7">
                <DottedSeparator />
            </div>
            <CardContent className="p-7">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-y-4">
                            <FormField 
                                control={form.control}
                                name="name"
                                render={({ field }) => ( // 1. We destructure 'field' here
                                    <FormItem>
                                    <FormLabel>Workspace Name</FormLabel>
                                    <FormControl>
                                        <Input 
                                        {...field} // 2. Spread 'field' here, NOT 'form'
                                        placeholder="Enter workspace name" 
                                        disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DottedSeparator className="py-7"/>
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
            
                            <Button type="submit" size="lg" variant="primary" disabled={isPending}>
                                Create workspace
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