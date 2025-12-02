"use client";
import React from "react";
import ModernBanner from "./ModernBanner";

export function PageHeader({ title, description, image }: { title: string, description?: string, image?: string }) {
    return (
        <ModernBanner title={title} description={description} image={image} />
    );
}
