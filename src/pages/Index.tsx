import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { EventCard, FeaturedEventCard } from "@/components/EventCard";
import { useEventStore } from "@/store/eventStore";
import { Calendar, MapPin } from "lucide-react";
import { MotionBox, MotionSection, fadeIn, slideIn, staggerContainer } from "@/components/ui/motion";

const Index = () => {
  const { featuredEvents, upcomingEvents } = useEventStore();
  const [featuredIndex, setFeaturedIndex] = useState(0);

  const currentFeaturedEvent = featuredEvents[featuredIndex];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <MotionSection
        initial="hidden"
        animate="visible"
        variants={fadeIn()}
        className="relative py-16 md:py-24 bg-gradient-to-r from-event-600 to-event-800 text-white"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <MotionBox
              variants={slideIn("up")}
              className="mb-6"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                AVN Institute Events Portal
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8">
                Discover, participate and celebrate excellence through our campus events.
              </p>
            </MotionBox>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V69.14C57.91,84.09,121.93,75.67,175,67.39,229.19,59,283.09,52.23,321.39,56.44Z" 
                  className="fill-background" />
          </svg>
        </div>
      </MotionSection>

      {/* Featured Events Section */}
      <MotionSection
        initial="hidden"
        animate="visible"
        variants={staggerContainer()}
        className="py-16 bg-background"
      >
        <div className="container mx-auto px-4">
          <MotionBox
            variants={fadeIn()}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Events</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our highlighted events that showcase the best of AVN Institute's academic and cultural excellence.
            </p>
          </MotionBox>

          {currentFeaturedEvent && (
            <div className="mb-16">
              <FeaturedEventCard event={currentFeaturedEvent} index={0} />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEvents.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </div>
        </div>
      </MotionSection>

      {/* Upcoming Events Section */}
      <MotionSection
        initial="hidden"
        animate="visible"
        variants={fadeIn()}
        className="py-16 bg-gray-50"
      >
        <div className="container mx-auto px-4">
          <MotionBox
            variants={slideIn("up")}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Upcoming Events</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Stay updated with all the upcoming events and mark your calendar.
            </p>
          </MotionBox>

          <div className="max-w-5xl mx-auto">
            {upcomingEvents.slice(0, 5).map((event, index) => (
              <MotionBox
                key={event.id}
                variants={fadeIn(index * 0.1)}
                className="bg-white rounded-lg shadow-md p-6 mb-4 transition-all hover:shadow-lg"
              >
                <div className="flex flex-col md:flex-row gap-4 items-start">
                  <div className="md:w-1/4 w-full h-32 rounded-lg overflow-hidden">
                    <img 
                      src={event.image} 
                      alt={event.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="md:w-3/4 w-full">
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{event.shortDescription}</p>
                    
                    <div className="flex flex-wrap gap-4 mb-4">
                      <div className="flex items-center text-gray-500">
                        <Calendar className="h-4 w-4 mr-2 text-event-500" />
                        <span>{event.date}</span>
                      </div>
                      
                      <div className="flex items-center text-gray-500">
                        <MapPin className="h-4 w-4 mr-2 text-event-500" />
                        <span>{event.venue}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </MotionBox>
            ))}
          </div>
        </div>
      </MotionSection>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
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

export default Index;
