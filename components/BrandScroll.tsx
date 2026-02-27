"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const brands = [
    { name: "UltraTech Cement", domain: "ultratechcement.com" },
    { name: "Tata Steel", domain: "tatasteel.com" },
    { name: "Asian Paints", domain: "asianpaints.com" },
    { name: "Berger Paints", domain: "bergerpaints.com" },
    { name: "JSW Steel", domain: "jsw.in" },
    { name: "Kajaria", domain: "kajariaceramics.com" },
    { name: "Astral Pipes", domain: "astralpipes.com" },
    { name: "Polycab", domain: "polycab.com" },
    { name: "Havells", domain: "havells.com" },
    { name: "Philips", domain: "philips.com" },
    { name: "Schneider Electric", domain: "se.com" },
    { name: "Ashirvad Pipes", domain: "ashirvad.com" },
    { name: "Saint-Gobain", domain: "saint-gobain.com" },
    { name: "Jaquar", domain: "jaquar.com" },
    { name: "Hindware", domain: "hindware.com" },
    { name: "ACC Cement", domain: "acclimited.com" },
    { name: "Nerolac", domain: "nerolac.com" },
    { name: "Pidilite", domain: "pidilite.com" },
];

function BrandItem({ brand }: { brand: typeof brands[0] }) {
    const [hasError, setHasError] = useState(false);

    return (
        <div className="relative h-12 w-32 flex-shrink-0 grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100 flex items-center justify-center">
            {!hasError ? (
                <Image
                    src={`https://logo.clearbit.com/${brand.domain}`}
                    alt={brand.name}
                    width={100}
                    height={40}
                    className="max-h-10 max-w-full object-contain"
                    onError={() => setHasError(true)}
                    unoptimized={true} // Bypasses Next.js image optimization for faster loading of simple external logos
                />
            ) : (
                <div className="px-3 py-1 bg-gray-50 border border-gray-100 rounded-lg text-[10px] font-bold text-gray-400 uppercase tracking-tighter text-center">
                    {brand.name}
                </div>
            )}
        </div>
    );
}

export function BrandScroll() {
    return (
        <section className="py-12 bg-white border-y border-gray-50 overflow-hidden">
            <div className="container mx-auto px-4 mb-8 text-center">
                <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] mb-2">Technical Partners</p>
                <div className="h-0.5 w-12 bg-secondary/10 mx-auto"></div>
            </div>

            <div className="flex relative overflow-hidden group">
                {/* Visual Depth Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none"></div>

                <motion.div
                    className="flex gap-20 items-center py-2"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        duration: 60,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    style={{ width: "fit-content" }}
                >
                    {/* Duplicate set for seamless infinite loop */}
                    {[...brands, ...brands].map((brand, index) => (
                        <BrandItem key={`${brand.name}-${index}`} brand={brand} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
