"use client";
import { Toaster } from "react-hot-toast";
import { useFetchHomes } from "@/app/hooks/useAllHomes";
import HomeListing from "@/components/HomeListing";
import { useState } from "react";
import Search from "@/components/Navbar/Search";
import Container from "@/components/Container";

function Page() {
  const { homes, loading, error } = useFetchHomes();
  const [search, setSearch] = useState("");

  const filteredHomes = homes.filter((home) => {
    return home.location.country.toLowerCase().includes(search.toLowerCase());
  });
  return (
    <Container>
      <Toaster position="top-center" />
      <Search search={search} setSearch={setSearch} />
      <HomeListing
        filteredHomes={filteredHomes}
        error={error}
        loading={loading}
      />
    </Container>
  );
}
export default Page;
