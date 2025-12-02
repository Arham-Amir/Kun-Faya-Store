import { CollectionHeading } from '@/components/collection/CollectionHeading'
import ALLCollectionsComponent from "@/components/ALLCollectionsComponent";
import React from 'react'

const Collections = () => {
    return (
        <div className='flex flex-col gap-14'>
            <CollectionHeading
                title="Our Collections"
                description="Browse through our curated collections to find the perfect pieces for your style"
            />
            <div className="py-10 px-4 md:px-10">
                <ALLCollectionsComponent />
            </div>
        </div>
    )
}

export default Collections
