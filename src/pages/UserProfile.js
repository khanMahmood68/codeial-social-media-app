import styles from "../styles/settings.module.css";
// import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { addFriend, fetchUserProfile, removeFriend } from "../api";
import { useToasts } from "react-toast-notifications";
import Loader from "../components/Loader";
import { useAuth } from "../hooks";
const UserProfile = () => {
  // const location = useLocation();
  // console.log("Location", location);
  // const { user } = location.state || {};

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [requestInProgress, setRequestInProgress] = useState(false);
  const { userId } = useParams();
  console.log("userId", userId);
  const { addToast } = useToasts();
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    const getUser = async () => {
      const response = await fetchUserProfile(userId);
      if (response.success) {
        setUser(response.data.user);
      } else {
        addToast(response.message, {
          appearance: "error",
        });
        return navigate("/");
      }
      setLoading(false);
    };
    getUser();
  }, [userId, addToast, navigate]);

  if (loading) {
    return <Loader />;
  }

  const showAddFriendsBtn = () => {
    const friends = auth.user.friends;
    const friendIds = friends.map((friend) => friend.to_user._id);
    const index = friendIds.indexOf(userId);
    if (index !== -1) {
      return true;
    }
    return false;
  };

  const handleRemoveFriendClick = async () => {
    setRequestInProgress(true);

    const response = await removeFriend(userId);

    if (response.success) {
      
      const  friendship  = auth.user.friends.filter(friend=>friend.to_user._id===userId)
      auth.updateUserFriends(false, friendship[0]);
      addToast("Friend removed successfully", {
        appearance: "success",
      });
    } else {
      addToast(response.message, {
        appearance: "error",
      });
    }

    setRequestInProgress(false);
  };

  const handleAddFriendClick = async () => {
    setRequestInProgress(true);

    const response = await addFriend(userId);

    if (response.success) {
      const { friendship } = response.data;
      auth.updateUserFriends(true, friendship);
      addToast("Friend added successfully", {
        appearance: "success",
      });
    } else {
      addToast(response.message, {
        appearance: "error",
      });
    }

    setRequestInProgress(false);
  };

  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
          src="https://static-00.iconduck.com/assets.00/user-icon-2048x2048-ihoxz4vq.png"
          alt=""
        />
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>
          {user.email || "Email not available"}
        </div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>

        <div className={styles.fieldValue}>
          {user.name || "Name not available"}
        </div>
      </div>

      <div className={styles.btnGrp}>
        {showAddFriendsBtn() ? (
          <button
            className={`button ${styles.saveBtn}`}
            onClick={handleRemoveFriendClick}
          >
            {requestInProgress?'Removing Friend...':'Remove Friend'}
          </button>
        ) : (
          <button
            className={`button ${styles.saveBtn}`}
            onClick={handleAddFriendClick}
            disabled={requestInProgress}
          >
            {requestInProgress?'Adding friend...':'Add Friend'}
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
