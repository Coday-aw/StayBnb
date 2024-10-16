"use client";
import React from "react";
import InputField from "./InputField";
import TextareaField from "./TextareaField";
import SelectField from "./SelectField";
import Counter from "./Counter";
import { locationOptions, categories } from "@/lib/data";
import OffersField from "./OffersField";
import Heading from "../Heading";
import Button from "@/components/Button";
import { useState } from "react";
import { db, storage } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import ImageField from "./ImageField";
import { toast, Toaster } from "react-hot-toast";

const Form: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [category, setCategory] = useState("");
  const [offers, setOffers] = useState<string[]>([]);
  const [guests, setGuests] = useState(0);
  const [rooms, setRooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newHome = {
      title,
      description,
      price: parseInt(price),
      image: image || "",
      location: selectedLocation,
      category,
      offers,
      guests,
      rooms,
      bathrooms,
    };

    if (
      !title ||
      !description ||
      !price ||
      !image ||
      !selectedLocation ||
      !category ||
      offers.length === 0 ||
      guests === 0 ||
      rooms === 0 ||
      bathrooms === 0
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      if (image) {
        const imageRef = ref(storage, `images/${image.name}`);
        await uploadBytes(imageRef, image);
        const imageUrl = await getDownloadURL(imageRef);
        newHome.image = imageUrl;
      }

      const docRef = await addDoc(collection(db, "homes"), newHome);
      console.log("Document written with ID: ", docRef.id);
      if (docRef.id) {
        toast.success("Home created successfully");
      } else {
        toast.error("Failed to create home");
      }

      setTitle("");
      setDescription("");
      setPrice("");
      setImage(null);
      setSelectedLocation("");
      setCategory("");
      setOffers([]);
      setGuests(0);
      setRooms(0);
      setBathrooms(0);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center mx-5 sm:mx-10">
      <form
        onSubmit={handleSubmit}
        className="w-[800px] mt-10 flex flex-col gap-5 mb-20 "
      >
        <Heading> Please describe your home as best as you can</Heading>
        <Toaster position="top-center" />
        <InputField
          id="title"
          label="Title"
          type="text"
          placeholder="Home name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextareaField
          id="description"
          label="Description"
          placeholder="Please describe your home"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <InputField
          id="price"
          label="Price"
          type="text"
          placeholder="Price per night in USD"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <ImageField
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setImage(e.target.files[0]);
            }
          }}
        />
        <SelectField
          id="category"
          label="Category"
          options={categories.map((category) => ({
            value: category.value,
            label: category.label,
          }))}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <div className="border rounded-lg border-black mb-10">
          <Counter
            label="Guests"
            value={guests}
            onChange={(value) => setGuests(value)}
          />
          <Counter
            label="Rooms"
            value={rooms}
            onChange={(value) => setRooms(value)}
          />
          <Counter
            label="Bathrooms"
            value={bathrooms}
            onChange={(value) => setBathrooms(value)}
          />
        </div>
        <Heading>Where is your home located?</Heading>
        <SelectField
          id="location"
          label="Location"
          options={locationOptions.map((loc) => ({
            value: loc.country,
            label: loc.country,
          }))}
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
        />
        <Heading>What this place offers</Heading>
        <OffersField selectedOffers={offers} setSelectedOffers={setOffers} />
        <Button type={"submit"} width={50}>
          Create home
        </Button>
      </form>
    </div>
  );
};

export default Form;
