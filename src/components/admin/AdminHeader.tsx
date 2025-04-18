
import { Button } from "@/components/ui/button";
import { LogOut, PlusCircle } from "lucide-react";

interface AdminHeaderProps {
  onAddEvent: () => void;
  onLogout: () => void;
}

export const AdminHeader = ({ onAddEvent, onLogout }: AdminHeaderProps) => {
  return (
    <div className="py-8 bg-gradient-to-r from-event-600 to-event-800 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-event-100">
              Manage AVN Institute events from this control panel
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-2">
            <Button
              variant="default"
              onClick={onAddEvent}
              className="bg-white text-event-800 hover:bg-gray-100"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Event
            </Button>
            <Button 
              variant="outline" 
              onClick={onLogout} 
              className="text-white border-white hover:bg-event-700"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
