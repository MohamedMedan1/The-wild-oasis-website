import Spinner from "@/app/_components/Spinner";

export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <Spinner />
            <p className="text-xl text-primary-200">Loading cabin Data ...</p>
        </div>
    );
}