"use client";
import React from "react";
import { WavyBackground } from "./wavy-background";

export function CollectionHeading({ title, description }: { title: string, description: string }) {
    return (
        <WavyBackground waveWidth={20}>
            <p className="text-3xl md:text-4xl lg:text-6xl text-white font-bold inter-var text-center">
                {title}
            </p>
            {description != "" &&
                <p className="text-base w-[95%] mx-auto md:text-lg mt-4 text-white font-normal inter-var text-center">
                    {description}
                </p>
            }
        </WavyBackground>
    );
}
