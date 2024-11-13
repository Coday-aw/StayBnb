import Heading from "./Heading";

const About = () => {
  return (
    <div className="flex justify-center items-center mt-36 p-3">
      <div className="max-w-[600px] flex justify-center items-center flex-col border p-5 shadow-lg rounded-xl ">
        <Heading>About StayBnb</Heading>
        <p className="text-xl text-center font-medium">
          Welcome to StayBNB, your go-to platform for finding the perfect home
          away from home. At StayBNB, we believe that every traveler deserves a
          comfortable, unique, and memorable place to stay. Whether you’re
          planning a quick weekend getaway, an extended vacation, or a work
          retreat, we offer a diverse selection of homes to suit every style,
          budget, and preference. Our mission is to make booking a home simple,
          seamless, and enjoyable. We partner with trusted hosts to ensure that
          every property meets our high standards for quality, safety, and
          hospitality. From cozy cabins and beachfront bungalows to luxury city
          lofts and countryside cottages, we provide a range of options to make
          your stay unforgettable. StayBNB was built on the values of trust,
          community, and discovery. We strive to connect travelers with hosts
          who are passionate about sharing their unique spaces and local
          experiences. Plus, at StayBNB, everyone can become a host. Whether you
          have a spare room, a vacation home, or a unique property, we provide
          the tools and support to help you share your space with the world and
          create meaningful guest experiences. Join the StayBNB community today
          and start your journey toward finding your next perfect stay—or
          becoming a host and sharing your space.
        </p>
      </div>
    </div>
  );
};
export default About;
