import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Popover from "@mui/material/Popover";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import Label from "../../components/label";
import Iconify from "../../components/iconify";
import { toast } from "react-toastify";

// ----------------------------------------------------------------------

export default function UserTableRow({
  selected,
  name,
  avatarUrl,
  taikhoan,
  makhachhang,
  sodienthoai,
  isVerified,
  diachi,
  ghichu,
  fetchData,
  handleClick,
}) {
  const [open, setOpen] = useState(null);
  const [status, setStatus] = useState(ghichu);
  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };
  const handleChange = async (event) => {
    const newStatus = event.target.value;
    setStatus(newStatus);

    try {
      const response = await axios.post(
        "http://localhost:3003/api/v1/update-ghichu",
        {
          MAKHACHHANG: makhachhang, // Truyền mã khách hàng từ props
          GHICHU: newStatus, // Trạng thái mới
        }
      );

      if (response.data.EC === 1) {
        fetchData();
        toast.success(response.data.EM);
      } else {
        toast.error(response.data.EM);
      }
    } catch (error) {
      console.error("Error updating GHICHU:", error);
    }
  };
  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          {/* <Checkbox disableRipple checked={selected} onChange={handleClick} /> */}
        </TableCell>
        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar
              alt={name}
              src={`http://localhost:3003/images/${avatarUrl}`}
            />
            <Typography variant="subtitle2" noWrap>
              {name}1
            </Typography>
          </Stack>
        </TableCell>
        <TableCell>{diachi}</TableCell>
        <TableCell>{makhachhang}</TableCell>
        <TableCell> {sodienthoai}</TableCell>
        <TableCell>
          <Label>{taikhoan}</Label>
        </TableCell>{" "}
        <TableCell>
          <FormControl fullWidth>
            <InputLabel id="status-label">Trạng thái</InputLabel>
            <Select
              labelId="status-label"
              value={ghichu}
              label="Trạng thái"
              onChange={handleChange}
              displayEmpty
            >
              <MenuItem value="Đang hoạt động">Đang hoạt động</MenuItem>
              <MenuItem value="Ngưng hoạt động">Ngưng hoạt động</MenuItem>
            </Select>
          </FormControl>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleCloseMenu}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleCloseMenu} sx={{ color: "error.main" }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
  avatarUrl: PropTypes.any,
  company: PropTypes.any,
  handleClick: PropTypes.func,
  isVerified: PropTypes.any,
  name: PropTypes.any,
  role: PropTypes.any,
  selected: PropTypes.any,
  status: PropTypes.string,
};
