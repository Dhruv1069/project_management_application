import { getCurrent } from "@/feature/auth/queries";
import { redirect } from "next/navigation";

// 1. Define the type for the async params
interface WorkspaceIdPageProps {
  params: Promise<{ workspaceId: string }>;
}

const WorkspaceIdPage = async ({ 
  params 
}: WorkspaceIdPageProps) => {
    const user = await getCurrent();
    if (!user) redirect("/sign-in");

    const { workspaceId } = await params;

    return ( 
        <div>
            Workspace ID: 
        </div> 
    );
}
 
export default WorkspaceIdPage;