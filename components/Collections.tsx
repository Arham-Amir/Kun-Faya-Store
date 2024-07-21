import ALLCollectionsComponent from "./ALLCollectionsComponent";

const Collections = async () => {

    return (
        <div id="collections" className="flex flex-col items-center gap-8 py-8 px-5">
            <div className="flex flex-col gap-4 items-center">
                <h2 className="text-heading2-bold sm:text-heading1-bold tracking-wide">Collections</h2>
                <p className="text-body-medium text-grey-2 text-center">Browse all collections to find the best products.</p>
            </div>
            <ALLCollectionsComponent />
        </div>
    );
};

export default Collections;