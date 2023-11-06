import PropTypes from "prop-types";
import styles from "../styles/home.module.css";
import { Link } from "react-router-dom";
import Comment from "./Comment";
import { useState } from "react";
import { useToasts } from "react-toast-notifications";
import { createComment, toggleLike } from "../api";

const Post = ({ post }) => {
  const [comment, setComment] = useState("");
  const [creatingComment, setCreatingComment] = useState(false);
  const { addToast } = useToasts();

  const handleAddComment = async (e) => {
    if (e.key === "Enter") {
      setCreatingComment(true);

      const response = await createComment(comment, post._id);

      if (response.success) {
        setComment("");
        addToast("Comment created successfully!", {
          appearance: "success",
        });
      } else {
        addToast(response.message, {
          appearance: "error",
        });
      }
      setCreatingComment(false);
    }
  };

  const handlePostLikeClick = async () => {
    const response = await toggleLike(post._id, "Post");

    if (response.success) {
      if (response.data.deleted) {
        addToast("Like removed successfully!", {
          appearance: "success",
        });
      } else {
        addToast("Like added successfully!", {
          appearance: "success",
        });
      }
    } else {
      addToast(response.message, {
        appearance: "error",
      });
    }
  };

  return (
    <div className={styles.postWrapper} key={`post-${post._id}`}>
      <div className={styles.postHeader}>
        <div className={styles.postAvatar}>
          <img
            src="https://cdn-icons-png.flaticon.com/128/1144/1144760.png"
            alt="user-pic"
          />
          <div>
            <Link
              to={`/user/${post.user._id}`}
              // state={{ user: post.user }}
              className={styles.postAuthor}
            >
              {post.user.name}
            </Link>
            <span className={styles.postTime}>{post.createdAt}</span>
          </div>
        </div>
        <div className={styles.postContent}>{post.content}</div>

        <div className={styles.postActions}>
          <div className={styles.postLike}>
            <button onClick={handlePostLikeClick}>
              <img
                src="https://image.similarpng.com/very-thumbnail/2021/08/Instagram-Likes-icon-on-trabsparent-background-PNG.png"
                alt="likes-icon"
              />
            </button>
            <span>{post.likes.length}</span>
          </div>
          <div className={styles.postCommentsIcon}>
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH0AAAB9CAMAAAC4XpwXAAAAZlBMVEX///8AAAD8/PwpKSkgICDl5eXp6enu7u47OzsxMTHMzMzg4OCenp729vZ3d3fGxsa6urqQkJDS0tJPT0+wsLDa2tpHR0dCQkJiYmIXFxeGhoZXV1c2NjalpaV9fX2WlpZtbW0ODg63k5uvAAAEuklEQVRoge1b2ZaqMBAMyCoii4AIovL/P3lxpEOQEALp6H2wzpmnIEW6K5XOMoT88MMPP0jAfOLztHbcJLdjXXjeuaiPt6SJ7Y/wmnl2vBg8XI5ZqjUQdvzYcZkBVqkrCG5cWkJq+gEuOrd9E/eaxe6GG4C0lKZ+oUzRuPfnldxPnCMU7mCu363le2fPt9qZ9jpQ5g6T6csv5zKJ08BxXTfs/pwgjZOymI7DNgnVyKdB96so4A1rM4iq6yT8exXy+9vbrCYXPh807yPjvpnbHvflUskkMqjGKbhuHH3RyFy8RjaJYTZKl7VJ/M0o29kaAYXZKGrNevLDKHtrzTMcKeawlpz99WnLwLVP27VXqQXuDxnzjmrNDxPFjr8QMN1P5H/GCO6oYlfhcUME95sTNgEjH0nbcxTEOgEzdByZ502PPp8pk7Pa82SqvgqVnKWXEH6EGPYXhuAveq7pU7UjkRNClX9depKOdB+NnBDao4VR765TqCSGUSSeL2iQcBQHoMoTpjOAp0pUckJoZSry7aPMQ1sQSHSe5mfFnCAJquZ5PYHRtIqVMAfhouWEUA9h+QwL8BxvrmfU5nQsw80lw3uguxwLUPRj5uuggsZbf7KAqsHiRxYCj+mxLHxh6EEXqvXMHGDQ8TUNKxCllZ8AEPoztxUCj7/t8oILoec12n1brYmckLpn4K0rY20uC4DEx5y2g6ANB9A/nuzA5MX7AyrIBVYPXqRvxxWUxfPSXhMWZkk1hmPN6tosNA+4YcgVU6+FJYynkR0oBOz4lQUgFLD3Rnv9TuT7pf5OH7tAdVBbtPo0Lxpxt74Nu5geIHIbcGFdE6zYaTNBGw5Es0zatz20scNyiptbY3Y84MCF5QK31dA8yUFw+VUriB538TwACgj+Wgokqau0gqqVX1E7rVa/gUV0O2Om/Ry7eVtYjPtCaGF79qKFHUQ9JysbTlRwDvLGAFVZs5Ub2MFJAzvslj9mn6Cb0/idp3sD89MIzPH4BQ6UNUYtcFJIDvpUQ/dqRWsVKK+MFneWD0DP4l1ymh5c4dUyXSeDHaIuJmncl7ZF6KYiou5T+s7F6fMu/6gkbPrG2+KzIT1E83HWkw5Npsw4zumnehiTnTscCUrVq8MxDsKKMhxOwyU9hDmEVe39cNZhPGR/w5yfqil/3w5xlP4REy4lz2XOc/0VUXSG80ij3Jz8eHjJbtXwddi7I1ujP1x/uKz0jpC9OVFum3PorZHdavGa7M0Fo9ogfrrjft5QLZhHlt66r//+nt1az/3E6M6L0Upd9uGw77axk/Tt5tZp1a0bVfbhqIaiaObPTdKmqyIOtHpRZyfR5N6YYdWHKHdHJZKbR4e6H6QnmBoR2El4byf8HfyiLm9Jck+S26Mu/FHTHo+9qw4m4V9ChsjeTflr+StM9i6xiZjuHYWLyd7lP151q3W3R2XvYDcnmdvEL7QZwWV/fkBUefxL3N1E5lURG58Enf0Jd58l71moq2z/VwdUxgS47D1M1w7SNM3tsfHEn2GfQ/7ujh9lJ075TXZiVt9kH1+p/Dw7ya1vshO3/CY7k3zvC+xDWajvsEOI1/afxuNFMcLqfPpSz//wjX+j+uGHH/5L/APD5jAOAC2HFQAAAABJRU5ErkJggg=="
              alt="comments-icon"
            />
            <span>{post.comments.length}</span>
          </div>
        </div>
        <div className={styles.postCommentBox}>
          <input
            placeholder="Start typing a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={handleAddComment}
          />
        </div>

        <div className={styles.postCommentsList}>
          {post.comments.map((comment) => (
            <Comment
              comment={comment}
              key={`post-comment-${comment._id}`}
            ></Comment>
          ))}
        </div>
      </div>
    </div>
  );
};

Post.propTypes = {
  posts: PropTypes.object.isRequired,
};

export default Post;
