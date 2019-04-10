export const ADD_NEW_COLLECTION = 'ADD_NEW_COLLECTION';

export function addNewCollection(collection) {
    return (dispatch, getState, { getFirebase, getFirestore }) => {

        let currentdate = new Date();
        let datetime = currentdate.getFullYear() + "/"
            + (currentdate.getMonth() + 1) + "/"
            + currentdate.getDate() + " "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes();

        const firestore = getFirestore();
        firestore.collection('collection').add({
            ...collection,
            user_id: '62aZObMlvFX35VJ8t8Vg1BfLedi1',
            author: 'Amy Huang',
            important: false,
            timestamp: datetime
        }).then(() => {
            dispatch({ type: ADD_NEW_COLLECTION, collection });
        }).catch((error) => {
            console.log(error);
        });

    }
}