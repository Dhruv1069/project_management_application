import { getCurrent } from "@/feature/auth/actions";
import { CreateWorkspaceForm } from "@/feature/workspaces/components/create-workspace-form";
import { redirect } from "next/navigation";

const WorkspaceCreatePage = async ()=>{
    const user = await getCurrent();
      if(!user) redirect("/sign-in")
    return(
        <div className="w-full lg:max-w-xl">
            <CreateWorkspaceForm/>
        </div>
    )
}

export default WorkspaceCreatePage;