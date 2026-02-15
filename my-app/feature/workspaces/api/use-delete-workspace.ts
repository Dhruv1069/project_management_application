import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { QueryErrorResetBoundary, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/rpc";

import { toast } from "sonner";

//being less specific and more explicit by remove json

type ResponseType = InferResponseType<typeof client.api.workspaces[":workspaceId"]["$delete"], 201>;
type RequestType = InferRequestType<typeof client.api.workspaces[":workspaceId"]["$delete"]>;

export const useDeleteWorkspace = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async ({param}) => {
            const response = await client.api.workspaces[":workspaceId"]["$delete"]({ param });
            
            if(!response.ok) {
                throw new Error("Something went wrong");
            }

            return await response.json();
        },
        onSuccess: ({ data })=>{
            toast.success("Workspace deleted");
            queryClient.invalidateQueries({queryKey: ["workspaces"]}); //this will not do anything but will work after adding useGetQuery
            queryClient.invalidateQueries({queryKey: ["workspace", data.$id]});
        },
        
        onError: () => {
            toast.error("Failed to delete workspace");
        }
    });

    return mutation;
};