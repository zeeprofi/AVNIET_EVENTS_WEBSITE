
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { MotionBox, MotionSection, scaleIn, fadeIn } from "@/components/ui/motion";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { AlertCircle, Lock, Mail } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  
  const { login, requestPasswordReset, isLoading, error, isAuthenticated, resetEmailSent } = useAuthStore();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect if already authenticated
  if (isAuthenticated) {
    navigate("/admin");
    return null;
  }

  const validateForm = () => {
    const errors: { email?: string; password?: string } = {};
    
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Please enter a valid email";
    }
    
    if (!isForgotPassword && !password.trim()) {
      errors.password = "Password is required";
    } else if (!isForgotPassword && password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      if (isForgotPassword) {
        await requestPasswordReset(email);
        if (resetEmailSent) {
          toast({
            title: "Password Reset Email Sent",
            description: "Please check your email for password reset instructions.",
          });
        }
      } else {
        await login(email, password);
      }
    }
  };

  const toggleForgotPassword = () => {
    setIsForgotPassword(!isForgotPassword);
    setValidationErrors({});
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <MotionSection
        initial="hidden"
        animate="visible"
        variants={fadeIn()}
        className="flex-grow flex items-center justify-center py-12"
      >
        <div className="container mx-auto px-4">
          <MotionBox
            variants={scaleIn()}
            className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="bg-gradient-to-r from-event-600 to-event-800 p-6 text-white text-center">
              <h1 className="text-2xl font-bold">
                {isForgotPassword ? "Reset Password" : "Admin Login"}
              </h1>
              <p className="mt-2 text-event-100">
                {isForgotPassword 
                  ? "Enter your email to reset your password"
                  : "Access the event management dashboard"}
              </p>
            </div>
            
            <div className="p-6 md:p-8">
              {error && (
                <Alert variant="destructive" className="mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <Input
                        id="email"
                        type="email"
                        placeholder="admin@avniet.edu"
                        className={`pl-10 ${
                          validationErrors.email ? "border-red-500" : ""
                        }`}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading}
                      />
                    </div>
                    {validationErrors.email && (
                      <p className="text-sm text-red-500 mt-1">
                        {validationErrors.email}
                      </p>
                    )}
                  </div>
                  
                  {!isForgotPassword && (
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <Input
                          id="password"
                          type="password"
                          placeholder="••••••••"
                          className={`pl-10 ${
                            validationErrors.password ? "border-red-500" : ""
                          }`}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          disabled={isLoading}
                        />
                      </div>
                      {validationErrors.password && (
                        <p className="text-sm text-red-500 mt-1">
                          {validationErrors.password}
                        </p>
                      )}
                    </div>
                  )}
                  
                  <div className="pt-2">
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading 
                        ? (isForgotPassword ? "Sending..." : "Logging in...") 
                        : (isForgotPassword ? "Reset Password" : "Login")}
                    </Button>
                  </div>
                  
                  <Button
                    type="button"
                    variant="link"
                    className="w-full"
                    onClick={toggleForgotPassword}
                  >
                    {isForgotPassword 
                      ? "Back to Login" 
                      : "Forgot Password?"}
                  </Button>
                  
                  {!isForgotPassword && (
                    <div className="text-center text-sm text-gray-500 mt-4">
                      <p>Demo Credentials:</p>
                      <p>Email: admin@avniet.edu</p>
                      <p>Password: admin123</p>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </MotionBox>
        </div>
      </MotionSection>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} AVN Institute. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AdminLogin;
