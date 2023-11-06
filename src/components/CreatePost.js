import { useState } from "react";
import styles from "../styles/home.module.css";
import { addPost } from "../api";
import { useToasts } from "react-toast-notifications";

const CreatePost = () => {
  const [post, setPost] = useState("");
  const [addingPost, setAddingPost] = useState(false);
  const { addToast } = useToasts();

  const handlePostClick = async () => {
    setAddingPost(true);

    const response = await addPost(post);
    console.log("Post response", response);

    if (response.success) {
      setPost("");
      addToast("Posted Successfully", {
        appearance: "success",
      });
    } else {
      addToast(response.message, {
        appearance: "error",
      });
    }

    setAddingPost(false);
  };

  return (
    <div className={styles.createPost}>
      <textarea
        placeholder="Add post..."
        className={styles.addPost}
        value={post}
        onChange={(e) => setPost(e.target.value)}
      />
      <div>
        <button
          disabled={addingPost}
          className={styles.addPostBtn}
          onClick={handlePostClick}
        >
          {addingPost ? "Posting..." : "Add post"}
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
