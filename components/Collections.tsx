import ALLCollectionsComponent from "./ALLCollectionsComponent";

const Collections = async () => {

    return (
        <div className="flex flex-col items-center gap-10 py-8 px-5">
            <p className="text-heading1-bold">Collections</p>
            <ALLCollectionsComponent />
        </div>
    );
};

export default Collections;