
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { useEventStore } from "@/store/eventStore";
import { MotionBox, MotionSection, fadeIn, slideIn } from "@/components/ui/motion";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, User, Share2, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";

const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { events, setCurrentEvent, currentEvent } = useEventStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setCurrentEvent(id);
    }

    return () => {
      // Clean up
    };
  }, [id, setCurrentEvent]);

  if (!currentEvent) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Event not found</h2>
            <Button onClick={() => navigate("/events")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Events
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const handleRegister = () => {
    toast({
      title: "Registration Successful!",
      description: `You have registered for ${currentEvent.title}`,
      duration: 5000,
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: currentEvent.title,
          text: currentEvent.shortDescription,
          url: window.location.href,
        })
        .catch((error) => console.log("Error sharing", error));
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied!",
        description: "Event link copied to clipboard",
        duration: 3000,
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Banner */}
      <div className="relative h-[40vh] md:h-[50vh] w-full overflow-hidden">
        <img
          src={currentEvent.image}
          alt={currentEvent.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
          <Button
            variant="outline"
            size="sm"
            className="bg-white mb-4"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          
          <Badge className="mb-3 bg-primary text-white">
            {currentEvent.category}
          </Badge>
          
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            {currentEvent.title}
          </h1>
        </div>
      </div>

      {/* Event Content */}
      <MotionSection
        initial="hidden"
        animate="visible"
        variants={fadeIn()}
        className="py-12"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Main Content */}
            <MotionBox
              variants={slideIn("left")}
              className="md:col-span-2"
            >
              <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
                <h2 className="text-2xl font-bold mb-6">About this Event</h2>
                <div className="prose max-w-none">
                  <p className="text-gray-600 whitespace-pre-line mb-8">
                    {currentEvent.description}
                  </p>
                </div>
                
                <div className="mt-8">
                  <Button className="w-full md:w-auto" onClick={handleRegister}>
                    Register Now
                  </Button>
                  <Button
                    variant="outline"
                    className="mt-4 md:mt-0 md:ml-4 w-full md:w-auto"
                    onClick={handleShare}
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    Share Event
                  </Button>
                </div>
              </div>
            </MotionBox>

            {/* Side Panel */}
            <MotionBox
              variants={slideIn("right")}
              className="md:col-span-1"
            >
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-4">Event Details</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 mr-3 text-event-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Date</h4>
                      <p className="text-gray-600">{currentEvent.date}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 mr-3 text-event-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Time</h4>
                      <p className="text-gray-600">{currentEvent.time}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 mr-3 text-event-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Venue</h4>
                      <p className="text-gray-600">{currentEvent.venue}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <User className="h-5 w-5 mr-3 text-event-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Contact</h4>
                      <p className="text-gray-600">{currentEvent.contactInfo}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Similar Events */}
              <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                <h3 className="text-xl font-bold mb-4">Similar Events</h3>
                
                <div className="space-y-4">
                  {events
                    .filter(
                      (event) =>
                        event.category === currentEvent.category &&
                        event.id !== currentEvent.id
                    )
                    .slice(0, 3)
                    .map((event) => (
                      <div
                        key={event.id}
                        className="flex items-start space-x-3 p-2 rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
                        onClick={() => navigate(`/events/${event.id}`)}
                      >
                        <div className="h-14 w-14 shrink-0 rounded-md overflow-hidden">
                          <img
                            src={event.image}
                            alt={event.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-medium truncate">{event.title}</h4>
                          <p className="text-sm text-gray-500">{event.date}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </MotionBox>
          </div>
        </div>
      </MotionSection>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">AVN Institute of Engineering & Technology</h3>
              <p className="text-gray-300">
                Providing quality education and memorable events for students.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="/" className="text-gray-300 hover:text-white">Home</a></li>
                <li><a href="/events" className="text-gray-300 hover:text-white">Events</a></li>
                <li><a href="/login" className="text-gray-300 hover:text-white">Admin Login</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <p className="text-gray-300">
                Email: info@avniet.edu<br />
                Phone: +91 123 456 7890<br />
                Address: AVN Campus, Tech City
              </p>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} AVN Institute. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EventDetails;
