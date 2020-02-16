export const updateObject = (oldObject, updadtedProperties) => {
    return {
        ...oldObject,
        ...updadtedProperties
    };
};
