import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button } from "@windmill/react-ui";
import { toast } from "react-toastify"; // Import toast
import Error from "@/components/form/others/Error";
import ImageLight from "@/assets/img/forgot-password-office.jpeg";
import ImageDark from "@/assets/img/forgot-password-office-dark.jpeg";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory(); // Hook for redirection

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://suft-90bec7a20f24.herokuapp.com/admin/admin-reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        toast.success("Password recovery email sent successfully."); // Trigger toast notification
        setTimeout(() => {
          history.push("/login"); // Redirect after success
        }, 2000); // Delay for the toast to be visible
      } else {
        setError(result.message || "An error occurred. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 flex items-center min-h-screen p-6">
      <div className="dark:bg-gray-800 flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl">
        <div className="md:flex-row flex flex-col overflow-y-auto">
          <div className="md:h-auto md:w-1/2 h-32">
            <img
              aria-hidden="true"
              className="dark:hidden object-cover w-full h-full"
              src={ImageLight}
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="dark:block hidden object-cover w-full h-full"
              src={ImageDark}
              alt="Office"
            />
          </div>
          <main className="sm:p-12 md:w-1/2 flex items-center justify-center p-6">
            <div className="w-full">
              <h1 className="dark:text-gray-200 mb-4 text-xl font-semibold text-gray-700">
                Forgot password
              </h1>

              <form onSubmit={handleSubmit}>
                <label className="block text-sm">
                  <span className="text-gray-700 dark:text-gray-400">
                    Email
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@doe.com"
                    required
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                  />
                </label>

                {error && <Error errorName={error} />}

                <Button
                  disabled={loading}
                  type="submit"
                  block
                  className="h-12 mt-4"
                >
                  {loading ? "Sending..." : "Recover password"}
                </Button>
              </form>
              <p className="mt-4">
                <Link
                  className="text-emerald-500 dark:text-emerald-400 hover:underline text-sm font-medium"
                  to="/login"
                >
                  Already have an account? Login
                </Link>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
