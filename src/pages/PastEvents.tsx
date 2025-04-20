
import { useEventStore } from "@/store/eventStore";
import { Navbar } from "@/components/Navbar";
import { EventCard } from "@/components/EventCard";
import { MotionBox, MotionSection, fadeIn, slideIn } from "@/components/ui/motion";

const PastEvents = () => {
  const { events } = useEventStore();
  const currentDate = new Date();
  
  // Filter past events
  const pastEvents = events
    .filter(event => new Date(event.date) < currentDate)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <MotionSection
        initial="hidden"
        animate="visible"
        variants={fadeIn()}
        className="py-16 bg-background"
      >
        <div className="container mx-auto px-4">
          <MotionBox variants={slideIn("up")} className="mb-12">
            <h1 className="text-4xl font-bold text-center mb-4">Past Events</h1>
            <p className="text-gray-600 text-center max-w-2xl mx-auto">
              Explore our previous events and their highlights
            </p>
          </MotionBox>

          {pastEvents.length === 0 ? (
            <div className="text-center text-gray-500 py-12">
              <p>No past events to display</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pastEvents.map((event, index) => (
                <EventCard key={event.id} event={event} index={index} />
              ))}
            </div>
          )}
        </div>
      </MotionSection>
    </div>
  );
};

export default PastEvents;
