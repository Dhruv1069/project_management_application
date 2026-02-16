import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { QueryErrorResetBoundary, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/rpc";

import { toast } from "sonner";

//being less specific and more explicit by remove json

type ResponseType = InferResponseType<typeof client.api.members[":memberId"]["$delete"], 200>;
type RequestType = InferRequestType<typeof client.api.members[":memberId"]["$delete"]>;

export const useDeleteMember = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async ({param}) => {
            const response = await client.api.members[":memberId"]["$delete"]({ param });
            
            if(!response.ok) {
                throw new Error("Something went wrong");
            }

            return await response.json();
        },
        onSuccess: ()=>{
            toast.success("Member deleted");
            queryClient.invalidateQueries({queryKey: ["members"]}); //this will not do anything but will work after adding useGetQuery
        },
        
        onError: () => {
            toast.error("Failed to delete member");
        }
    });

    return mutation;
};