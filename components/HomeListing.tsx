"use client";
import React, { useEffect } from "react";
import { useFetchHomes } from "@/app/hooks/useFetchHomes";
import { toast } from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import HomeCard from "./HomeCard";

const HomeListing = () => {
  const { homes, loading, error } = useFetchHomes();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="flex justify-center items-center mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {error && <p>{error}</p>}
        {loading
          ? Array.from({ length: 8 }).map((_, index) => (
              <div key={index}>
                <Skeleton height={300} />
                <div className="mt-2">
                  <Skeleton width={200} height={20} />
                  <Skeleton width={150} height={20} className="mt-1" />
                  <Skeleton width={100} height={20} className="mt-1" />
                </div>
              </div>
            ))
          : homes.map((home) => <HomeCard key={home.id} home={home} />)}
      </div>
    </div>
  );
};

export default HomeListing;
