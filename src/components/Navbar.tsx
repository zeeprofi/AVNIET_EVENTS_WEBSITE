
import { Link } from "react-router-dom";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <img 
              src="/lovable-uploads/baa3ba36-399e-4df8-bc70-19f2bd3cb3b0.png" 
              alt="Department Logo" 
              className="h-12 w-12"
            />
            <Link to="/" className="text-xl font-bold text-gray-800">
              Dept Of CSE(AI & ML)
            </Link>
          </div>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/">
                  <Button variant="ghost">Home</Button>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/events">
                  <Button variant="ghost">Events</Button>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/past-events">
                  <Button variant="ghost">Past Events</Button>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/login">
                  <Button variant="ghost">Admin</Button>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </nav>
  );
};
