import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUsers } from '../store/users';

export default function Users() {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <div className="all-users">
      {users
        .sort((x, y) => {
          return x.id - y.id;
        })
        .map((users) => {
          return (
            <div className="singlePerson" key={users.id}>
              <Link to={`/users/${users.id}`}>
                <img
                  id="personPhoto"
                  src="https://st3.depositphotos.com/4111759/13425/v/1600/depositphotos_134255532-stock-illustration-profile-placeholder-male-default-profile.jpg"
                />
                <h2>{users.username}</h2>
              </Link>
            </div>
          );
        })}
    </div>
  );
}
