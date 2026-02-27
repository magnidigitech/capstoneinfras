"use client";

import { motion } from "framer-motion";

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

export function BrandScroll() {
    return (
        <section className="py-10 bg-white border-b border-gray-100 overflow-hidden">
            <div className="container mx-auto px-4 mb-6 text-center">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Trusted Brands We Use</p>
            </div>

            <div className="flex relative overflow-hidden">
                {/* Gradient Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10"></div>
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10"></div>

                <motion.div
                    className="flex gap-16 items-center"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        duration: 40,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    style={{ width: "fit-content" }}
                >
                    {/* Duplicate the list to create seamless loop */}
                    {[...brands, ...brands].map((brand, index) => (
                        <div key={`${brand.name}-${index}`} className="relative h-12 w-32 flex-shrink-0 grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100 flex items-center justify-center">
                            {/* Using standard img tag to avoid Next.js remote pattern issues and allow fallback */}
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={`https://cdn.brandfetch.io/${brand.domain}/w/200/h/100?c=1id/theme=light`}
                                alt={brand.name}
                                className="max-h-12 max-w-full object-contain"
                                onError={(e) => {
                                    // Fallback to text if image fails
                                    (e.target as HTMLImageElement).style.display = 'none';
                                    const parent = (e.target as HTMLImageElement).parentElement;
                                    if (parent) {
                                        parent.innerText = brand.name;
                                        parent.className = "relative h-12 w-32 flex-shrink-0 flex items-center justify-center text-xs font-bold text-gray-400 text-center border border-gray-100 rounded bg-gray-50 p-2";
                                    }
                                }}
                            />
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
