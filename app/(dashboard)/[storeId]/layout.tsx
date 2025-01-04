import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashbordLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: {storeId: string}
}) {
    const {userId} = auth();

    if (!userId) {
        redirect ("/sign-in");
    }

    const store =await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            userId
        }
    });

    if (!store) {
        redirect("/");
    }

    return (
        <>

        <div>This will be a navbar</div>
        {children}
        
        </>
    )
}