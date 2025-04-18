
import { create } from 'zustand';
import { events as mockEvents, Event } from '../data/mockEvents';

interface EventState {
  events: Event[];
  featuredEvents: Event[];
  upcomingEvents: Event[];
  currentEvent: Event | null;
  
  // Actions
  addEvent: (event: Omit<Event, 'id'>) => void;
  updateEvent: (id: string, updatedEvent: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  setCurrentEvent: (id: string) => void;
  clearCurrentEvent: () => void;
}

export const useEventStore = create<EventState>((set, get) => ({
  events: mockEvents,
  featuredEvents: mockEvents.filter(event => event.isFeatured),
  upcomingEvents: [...mockEvents].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
  currentEvent: null,
  
  addEvent: (event) => {
    const newEvent = {
      ...event,
      id: `${Date.now()}`,
    };
    
    set((state) => ({
      events: [...state.events, newEvent],
      featuredEvents: event.isFeatured 
        ? [...state.featuredEvents, newEvent] 
        : state.featuredEvents,
      upcomingEvents: [...state.events, newEvent].sort((a, b) => 
        new Date(a.date).getTime() - new Date(b.date).getTime()
      ),
    }));
  },
  
  updateEvent: (id, updatedEvent) => {
    set((state) => {
      const updatedEvents = state.events.map((event) => 
        event.id === id ? { ...event, ...updatedEvent } : event
      );
      
      return {
        events: updatedEvents,
        featuredEvents: updatedEvents.filter(event => event.isFeatured),
        upcomingEvents: [...updatedEvents].sort((a, b) => 
          new Date(a.date).getTime() - new Date(b.date).getTime()
        ),
        currentEvent: state.currentEvent?.id === id 
          ? { ...state.currentEvent, ...updatedEvent } 
          : state.currentEvent,
      };
    });
  },
  
  deleteEvent: (id) => {
    set((state) => {
      const filteredEvents = state.events.filter(event => event.id !== id);
      
      return {
        events: filteredEvents,
        featuredEvents: filteredEvents.filter(event => event.isFeatured),
        upcomingEvents: [...filteredEvents].sort((a, b) => 
          new Date(a.date).getTime() - new Date(b.date).getTime()
        ),
        currentEvent: state.currentEvent?.id === id ? null : state.currentEvent,
      };
    });
  },
  
  setCurrentEvent: (id) => {
    const event = get().events.find(event => event.id === id) || null;
    set({ currentEvent: event });
  },
  
  clearCurrentEvent: () => {
    set({ currentEvent: null });
  },
}));
