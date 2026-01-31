"use client"

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
interface AuthLayoutProps{
    children: React.ReactNode;
};

const AuthLayout = ({children}: AuthLayoutProps) => {
    const pathname = usePathname();
    const isSignIn = pathname === "/sign-in"; 

    return ( 
        <main className="bg-neutral-100 min-h-screen">
            {/* <Image src="/logo.svg" height={50} width={100} alt="logo"/> */}
            <div className="p-4 ">
                <nav className="flex items-center justify-between">
                    <Image src="/logo.svg" alt="logo" width={152} height={56}/>
                    <Button asChild variant="secondary">
                        <Link href={isSignIn ? "/sign-up" : "/sign-in"}>
                        {isSignIn ? "Sign Up" : "Login"}
                        </Link>
                    </Button>
                </nav>
                <div className="felx-col flex items-center justify-center pt-4 md:14">

                    {children}
                </div>
            </div>
        </main>
     );
}
 
export default AuthLayout;  