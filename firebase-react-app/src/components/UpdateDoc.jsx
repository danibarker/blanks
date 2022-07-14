import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

const UpdateDoc = () => {
  const fbContext = useContext(FirebaseContext);
  const { db } = fbContext;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const params = useParams();
  const { id } = params;
  useEffect(() => {
    const collectionRef = collection(db, "docs");
    const queryRef = query(collectionRef, id);
    const unsub = onSnapshot(queryRef, (snapshot) => {
      const doc = snapshot.data();
      setTitle(doc.title);
      setContent(doc.content);
    });
    return unsub;
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const collectionRef = collection(db, "docs");
    await setDoc(collectionRef, id, { title, content });
    setTitle("");
    setContent("");
  };
  return (
    <div>
      <h3>Update Doc</h3>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Content"
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UpdateDoc;
