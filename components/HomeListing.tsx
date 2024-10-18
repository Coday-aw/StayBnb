"use client";
import React, { useEffect } from "react";
import { useFetchHomes } from "@/app/hooks/useFetchHomes";
import { toast } from "react-hot-toast";
import HomeCard from "./HomeCard";

const HomeListing = () => {
  const { homes, loading, error } = useFetchHomes();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, []);

  return (
    <div className=" flex justify-center items-center mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 ">
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {homes.map((home) => (
          <HomeCard key={home.id} home={home} />
        ))}
      </div>
    </div>
  );
};
export default HomeListing;
