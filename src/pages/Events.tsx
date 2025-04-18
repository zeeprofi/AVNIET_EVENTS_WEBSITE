
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { EventCard } from "@/components/EventCard";
import { useEventStore } from "@/store/eventStore";
import { MotionBox, MotionSection, fadeIn, staggerContainer } from "@/components/ui/motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

const Events = () => {
  const { events } = useEventStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Extract unique categories from events
  const categories = ["all", ...Array.from(new Set(events.map(event => event.category)))];

  // Filter events based on search query and category
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === "all" || event.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Header */}
      <MotionSection
        initial="hidden"
        animate="visible"
        variants={fadeIn()}
        className="py-16 bg-gradient-to-r from-event-600 to-event-800 text-white"
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">All Events</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Explore our diverse range of academic, cultural, and technical events.
          </p>
        </div>
      </MotionSection>

      {/* Filters */}
      <MotionSection
        initial="hidden"
        animate="visible"
        variants={fadeIn(0.2)}
        className="py-8 bg-gray-50"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="w-full md:w-1/2 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                className="pl-10"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="w-full md:w-1/4">
              <Select
                value={categoryFilter}
                onValueChange={setCategoryFilter}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </MotionSection>

      {/* Events Grid */}
      <MotionSection
        initial="hidden"
        animate="visible"
        variants={staggerContainer()}
        className="py-16 flex-grow"
      >
        <div className="container mx-auto px-4">
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event, index) => (
                <EventCard key={event.id} event={event} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-2xl font-bold mb-4">No events found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
              <Button 
                onClick={() => {
                  setSearchQuery("");
                  setCategoryFilter("all");
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}
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

export default Events;
