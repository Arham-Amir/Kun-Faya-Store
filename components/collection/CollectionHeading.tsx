"use client";
import React from "react";
import AnimatedButton from "@/components/animatedButton";
import ModernBanner from "../ModernBanner";

export function CollectionHeading({ title, description, image }: { title: string, description: string, image?: string }) {
    return (
        <ModernBanner title={title} description={description} image={image}>
            <AnimatedButton to="products" text="View Collection" />
        </ModernBanner>
    );
}
