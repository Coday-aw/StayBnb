import React from "react";
import { toast } from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import HomeCard from "./HomeCard";
import { Home } from "@/lib/types";

interface HomeListingProps {
  filteredHomes: Home[];
  error: string | null;
  loading: boolean;
}

const HomeListing = ({ filteredHomes, error, loading }: HomeListingProps) => {
  return (
    <div className="flex justify-center items-center mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {error && toast.error(error)}

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
          : filteredHomes.map((home) => <HomeCard key={home.id} home={home} />)}
      </div>
    </div>
  );
};

export default HomeListing;
