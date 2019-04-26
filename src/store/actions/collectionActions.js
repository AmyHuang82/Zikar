export const ADD_NEW_COLLECTION = 'ADD_NEW_COLLECTION';
export function addNewCollection(collection, typeStr) {
    return (dispatch, getState, { getFirestore }) => {

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
        let datetime = currentdate.getFullYear() + "-"
            + (currentdate.getMonth() + 1) + "-"
            + currentdate.getDate() + " "
            + hour + ":"
            + minute;


        const firestore = getFirestore();
        firestore.collection('collection').add({
            ...collection,
            timestamp: datetime,
            copyFromOther: false
        }).then(() => {
            dispatch({ type: ADD_NEW_COLLECTION, typeStr });
        }).catch((error) => {
            console.log(error);
            alert('發生問題請再試一次');
        });

    }
}

export const COPY_TO_SELF_COLLECTION = 'COPY_TO_SELF_COLLECTION';
export function copyToSelfCollection(id, user) {
    return (dispatch, getState, { getFirestore }) => {

        const firestore = getFirestore();
        firestore.collection('collection').doc(id).get({}).then((collection) => {
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
            let datetime = currentdate.getFullYear() + "-"
                + (currentdate.getMonth() + 1) + "-"
                + currentdate.getDate() + " "
                + hour + ":"
                + minute;

            let copyData = collection.data();
            copyData = {
                ...copyData,
                copyFromOther: true,
                user_id: user.user_id,
                user_name: user.user_name,
                timestamp: datetime
            }

            firestore.collection('collection').add({
                ...copyData
            }).then(() => {
                dispatch({ type: COPY_TO_SELF_COLLECTION });
                window.location.hash = '/';
            }).catch((error) => {
                console.log(error);
                alert('發生問題請再試一次');
            });

        }).catch((error) => {
            console.log(error);
            alert('發生問題請再試一次');
        });

    }
}

export const UPDATE_COLLECTION = 'UPDATE_COLLECTION';
export function updateCollection(collection, id, typeStr) {
    return (dispatch, getState, { getFirestore }) => {

        const firestore = getFirestore();
        firestore.collection('collection').doc(id).set({
            ...collection
        }).then(() => {
            dispatch({ type: UPDATE_COLLECTION, typeStr });
        }).catch((error) => {
            console.log(error);
            alert('發生問題請再試一次');
        });

    }
}

export const RESET_SUBMIT_STATUS = 'RESET_SUBMIT_STATUS';
export function resetSubmitStatus() {
    return { type: RESET_SUBMIT_STATUS }
}

export const DELETE_COLLECTION = 'DELETE_COLLECTION';
export function deleteCollection(id) {
    return (dispatch, getState, { getFirestore }) => {

        const firestore = getFirestore();
        firestore.collection('collection').doc(id).delete().then(() => {
            dispatch({ type: DELETE_COLLECTION });
        }).catch((error) => {
            console.log(error);
            alert('發生問題請再試一次');
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