import { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";

export default function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("http://localhost:7000/services")
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);

  return (
    <>
      <div className="mt-4">
        <div className="text-center">
          <h3 className="text-3xl font-bold text-orange-500">Our Services</h3>
          <h2 className="text-5xl font-bold py-4">Our Service Area</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
            quaerat tempora voluptatem, <br /> asperiores reiciendis aut
            praesentium illo repellendus tenetur repellat nesciunt deleniti
            nulla nihil eaque esse delectus est iure itaque!
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard key={service._id} service={service}></ServiceCard>
          ))}
        </div>
      </div>
    </>
  );
}
