import { getCurrent } from "@/feature/auth/queries";
import { MembersList } from "@/feature/workspaces/components/members-list";
import { redirect } from "next/navigation";

const WorkspaceIdMemberPage = async () => {
    const user = await getCurrent();
    if(!user) redirect("/sign-in");

    return(
        <div className="w-full Lg:max-w-xl">
            <MembersList />
        </div>
    );
};

export default WorkspaceIdMemberPage;