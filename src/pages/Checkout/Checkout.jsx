import { useLoaderData } from "react-router-dom";

export default function Checkout() {
  const service = useLoaderData();
  const { title } = service;
  return (
    <>
      <h2>Checkout Page for: {title} </h2>
    </>
  );
}
