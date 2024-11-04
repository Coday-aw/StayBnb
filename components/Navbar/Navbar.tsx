import Container from "../Container";
import Logo from "./Logo";
import UserMenu from "./UserMenu";

const Navbar = () => {
  return (
    <div className="border-b border-gray-300 m-4 p-2">
      <Container>
        <div className="flex justify-between">
          <Logo />
          <UserMenu />
        </div>
      </Container>
    </div>
  );
};

export default Navbar;

// const [isOpen, setIsOpen] = useState(false);
// const menuRef = useRef<HTMLDivElement>(null);
// const toggleMenu = () => {
//   setIsOpen(!isOpen);
// };

// const User = useAuth();

// const handleClickOutside = (e: MouseEvent) => {
//   if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
//     setIsOpen(false);
//   }
// };

// useEffect(() => {
//   document.addEventListener("mousedown", handleClickOutside);
//   return () => document.removeEventListener("mousedown", handleClickOutside);
// }, []);
