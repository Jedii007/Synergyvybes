"use client";

import { useLoading } from "@/context/LoadingContext";
import Image from "next/image";

export default function LoadingSpinner() {
    const { isLoading } = useLoading();

    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-black">
            <div className="relative">
                <div className="h-24 w-24 rounded-full border-t-4 border-b-4 border-[#e68531] animate-spin"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Image
                        src="/loo.png"
                        alt="SYNERGY Logo"
                        width={58}
                        height={58}
                        className="rounded-full object-contain"
                    />
                </div>
            </div>
        </div>
    );
}