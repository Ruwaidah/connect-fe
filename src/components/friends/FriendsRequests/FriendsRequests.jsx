import { Link } from "react-router-dom";
import { gsap } from "gsap/gsap-core";
import { useDispatch, useSelector } from "react-redux";
import {
  rejectFriendRequest,
  approveFriendRequest,
} from "../../../reducers/usersSlice";
import Footer from "../../footer/Footer";
import Header from "../../header/Header";
import NavBar from "../../navBar/NavBar";
import Loading from "../../loading/Loading";

const FriendsRequests = () => {
  const dispatch = useDispatch();
  const { isGettingUserLoading, user } = useSelector(
    (state) => state.user
  );

  // ************************** APPROVE FRIEND REQUEST ******************************
  const acceptFriendRequest = (friend, i) => {
    setTimeout(() => {
      dispatch(
        approveFriendRequest({
          userRecieveRequest: user.id,
          userSendRequest: friend.userSendRequest,
          friend: {
            bio: friend.bio,
            firstName: friend.firstName,
            friendId: friend.userSendRequest,
            image: friend.image,
            image_id: friend.image_id,
            lastName: friend.lastName,
            public_id: friend.public_id,
            username: friend.username,
          },
        })
      );
    }, 500);

    gsap.to(`#request-user-card-${i}`, {
      opacity: 0,
      duration: 0.5,
      ease: "power1.inOut",
    });
  };

  // ************************** REJECT FRIEND REQUEST ******************************
  const rejectRequest = (friend, i) => {
    setTimeout(() => {
      dispatch(
        rejectFriendRequest({
          userRecieveRequest: user.id,
          userSendRequest: friend.userSendRequest,
        })
      );
    }, 1000);

    gsap.to(`#request-user-card-${i}`, {
      opacity: 0,
      duration: 0.5,
      ease: "power1.inOut",
    });
  };


  return (
    <div className="component-div">
      <Header />
      <div className="mid-section friend-request-component-div">
        <NavBar />
        <div className="FriendsRequests-div">
          <div className="friend-request-header page-header">
            <h2>Friends Requests</h2>
          </div>
          {isGettingUserLoading || !user ? (
            <Loading />
          ) : (
            <div className="Friends-Requests-list">
              {user.friendReq.map((u, i) => (
                <div
                  key={u.id}
                  className="FriendsRequests"
                  id={`request-user-card-${i}`}
                >
                  {u.userRecieveRequest === user.id && (
                    <div className="request-user-card">
                      <Link className="request-user-img-name-div">
                        <img src={u.image} />
                        <div>
                          <h4>{u.firstName}</h4>
                          <h4>{u.lastName}</h4>
                          <p>sent you friend request </p>
                        </div>{" "}
                      </Link>{" "}
                      <div className="requests-btn">
                        <img
                          src="./assets/yes.png"
                          onClick={() => acceptFriendRequest(u, i)}
                        />
                        <img
                          src="./assets/no.png"
                          onClick={() => rejectRequest(u, i)}
                        />
                      </div>{" "}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FriendsRequests;
