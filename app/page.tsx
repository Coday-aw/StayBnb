import { Toaster } from "react-hot-toast";

import HomeListing from "@/components/HomeListing";

function Page() {
  return (
    <div>
      <Toaster position="top-center" />
      <HomeListing />
    </div>
  );
}
export default Page;
