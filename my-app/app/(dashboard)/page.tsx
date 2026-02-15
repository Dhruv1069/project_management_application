
import { getCurrent } from "@/feature/auth/queries";
import { redirect } from "next/navigation";

import { CreateWorkspaceForm } from "@/feature/workspaces/components/create-workspace-form"
import { getWorkspaces } from "@/feature/workspaces/queries";


export default async function Home() {

  const user = await getCurrent();
  if(!user) redirect("/sign-in")

    const workspaces  = await getWorkspaces();
    if(workspaces.total === 0){
      redirect("/workspaces/create");
    } else{
      redirect(`/workspaces/${workspaces.documents[0].$id}`);
    }
};
