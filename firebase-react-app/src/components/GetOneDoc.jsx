import { query } from "firebase/firestore";
import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FirebaseContext } from "../providers/FirebaseProvider";

const GetOneDoc = () => {
  const params = useParams();
  const { id } = params;
  const [theDoc, setTheDoc] = useState();
  const fbContext = useContext(FirebaseContext);
  const { db } = fbContext;

  useEffect(() => {
    const collectionRef = collection(db, "docs");
    const queryRef = query(collectionRef, id);
    const unsub = onSnapshot(queryRef, (snapshot) => {
      const doc = snapshot.data();
      setTheDoc(doc);
    });
    return unsub;
  }, [id]);

  return (
    <div>
      <h3>Get One Doc</h3>
      <p>{theDoc && theDoc.title}</p>
    </div>
  );
};

export default GetOneDoc;
