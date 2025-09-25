import Navbar from "@/components/Navbar";
import { auth } from "../components/Firebase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(auth.currentUser);
  const navigate = useNavigate();
  const [address, setAddress] = useState({
    street: "",
    city: "",
    zip: "",
  });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    setUser(auth.currentUser);
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/login");
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto mt-24 p-6 bg-white rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
        <div className="mb-4">
          <p>
            <strong>Name:</strong> {user?.displayName || "No name set"}
          </p>
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
        </div>
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Address</h3>
          {editing ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setEditing(false);
              }}
              className="flex flex-col gap-2"
            >
              <input
                type="text"
                placeholder="Street"
                value={address.street}
                onChange={(e) =>
                  setAddress({ ...address, street: e.target.value })
                }
                className="border rounded px-2 py-1"
              />
              <input
                type="text"
                placeholder="City"
                value={address.city}
                onChange={(e) =>
                  setAddress({ ...address, city: e.target.value })
                }
                className="border rounded px-2 py-1"
              />
              <input
                type="text"
                placeholder="ZIP"
                value={address.zip}
                onChange={(e) =>
                  setAddress({ ...address, zip: e.target.value })
                }
                className="border rounded px-2 py-1"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white py-1 rounded"
              >
                Save
              </button>
            </form>
          ) : (
            <div>
              <p>{address.street || "No address set"}</p>
              <p>{address.city}</p>
              <p>{address.zip}</p>
              <button
                className="text-blue-600 underline mt-2"
                onClick={() => setEditing(true)}
              >
                Edit Address
              </button>
            </div>
          )}
        </div>
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Order History</h3>
          <p className="text-gray-500">No orders yet.</p>
        </div>
        <div className="flex flex-col gap-4">
          <button
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            onClick={() => navigate("/wishlist")}
          >
            View Wishlist
          </button>
          <button
            className="bg-gray-200 py-2 rounded hover:bg-gray-300"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
