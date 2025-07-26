import { auth } from "../_lib/auth";

export const metadata = {
    title:"Guest Area",
}
export default async function Page() {
    const session = await auth();
    const firstName = session?.user?.name.split(" ").at(0) ?? " ";

    return (
        <h3 className="text-accent-400 text-2xl">Welcome, {firstName}</h3>
    );
}