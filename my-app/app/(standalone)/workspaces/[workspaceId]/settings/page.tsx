import { getCurrent } from "@/feature/auth/actions";
import { getworkspace, getworkspaces } from "@/feature/workspaces/actions";
import { EditWorkspaceForm } from "@/feature/workspaces/components/edit-workspace-form";
import { redirect } from "next/navigation";

// 1. Update the type to be a Promise
interface WorkspaceIdSettingsPageProps {
    params: Promise<{
        workspaceId: string;
    }>;
};

const WorkspaceIdSettingsPage = async ({
    params,
}: WorkspaceIdSettingsPageProps) => {
    const user = await getCurrent();
    const { workspaceId } = await params;
    
    if (!user) redirect("/sign-in");

    const initialValues = await getworkspace({workspaceId})

    if(!initialValues){
        redirect(`/workspaces/${workspaceId}`)
    }

    // 2. Await the params to get the actual ID

    return ( 
        <div className="w-full lg:max-w-xl">
            <EditWorkspaceForm initialValues={initialValues}/>
        </div>
     );
}
 
export default WorkspaceIdSettingsPage;