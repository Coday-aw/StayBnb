import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="border-b m-4 p-2">
      <Container>
        <div className="flex justify-between">
          <Logo />
          <Search />
          <UserMenu />
        </div>
      </Container>
    </div>
  );
};
export default Navbar;
