import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { QueryErrorResetBoundary, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/rpc";

import { toast } from "sonner";

//being less specific and more explicit by remove json

type ResponseType = InferResponseType<typeof client.api.workspaces["$post"]>;
type RequestType = InferRequestType<typeof client.api.workspaces["$post"]>;

export const useCreateWorkspace = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async ({json}) => {
            const response = await client.api.workspaces["$post"]({ json });
            
            if(!response.ok) {
                throw new Error("Something went wrong");
            }

            return await response.json();
        },
        onSuccess: ()=>{
            toast.success("Workspace created");
            queryClient.invalidateQueries({queryKey: ["workspaces"]}); //this will not do anything but will work after adding useGetQuery
        },
        
        onError: () => {
            toast.error("Failed to create workspace");
        }
    });

    return mutation;
};