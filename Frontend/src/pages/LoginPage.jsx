import { useState } from "react"
import { useAuthStore } from "../store/useAuth.Store";
import { CircleDashed, Eye, EyeOff, KeyRound, Mail, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/authImagePattern";

export default function LoginPage (){
     const [showPassword, setShowPassword] = useState(false)

     const [formData, setFormData] = useState({
          email:"",
          password:""
     });
     const {Login, isLoggingIn} = useAuthStore();

     const handleSubmit = async (e) =>{
          e.preventDefault()
          Login(formData)
     }
    return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className=" size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Login to your Account</h1>
              <p className="text-base-content/60">
                Get started with your account
              </p>
            </div>
          </div>
          {/* Form Started here */}
          <form onSubmit={handleSubmit} className="space-y-6">
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
            {/* Password Input  */}
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
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <CircleDashed className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>
          {/* link to login page */}
            <div className="text-center">
              <p className="text-base-content/60">
                Don't have account ?
                <Link to="/signup" className="link link-primary"> Sign in </Link>
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