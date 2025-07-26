"use client"
import { useRouter, useSearchParams } from "next/navigation";

export default function Filter() {
    const router = useRouter();
    const searchParams = useSearchParams();

    function handleFilter(filter) {
        const params = new URLSearchParams(searchParams);
        params.set("capacity", filter);
        
        router.replace(`?${params.toString()}`);
    }

    return (
        <div className="flex justify-end">
            <ul className="flex items-center border-primary-800 border w-fit mb-8">
                <li className={`p-2 px-5 cursor-pointer hover:bg-primary-800 transition-colors
                    ${searchParams.get("capacity") === "all" ? "bg-primary-800" : ""} ${!searchParams.get("capacity")&& "bg-primary-800"}`}
                    onClick={() => handleFilter("all")}>All cabins</li>
                <li className={`p-2 px-5 cursor-pointer hover:bg-primary-800 transition-colors ${searchParams.get("capacity") === "small"?"bg-primary-800":""}`}
                    onClick={() => handleFilter("small")}>2-3 guests</li>
                <li className={`p-2 px-5 cursor-pointer hover:bg-primary-800 transition-colors ${searchParams.get("capacity") === "medium"?"bg-primary-800":""}`}
                    onClick={() => handleFilter("medium")}>4-7 guests</li>
                <li className={`p-2 px-5 cursor-pointer hover:bg-primary-800 transition-colors ${searchParams.get("capacity") === "large"?"bg-primary-800":""}`}
                    onClick={() => handleFilter("large")}>8-12 guests</li>
            </ul>
        </div>
    );
}