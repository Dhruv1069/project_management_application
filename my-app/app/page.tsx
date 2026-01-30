import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TestComponent } from "@/feature/test";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex ">
      <Input/>
      <Button>
        primary
      </Button>
      <Button variant="secondary">
        secondary
      </Button>
      <Button variant="destructive">
        destructive
      </Button>
      <Button variant="ghost">
        ghost
      </Button>
      <Button variant="link">
        link
      </Button>
      <Button variant="outline">
        outline
      </Button>
      <Button variant="teritary">
        teritary
      </Button>
    </div>
  );
}
