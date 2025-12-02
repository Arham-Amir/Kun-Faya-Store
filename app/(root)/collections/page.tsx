import { CollectionHeading } from '@/components/collection/CollectionHeading'
import ALLCollectionsComponent from "@/components/ALLCollectionsComponent";
import React from 'react'

const Collections = () => {
    return (
        <div className='flex flex-col gap-14 py-10 px-4 md:px-10'>
            <div className="flex flex-col items-center gap-4 text-center max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                    Our <span className="text-primary">Collections</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-500">
                    Browse through our curated collections to find the perfect pieces for your style
                </p>
            </div>
            <ALLCollectionsComponent />
        </div>
    )
}

export default Collections
