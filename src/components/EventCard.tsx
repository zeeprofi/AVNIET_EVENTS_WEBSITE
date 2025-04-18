
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin } from 'lucide-react';
import { Event } from '@/data/mockEvents';
import { MotionBox, scaleIn } from './ui/motion';
import { Badge } from './ui/badge';

interface EventCardProps {
  event: Event;
  index: number;
}

export const EventCard = ({ event, index }: EventCardProps) => {
  return (
    <MotionBox
      initial="hidden"
      animate="visible"
      variants={scaleIn(index * 0.1)}
      whileHover={{ y: -5 }}
      className="event-card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="event-card-image w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="bg-white/80 text-event-800 font-medium">
            {event.category}
          </Badge>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold mb-2 line-clamp-1">{event.title}</h3>
        <p className="text-gray-500 text-sm mb-3 line-clamp-2">{event.shortDescription}</p>
        
        <div className="flex items-center mb-3 text-gray-500 text-sm">
          <Calendar className="h-4 w-4 mr-1 text-event-500" />
          <span>{event.date}</span>
        </div>
        
        <div className="flex items-center mb-4 text-gray-500 text-sm">
          <MapPin className="h-4 w-4 mr-1 text-event-500" />
          <span className="truncate">{event.venue}</span>
        </div>
        
        <Link to={`/events/${event.id}`}>
          <Button variant="default" className="w-full">
            View Details
          </Button>
        </Link>
      </div>
    </MotionBox>
  );
};

export const FeaturedEventCard = ({ event, index }: EventCardProps) => {
  return (
    <MotionBox
      initial="hidden"
      animate="visible"
      variants={scaleIn(index * 0.1)}
      className="featured-event-card rounded-lg overflow-hidden shadow-lg relative"
    >
      <div className="relative h-80 md:h-96 w-full overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        
        <div className="absolute bottom-0 left-0 p-6 w-full">
          <Badge variant="secondary" className="mb-3 bg-primary text-white">
            {event.category}
          </Badge>
          
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            {event.title}
          </h2>
          
          <p className="text-white/90 mb-4 line-clamp-2">
            {event.shortDescription}
          </p>
          
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex items-center text-white/80">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{event.date}</span>
            </div>
            
            <div className="flex items-center text-white/80">
              <MapPin className="h-4 w-4 mr-2" />
              <span>{event.venue}</span>
            </div>
          </div>
          
          <Link to={`/events/${event.id}`}>
            <Button>View Details</Button>
          </Link>
        </div>
      </div>
    </MotionBox>
  );
};
