export const ADD_NEW_COLLECTION = 'ADD_NEW_COLLECTION';
export function addNewCollection(collection) {
    return (dispatch, getState, { getFirebase, getFirestore }) => {

        let currentdate = new Date();
        let hour, minute;
        if (currentdate.getHours() < 10) {
            hour = `0${currentdate.getHours()}`;
        } else {
            hour = currentdate.getHours();
        }
        if (currentdate.getMinutes() < 10) {
            minute = `0${currentdate.getMinutes()}`;
        } else {
            minute = currentdate.getMinutes();
        }
        let datetime = currentdate.getFullYear() + "/"
            + (currentdate.getMonth() + 1) + "/"
            + currentdate.getDate() + " "
            + hour + ":"
            + minute;

        const firestore = getFirestore();
        firestore.collection('collection').add({
            ...collection,
            important: false,
            timestamp: datetime,
            copyFromOther: false
        }).then(() => {
            dispatch({ type: ADD_NEW_COLLECTION, collection });
        }).catch((error) => {
            console.log(error);
        });

    }
}

export const UPDATE_COLLECTION = 'UPDATE_COLLECTION';
export function updateCollection(collection, id) {
    return (dispatch, getState, { getFirebase, getFirestore }) => {

        const firestore = getFirestore();
        firestore.collection('collection').doc(id).set({
            ...collection
        }).then(() => {
            dispatch({ type: UPDATE_COLLECTION, collection });
        }).catch((error) => {
            console.log(error);
        });

    }
}

export const DELETE_COLLECTION = 'DELETE_COLLECTION';
export function deleteCollection(id) {
    return (dispatch, getState, { getFirebase, getFirestore }) => {

        const firestore = getFirestore();
        firestore.collection('collection').doc(id).delete().then(() => {
            dispatch({ type: DELETE_COLLECTION });
        }).catch((error) => {
            console.log(error);
        });
    }
}

export const ALREADY_HAD_COLLECTION = 'ALREADY_HAD_COLLECTION';
export function alreadyHadCollection(status) {
    return { type: ALREADY_HAD_COLLECTION, status }
}

export const GET_COLLECTION = 'GET_COLLECTION';
export function getCollection() {
    return { type: GET_COLLECTION }
}