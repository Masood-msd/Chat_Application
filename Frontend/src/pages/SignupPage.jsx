import { useState } from "react";
import "../index.css";
import { useAuthStore } from "../store/useAuth.Store.js";
import {
  CircleDashed,
  Eye,
  EyeOff,
  KeyRound,
  Mail,
  MessageSquare,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/authImagePattern.jsx";
import toast from "react-hot-toast";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if(!formData.fullName.trim()) return toast.error("Full name is required");
    if(!formData.email.trim()) return toast.error("Email is required");
    if(!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format")
    if(!formData.password) return toast.error("Password is required");
    if(!formData.password.length > 6) return toast.error("Password length must be 6 characters");

    return true
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm()

    if(success === true) return signup (formData)
  };
  return (
    <div className="min-h-screen grid lg:grid-cols-2 pt-10">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className=" size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">
                Get started with your free account
              </p>
            </div>
          </div>
          {/* Form Started here */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>

              <div className="flex items-center gap-2 input input-bordered w-full">
                <User className="w-5 h-5 opacity-70" />

                <input
                  type="text"
                  className="grow bg-transparent outline-none"
                  placeholder="Enter your name"
                  autoComplete="off"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </div>
            </div>
            {/* Email Input  */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>

              <div className="flex items-center gap-2 input input-bordered w-full">
                <Mail className="w-5 h-5 opacity-70" />

                <input
                  type="email"
                  className="grow bg-transparent outline-none"
                  placeholder="Your email"
                  autoComplete="off"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>
            {/* Email Input  */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>

              <div className="flex items-center gap-2 input input-bordered w-full">
                <KeyRound className="w-5 h-5 opacity-70" />

                <input
                  type={showPassword ? "text" : "password"}
                  className="grow bg-transparent outline-none"
                  placeholder="Your password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>
            {/* submit Button */}
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                  <CircleDashed className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "create Account"
              )}
            </button>
          </form>
          {/* link to login page */}
            <div className="text-center">
              <p className="text-base-content/60">
                Already have a account ?
                <Link to="/login" className="link link-primary"> Sign in </Link>
              </p>
            </div>
        </div>
      </div>
      {/* Right side Part */}

      <AuthImagePattern 
      title="Join our Community"
      subTitle="Connect with friends and many others"/>
    </div>
  );
}
