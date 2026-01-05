// import "./FriendsRequests.css";
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
import { useState } from "react";

const FriendsRequests = () => {
  const [accept, setAccept] = useState(false);
  const dispatch = useDispatch();
  const { isGettingUserLoading, user, findFriend } = useSelector(
    (state) => state.user
  );

  // gsap.to(".welcome-h4", {
  //   opacity: 1,
  //   duration: 3,
  //   ease: "power1.inOut",
  // });

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

    //     gsap.from(".Friends-Requests-list", {
    //   ease: "circ.out",
    //   y: "0",
    //   delay: 2,
    // });

    // gsap.to(".Friends-Requests-list", {
    //   duration: 1,
    //   ease: "circ.out",
    //   y: "-100%",
    // });
  };


  return (
    <div className="component-div">
      <Header />
      <div className="mid-section friend-request-component-div">
        <NavBar />
        <div className="FriendsRequests-div">
          <div className="friend-request-header page-header">
            {/* <div className="FriendsRequests"> */}
            {/* <img src="./assets/friends.png" /> */}
            <h2>Friends Requests</h2>
            {/* </div> */}
          </div>
          {isGettingUserLoading || !user ? (
            <Loading />
          ) : (
            // <div className="FriendsRequests">
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
                        {/* <button onClick={() => acceptFriendRequest(u)}>
                          Confirm
                        </button> */}

                        <img
                          src="./assets/yes.png"
                          onClick={() => acceptFriendRequest(u, i)}
                        />
                        <img
                          src="./assets/no.png"
                          onClick={() => rejectRequest(u, i)}
                        />
                        {/* <button onClick={() => rejectRequest(u)}>Cancel</button> */}
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
