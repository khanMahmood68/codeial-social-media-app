import styles from "../styles/home.module.css";
import { useAuth, usePosts } from "../hooks";
import { CreatePost, FriendList,Post, Loader } from "../components";

const Home = () => {
  const auth = useAuth();
  const posts = usePosts();

  if (posts.loading) {
    return <Loader />;
  }

  return (
    <div className={styles.home}>
      <div className={styles.postList}>
        <CreatePost />
        {posts.data.map((post) => (
          <Post post={post} key={`post-${post._id}`} />
        ))}
      </div>
      {auth.user && <FriendList />}
    </div>
  );
};

export default Home;
