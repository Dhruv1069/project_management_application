import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { QueryErrorResetBoundary, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/rpc";

import { toast } from "sonner";

//being less specific and more explicit by remove json

type ResponseType = InferResponseType<typeof client.api.workspaces[":workspaceId"]["join"]["$post"], 200>;
type RequestType = InferRequestType<typeof client.api.workspaces[":workspaceId"]["join"]["$post"]>;

export const useJoinWorkspace = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async ({param , json}) => {
            const response = await client.api.workspaces[":workspaceId"]["join"]["$post"]({ param, json });
            
            if(!response.ok) {
                throw new Error("Something went wrong");
            }

            return await response.json();
        },
        onSuccess: ({ data })=>{
            toast.success("Joined workspace");
            queryClient.invalidateQueries({queryKey: ["workspaces"]}); //this will not do anything but will work after adding useGetQuery
            queryClient.invalidateQueries({queryKey: ["workspace", data.$id]});
        },
        
        onError: () => {
            toast.error("Failed to join workspace");
        }
    });

    return mutation;
};