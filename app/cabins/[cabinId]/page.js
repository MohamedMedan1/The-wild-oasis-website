import Reservation from "@/app/_components/Reservation";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import Cabin from "@/app/_components/Cabin";
import { Suspense } from "react";
import Spinner from "@/app/_components/Spinner";

export async function generateMetadata({params}) {
    const {name} = await getCabin(params.cabinId);
    if (!name) return null;

    return { title: `Cabin ${name}` }
}

export async function generateStaticParams() {
    const cabins = await getCabins();
    const ids = cabins?.map((cabin) => ({ cabinId: String(cabin.id) })) ?? [];

    if (!ids.length) return null;
    return ids;
}

export default async function Page({ params }) {
    const { cabinId } = params;
    const cabin = await getCabin(cabinId);    
    
    if (!cabin) return null;

    return (
        <div className=" mt-8">
            <Cabin cabin={cabin} />
            <div>
                <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
                    Reserve {cabin?.name}. Pay on arrival.
                </h2>
            </div>
            <Suspense fallback={<Spinner />}>
                <Reservation cabin={cabin} />
            </Suspense>
        </div>
    );
}
