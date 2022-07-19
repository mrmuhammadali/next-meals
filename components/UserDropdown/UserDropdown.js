import MenuItem from "@material-ui/core/MenuItem";

import { useUsers } from "@/apiHooks/useUsers";
import { InputField } from "../InputField";

export const UserDropdown = ({ className, disabled, label, name }) => {
  const { data } = useUsers({ fallbackData: [] });
  return (
    <InputField
      select
      className={className}
      name={name}
      label={label}
      disabled={disabled}
    >
      {data.map((user) => (
        <MenuItem key={user._id} value={user._id}>
          {user.email}
        </MenuItem>
      ))}
    </InputField>
  );
};
