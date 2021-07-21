/**
 * PrivateRoute.jsx
 *
 * Only accessible if user is logged in.
 */

import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import useCollections from "../../hooks/useCollections";

export default function PrivateRoute({ component: Component, ...rest }) {
  /**
   * The PrivateRoute (only for logged in users) component
   */
  const { currentUser } = useAuth(); // Authentication Context
  const collections = useCollections("users");

  function userHasProfile() {
    if (!collections) {
      alert("Failed to retrieve user information");
    }
    var users = collections.data;
    var user = users.filter((user) => user.uid === currentUser.uid);
    return user;
  }

  // Get user status
  function getUserStatus() {
    /**
     * Gets the status of the user.
     *
     * Returns:
     * 0 if user is not logged in
     * 1 if user is logged in
     * 2 if user is logged in but haven't set up their profile
     */
    if (!currentUser) {
      return 0;
    } else if (userHasProfile()) {
      return 1;
    } else {
      return 2;
    }
  }

  const userStatus = getUserStatus();

  return (
    <Route
      {...rest}
      render={(props) => {
        return userStatus === 0 ? (
          <Redirect to={"/landing"} />
        ) : userStatus === 1 ? (
          <Component {...props} />
        ) : (
          <Redirect to={"/edit-profile"} />
        );
      }}
    ></Route>
  );
}
