import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { CreateWorkspaceModal } from "@/feature/workspaces/components/create-workspace-modal";

interface dashboard {
    children: React.ReactNode;
};

const dashboardLayout = ({children} : dashboard) => {
    return(
        <div className="min-h-screen">
            <CreateWorkspaceModal/>
            <div className="flex w-full h-full">
                <div className="fixed left-0 top-00 hidden lg:block lg:w-66 h-full overflow-y-auto">
                    <Sidebar />
                </div>
                <div className="lg:pl-66 w-full">
                    <div className="mx-auto max-w-screen-2xl h-full">
                        <Navbar />
                        <main className="h-full py-8 px-6 flex flex-col">
                            {children}
                        </main>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default dashboardLayout;