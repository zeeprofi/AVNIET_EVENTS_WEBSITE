import { create } from 'zustand';
import { events as mockEvents, Event } from '../data/mockEvents';

interface TeamMember {
  name: string;
  email: string;
  collegeId: string;
}

export interface TeamRegistration {
  id: string;
  eventId: string;
  teamName: string;
  leaderName: string;
  leaderEmail: string;
  leaderPhone: string;
  leaderBranch: string;
  leaderYear: string;
  members: TeamMember[];
  registeredAt: Date;
}

interface EventState {
  events: Event[];
  featuredEvents: Event[];
  upcomingEvents: Event[];
  currentEvent: Event | null;
  teamRegistrations: TeamRegistration[];
  
  // Actions
  addEvent: (event: Omit<Event, 'id'>) => void;
  updateEvent: (id: string, updatedEvent: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  setCurrentEvent: (id: string) => void;
  clearCurrentEvent: () => void;
  registerTeam: (registration: Omit<TeamRegistration, 'id' | 'registeredAt'>) => void;
  getEventRegistrations: (eventId: string) => TeamRegistration[];
}

export const useEventStore = create<EventState>((set, get) => ({
  events: mockEvents.map(event => ({ ...event, registeredTeams: Math.floor(Math.random() * 10) })),
  featuredEvents: mockEvents.filter(event => event.isFeatured).map(event => ({ ...event, registeredTeams: Math.floor(Math.random() * 10) })),
  upcomingEvents: [...mockEvents].map(event => ({ ...event, registeredTeams: Math.floor(Math.random() * 10) }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
  currentEvent: null,
  teamRegistrations: [],
  
  addEvent: (event) => {
    const newEvent = {
      ...event,
      id: `${Date.now()}`,
      registeredTeams: 0
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
  
  registerTeam: (registrationData) => {
    const newRegistration: TeamRegistration = {
      ...registrationData,
      id: `${Date.now()}`,
      registeredAt: new Date(),
    };

    set((state) => ({
      teamRegistrations: [...state.teamRegistrations, newRegistration],
      events: state.events.map(event =>
        event.id === registrationData.eventId
          ? { ...event, registeredTeams: (event.registeredTeams || 0) + 1 }
          : event
      ),
    }));
  },
  
  getEventRegistrations: (eventId: string) => {
    return get().teamRegistrations.filter(reg => reg.eventId === eventId);
  },
}));
