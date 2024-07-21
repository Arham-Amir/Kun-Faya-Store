import { CollectionHeading } from '@/components/collection/CollectionHeading'
import ALLCollectionsComponent from "@/components/ALLCollectionsComponent";
import React from 'react'

const Collections = () => {
    return (
        <div className='flex flex-col gap-14'>
            <CollectionHeading title={"Collections"} description={"Browse all collections to find the best products."} />
            <ALLCollectionsComponent />
        </div>
    )
}

export default Collections
