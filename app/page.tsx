import Navbar from "@/components/Navbar/Navbar";
import Container from "@/components/Container";
import { Toaster } from "react-hot-toast";

import HomeListing from "@/components/HomeListing";

function Page() {
  return (
    <Container>
      <Navbar />
      <div>
        <Toaster position="top-center" />
        <HomeListing />
      </div>
    </Container>
  );
}
export default Page;
