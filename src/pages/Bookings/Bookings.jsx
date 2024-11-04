import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import BookingRow from "./BookingRow";

export default function Bookings() {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:7000/bookings?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => setBookings(data));
  }, []);

  return (
    <>
      <div>
        <h2 className="text-5xl">Your bookings: {bookings.length}</h2>
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
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <BookingRow
                  key={booking._id}
                  booking={booking}
                  //   handleDelete={handleDelete}
                  //   handleBookingConfirm={handleBookingConfirm}
                ></BookingRow>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}