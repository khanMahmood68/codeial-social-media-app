import { Link } from "react-router-dom";
import styles from "../styles/navbar.module.css";
import { useAuth } from "../hooks";
import { useEffect, useState } from "react";
import { searchUsers } from "../api";

const Navbar = () => {
  const [results, setResults] = useState([]);
  const [searchText, setSearchText] = useState("");
  const auth = useAuth();

  useEffect(()=>{
    const fetchUsers = async ()=>{
      const response = await searchUsers(searchText);
      console.log('Response',response);
      if(response.success){
        setResults(response.data.users);
      }

    }

    if(searchText.length>2 ){
      fetchUsers();
    }else{
      setResults([])
    }
    
  },[searchText])

  return (
    <div className={styles.nav}>
      <div className={styles.leftDiv}>
        <a href="/">
          <img
            alt=""
            src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
          />
        </a>
      </div>

      <div className={styles.searchContainer}>
        <img
          className={styles.searchIcon}
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqweHDmNZqwg6lp0Wql8g7vLlLg5JdFBNan0FrrM46KA&s"
          alt=""
        />
        <input
          placeholder="Search users"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        {results.length > 0 && (
          <div className={styles.searchResults}>
            <ul>
              {results.map((user) => (
                <li
                  className={styles.searchResultsRow}
                  key={`user-${user._id}`}
                >
                  <Link to={`/user/${user._id}`}>
                    <img
                      src="https://static-00.iconduck.com/assets.00/user-icon-2048x2048-ihoxz4vq.png"
                      alt=""
                    />
                    <span>{user.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className={styles.rightNav}>
        {auth.user && (
          <div className={styles.user}>
            <Link to="/settings">
              <img
                src="https://static-00.iconduck.com/assets.00/user-icon-2048x2048-ihoxz4vq.png"
                alt=""
                className={styles.userDp}
              />
            </Link>
            <span>{auth.user.name}</span>
          </div>
        )}

        <div className={styles.navLinks}>
          <ul>
            {auth.user ? (
              <>
                <li>
                  <button onClick={auth.logout} to="/logout">
                    Log out
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Log in</Link>
                </li>

                <li>
                  <Link to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
