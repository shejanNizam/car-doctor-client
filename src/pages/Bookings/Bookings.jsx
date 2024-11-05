import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import BookingRow from "./BookingRow";

export default function Bookings() {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:7000/bookings?email=${user?.email}`, {
        withCredentials: true,
      })
      .then((res) => setBookings(res.data));
  }, []);

  const handleDelete = (id) => {
    const proceed = confirm("Are You sure you want to delete");
    if (proceed) {
      fetch(`http://localhost:7000/bookings/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            alert("deleted successful");
            const remaining = bookings.filter((booking) => booking._id !== id);
            setBookings(remaining);
          }
        });
    }
  };

  const handleBookingConfirm = (id) => {
    fetch(`http://localhost:7000/bookings/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ status: "confirm" }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          // update state
          const remaining = bookings.filter((booking) => booking._id !== id);
          const updated = bookings.find((booking) => booking._id === id);
          updated.status = "confirm";
          const newBookings = [updated, ...remaining];
          setBookings(newBookings);
        }
      });
  };

  return (
    <>
      <div>
        <h2 className="text-5xl text-center py-4">
          Your total bookings:{" "}
          <span className="text-orange-600 font-bold"> {bookings.length} </span>
        </h2>
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <th>Image</th>
                <th>Service</th>
                <th>Date</th>
                <th>Mail</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <BookingRow
                  key={booking._id}
                  booking={booking}
                  handleDelete={handleDelete}
                  handleBookingConfirm={handleBookingConfirm}
                ></BookingRow>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
