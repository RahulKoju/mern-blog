import { useEffect, useState } from "react";
import { Sidebar } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { HiArrowSmRight, HiUser } from "react-icons/hi";
export default function DashSidebar() {
  const [tab, setTab] = useState("");
  const location = useLocation();
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item
            as={Link}
            to="/dashboard?tab=profile"
            active={tab === "profile"}
            icon={HiUser}
            label="User"
            labelColor="dark"
          >
            Profile
          </Sidebar.Item>
          <Sidebar.Item icon={HiArrowSmRight} className="cursor-pointer">
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
