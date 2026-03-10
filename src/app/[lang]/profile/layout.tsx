import WrapperContainer from "@/common/layout/WrapperContainer";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Card } from "antd";
import ProfileMenu from "./components/ProfileMenu";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <WrapperContainer className="min-h-screen py-10 mx-auto px-4">
      <div className="flex flex-col md:flex-row gap-8">
        <Card
          className="md:w-1/4 rounded-2xl shadow-xl"
          classNames={{ body: "flex flex-col gap-5" }}
        >
          <div className="text-center">
            {" "}
            {/* todo: componente para cambiar imagen. avatar + upload button */}
            <Avatar size={112} icon={<UserOutlined />} className="bg-brinco" />
          </div>

          <div className="text-center text-xl">
            <p>CCC CCC</p>
            <p>mail@gmail.com</p>
          </div>

          <div className="">
            <ProfileMenu />
          </div>
        </Card>

        <div className="md:w-3/4">{children}</div>
      </div>
    </WrapperContainer>
  );
}
