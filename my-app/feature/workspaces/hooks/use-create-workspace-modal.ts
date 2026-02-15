import {useQueryState, parseAsBoolean} from "nuqs"


export const useCreateWorkspaceModal =()=>{
    const [isOpen, setIsOpen] = useQueryState(
        "create-workspace",
        parseAsBoolean.withDefault(false).withOptions({clearOnDefault: true})
    )

    // clearOnDefault will basically clear the url once the create workspace dialog is closed
    //so rather than the url being localhost/create-workspce=false it will be localhost

    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);


    return {
        isOpen, 
        open,
        close,
        setIsOpen,
    }
}