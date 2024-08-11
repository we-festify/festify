import React from "react";
import {
  useGetAllActionsQuery,
  useGetAllPermissionsQuery,
  useUpdatePermissionsMutation,
} from "../../../../state/redux/config/configApi";
import Card from "../../components/Card/Card";
import styles from "./Permissions.module.css";
import { toast } from "../../components/Toast";

const reduceActionsToMap = (actions, accumulatorType = "array") => {
  return actions?.reduce((acc, action) => {
    const [resource, actionName] = action.split(":");
    if (accumulatorType === "array") {
      if (!acc[resource]) {
        acc[resource] = [];
      }
      acc[resource].push(actionName);
    } else {
      if (!acc[resource]) {
        acc[resource] = {};
      }
      acc[resource][actionName] = true;
    }
    return acc;
  }, {});
};

const reduceToArrays = (permissionsMap) => {
  return Object.entries(permissionsMap).map(([role, resources]) => {
    return {
      role,
      permissions: Object.entries(resources).reduce(
        (acc, [resource, actions]) => {
          acc.push(
            ...Object.entries(actions)
              .map(([actionName, value]) => {
                if (value) {
                  return `${resource}:${actionName}`;
                } else {
                  return null;
                }
              })
              .filter(Boolean)
          );
          return acc;
        },
        []
      ),
    };
  });
};

const PermissionsIndex = () => {
  const {
    data: { actions } = {
      actions: [],
    },
  } = useGetAllActionsQuery();
  const {
    data: { permissions } = {
      permissions: {},
    },
  } = useGetAllPermissionsQuery();
  const [updatePermissions, { isLoading }] = useUpdatePermissionsMutation();
  const actionsMap = reduceActionsToMap(actions);
  const permissionsMap = Object.entries(permissions)?.reduce(
    (acc, [role, _actions]) => {
      acc[role] = reduceActionsToMap(_actions, "object");
      return acc;
    },
    {}
  );
  const roles = Object.keys(permissionsMap);

  const handleChange = (role, resource, actionName, value) => {
    if (!permissionsMap[role]) {
      permissionsMap[role] = {};
    }
    if (!permissionsMap[role][resource]) {
      permissionsMap[role][resource] = {};
    }
    permissionsMap[role][resource][actionName] = value;
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const _permissionsMap = reduceToArrays(permissionsMap);
      const payload = await updatePermissions(_permissionsMap).unwrap();
      toast.success(payload.message);
    } catch (err) {
      toast.error(err.data?.message || err.message || "Something went wrong");
    }
  };

  return (
    <div className={styles.page}>
      <Card>
        <div className={styles.header}>
          <h1 className={styles.title}>Permissions</h1>
          <button
            className={styles.button}
            onClick={handleSave}
            disabled={isLoading}
          >
            Save
          </button>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Action</th>
              {roles.map((role) => (
                <th key={role}>{role}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.entries(actionsMap)?.map(([resource, actionNames]) => (
              <React.Fragment key={resource}>
                <tr className={styles.headerRow}>
                  <td colSpan={roles.length + 1}>{resource}</td>
                </tr>
                {actionNames?.map((actionName) => (
                  <tr key={actionName}>
                    <td>{actionName}</td>
                    {roles?.map((role) => (
                      <td key={role} className={styles.checkbox}>
                        <input
                          className={styles.input}
                          type="checkbox"
                          defaultChecked={
                            permissionsMap?.[role]?.[resource]?.[actionName] ||
                            false
                          }
                          onChange={(e) =>
                            handleChange(
                              role,
                              resource,
                              actionName,
                              e.target.checked
                            )
                          }
                        />
                      </td>
                    ))}
                  </tr>
                ))}
                <tr className={styles.divider}>
                  <td colSpan={roles.length + 1}></td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default PermissionsIndex;
