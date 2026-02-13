
import { getCurrent } from "@/feature/auth/actions";
import { redirect } from "next/navigation";

import { CreateWorkspaceForm } from "@/feature/workspaces/components/create-workspace-form"
import { getworkspaces } from "@/feature/workspaces/actions";


export default async function Home() {

  const user = await getCurrent();
  if(!user) redirect("/sign-in")

    const workspaces  = await getworkspaces();
    if(workspaces.total === 0){
      redirect("/workspaces/create");
    } else{
      redirect(`/workspaces/${workspaces.documents[0].$id}`);
    }
};
