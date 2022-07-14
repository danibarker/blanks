import { addDoc, setDoc } from "firebase/firestore";
import React, { useContext } from "react";
import { FirebaseContext } from "../providers/FirebaseProvider";

const CreateDoc = () => {
  const fbContext = useContext(FirebaseContext);
  const { db } = fbContext;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const collectionRef = collection(db, "docs");
    await addDoc(collectionRef, { title, content });
    setTitle("");
    setContent("");
  };
  return (
    <div>
      <h3>Create Doc</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateDoc;
