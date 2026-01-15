import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const MyProfile = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      Swal.fire(
        "Logged out",
        "You have been logged out successfully",
        "success"
      );
      navigate("/login");
    } catch (error) {
      Swal.fire("Error", "Logout failed", "error");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">My Profile</h2>

      <div className="flex flex-col items-center gap-4">
        {/* Profile Image */}
        <img
          src={user?.photoURL || "https://i.ibb.co/2kR7K0q/user.png"}
          alt="Profile"
          className="w-32 h-32 rounded-full border"
        />

        {/* User Info */}
        <div className="w-full space-y-2">
          <p>
            <strong>Name:</strong> {user?.displayName || "Not provided"}
          </p>
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
          <p>
            <strong>Role:</strong> {user?.role || "Admin"}
          </p>
          <p>
            <strong>Account Created:</strong> {user?.metadata?.creationTime}
          </p>
          <p>
            <strong>Last Login:</strong> {user?.metadata?.lastSignInTime}
          </p>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="btn btn-primary text-black px-8 mt-6"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default MyProfile;
