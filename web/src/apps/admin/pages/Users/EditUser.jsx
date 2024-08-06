import { useEffect, useState } from "react";
import styles from "./Users.module.css";
import { useLocation } from "react-router-dom";
import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from "../../../../state/redux/users/usersApi";
import Card from "../../components/Card/Card";
import Form from "./components/Form";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import { toast } from "../../components/Toast";

const EditUser = () => {
  const location = useLocation();
  const userId = location.pathname.split("/").pop();
  const {
    data: { user: initialUser } = {},
    isLoading: initialUserLoading,
    isSuccess: initialUserSuccess,
  } = useGetUserByIdQuery(userId);
  const [updateUser, { error }] = useUpdateUserMutation();
  const [user, setUser] = useState(initialUser);

  const handleSubmit = async () => {
    try {
      await updateUser({
        userId,
        user,
      }).unwrap();
      toast.success("User updated successfully!");
    } catch (err) {
      toast.error("Error updating user.");
    }
  };

  useEffect(() => {
    if (initialUserSuccess) {
      setUser(initialUser);
    }
  }, [initialUserSuccess, initialUser]);

  return (
    <div className={styles.page}>
      <Card>
        <div className={styles.createUserCard}>
          <h4 className={styles.title}>User Details</h4>
          <p className={styles.subtitle}>
            Enter the details of the user you want to edit.
            {error && <p className={styles.error}>{error?.data?.message}</p>}
          </p>
          <Form
            key={user?._id}
            defaultValue={user}
            onChange={setUser}
            onSubmit={handleSubmit}
            mode="edit"
          />
        </div>
      </Card>
      <LoadingSpinner isLoading={initialUserLoading} fullScreen={true} />
    </div>
  );
};

export default EditUser;
