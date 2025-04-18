import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { MotionBox, fadeIn } from "@/components/ui/motion";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center">
        <MotionBox
          initial="hidden"
          animate="visible"
          variants={fadeIn()}
          className="text-center max-w-md p-6"
        >
          <h1 className="text-6xl font-bold text-event-700 mb-6">404</h1>
          <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link to="/">
            <Button size="lg" className="gap-2">
              <Home className="h-4 w-4" />
              Return to Home
            </Button>
          </Link>
        </MotionBox>
      </div>
      
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} AVN Institute. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default NotFound;
