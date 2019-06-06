export const ADD_NEW_COLLECTION = 'ADD_NEW_COLLECTION';
export function addNewCollection(collection, typeStr) {
  return (dispatch, getState, { getFirestore }) => {

    let currentdate = new Date();
    let month, date, hour, minute;
    if ((currentdate.getMonth() + 1) < 10) {
      month = `0${currentdate.getMonth() + 1}`;
    } else {
      month = currentdate.getMonth() + 1;
    }
    if (currentdate.getDate() < 10) {
      date = `0${currentdate.getDate()}`;
    } else {
      date = currentdate.getDate();
    }
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
    let datetime = currentdate.getFullYear() + '-'
      + month + '-'
      + date + ' '
      + hour + ':'
      + minute;

    // 刪除不必要的key
    let newContent = collection.content.slice();
    for (let i = 0; i < newContent.length; i++) {
      delete newContent[i]['empty'];
    }

    const firestore = getFirestore();
    firestore.collection('collection').add({
      ...collection,
      timestamp: datetime,
      copyFrom: ''
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
      let month, date, hour, minute;
      if ((currentdate.getMonth() + 1) < 10) {
        month = `0${currentdate.getMonth() + 1}`;
      } else {
        month = currentdate.getMonth() + 1;
      }
      if (currentdate.getDate() < 10) {
        date = `0${currentdate.getDate()}`;
      } else {
        date = currentdate.getDate();
      }
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
      let datetime = currentdate.getFullYear() + '-'
        + month + '-'
        + date + ' '
        + hour + ':'
        + minute;

      let copyData = collection.data();
      let copyContent = copyData.content.slice();
      for (let i = 0; i < copyContent.length; i++) {
        copyContent[i].familiarity = 0;
      }
      copyData = {
        ...copyData,
        content: copyContent,
        copyFrom: id,
        user_id: user.user_id,
        user_photo: user.user_photo,
        author: user.user_name,
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

    // 刪除不必要的key
    let newContent = collection.content.slice();
    for (let i = 0; i < newContent.length; i++) {
      delete newContent[i]['showWord'];
      delete newContent[i]['showDef'];
      delete newContent[i]['empty'];
    }

    const firestore = getFirestore();
    firestore.collection('collection').doc(id).set({
      ...collection,
      content: newContent
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