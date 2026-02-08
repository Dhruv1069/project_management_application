
import { getCurrent } from "@/feature/auth/actions";
import { UserButton } from "@/feature/auth/components/user-button";
import { redirect } from "next/navigation";


export default async function Home() {

  const user = await getCurrent();
  if(!user) redirect("/sign-in")
  return (
   <div>
    <UserButton/>
   </div>
  );
};
