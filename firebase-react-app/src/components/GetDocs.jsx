import { collection, onSnapshot, query } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../providers/FirebaseProvider";
import { FirestoreContext } from "../providers/FirestoreProvider";

const GetDocs = () => {
  const [docs, setDocs] = useState([]);
  const fbContext = useContext(FirebaseContext);
  const { db } = fbContext;

  useEffect(() => {
    const collectionRef = collection(db, "docs");
    const queryRef = query(collectionRef);
    const unsub = onSnapshot(queryRef, (snapshot) => {
      const docs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDocs(docs);
    });
    return unsub;
  }, [db]);
  return (
    <div>
      <h3>Get Docs</h3>
      <ul>
        {docs.map((doc) => (
          <li key={doc.id}>{doc.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default GetDocs;
