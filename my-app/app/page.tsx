"use client"

import { Button } from "@/components/ui/button";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import { useCurrent } from "@/feature/auth/api/use-current";
import { useLogout } from "@/feature/auth/api/use-logout";
import { Butterfly_Kids } from "next/font/google";
// import { TestComponent } from "@/feature/test";
// import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { data, isLoading } = useCurrent();
  const {mutate} = useLogout();

  useEffect(()=> {
    if(!data && !isLoading){
      router.push("/sign-in")
    }
  }, [data]);
  return (
   <div>
    only visible to admin
    <Button onClick = {()=>mutate()}>
      Logout
    </Button>
   </div>
  );
}
