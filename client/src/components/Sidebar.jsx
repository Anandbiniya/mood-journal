import { NavLink } from "react-router-dom";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import {
  FaUser,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaTachometerAlt,
  FaGem,
} from "react-icons/fa";
import { useUserAuth } from "../contexts/UserAuthContext";

// Reference:
// https://codesandbox.io/s/react-sidebar-routing-boj4c

const Sidebar = ({
  collapsed,
  toggled,
  handleToggleSidebar,
  handleCollapsedChange,
}) => {
  const { logOut } = useUserAuth();
  const handleLogout = () => {
    logOut();
  };

  return (
    <ProSidebar
      image={false}
      collapsed={collapsed}
      toggled={toggled}
      onToggle={handleToggleSidebar}
      breakPoint="md"
    >
      {/* Header */}
      <SidebarHeader>
        <Menu iconShape="circle">
          {collapsed ? (
            <MenuItem
              icon={<FaAngleDoubleRight />}
              onClick={handleCollapsedChange}
            ></MenuItem>
          ) : (
            <MenuItem
              suffix={<FaAngleDoubleLeft />}
              onClick={handleCollapsedChange}
            >
              <div
                style={{
                  padding: "9px",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  fontSize: 15,
                  letterSpacing: "1px",
                }}
              >
                Mood Journal
              </div>
            </MenuItem>
          )}
        </Menu>
      </SidebarHeader>
      {/* Content */}
      <SidebarContent>
        <Menu iconShape="circle">
          <MenuItem icon={<FaTachometerAlt />}>
            Write
            <NavLink to="/dashboard/write-new" />
          </MenuItem>
          {/* <MenuItem icon={<FaGem />}>Components </MenuItem> */}
          <MenuItem icon={<FaGem />}>
          personal diary.<NavLink to="/dashboard/private-journals" />
          </MenuItem>
          <MenuItem icon={<FaGem />}>
            Let People Know <NavLink to="/dashboard/public-journals" />
          </MenuItem>
          <MenuItem icon={<FaTachometerAlt />}>
            Self Help
            <NavLink to="/dashboard/insights" />
          </MenuItem>
          <MenuItem icon={<FaTachometerAlt />}>
            Lift your Life
            <NavLink to="/dashboard/uplift" />
          </MenuItem>
          <MenuItem
            icon={<FaGem />}
            suffix={<span className="badge red">S.O.S.</span>}
          >
            Resources <NavLink to="/dashboard/resources" />
          </MenuItem>
          <MenuItem
            icon={<FaGem />}
            // suffix={<span className="badge red">S.O.S.</span>}
          >
            Job Portal <NavLink to="/dashboard/JobPortalList" />
          </MenuItem>
          <MenuItem icon={<FaGem />}>
            Home <NavLink to="/" />
          </MenuItem>
        </Menu>
      </SidebarContent>
      {/* Footer */}
      <SidebarFooter style={{ textAlign: "center" }}>
        <div className="sidebar-btn-wrapper" style={{ padding: "16px" }}>
          <div
            className="sidebar-btn"
            onClick={handleLogout}
            style={{ cursor: "pointer" }}
          >
            <FaUser />
            <span>Logout</span>
          </div>
        </div>
      </SidebarFooter>
    </ProSidebar>
  );
};

export default Sidebar;
