
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { EventForm } from "@/components/EventForm";
import { useAuthStore } from "@/store/authStore";
import { useEventStore } from "@/store/eventStore";
import { Event } from "@/data/mockEvents";
import { MotionBox, MotionSection, fadeIn, slideIn } from "@/components/ui/motion";
import { toast } from "@/components/ui/use-toast";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { EventFilters } from "@/components/admin/EventFilters";
import { EventsTable } from "@/components/admin/EventsTable";
import { DeleteEventDialog } from "@/components/admin/DeleteEventDialog";

const AdminDashboard = () => {
  const { isAuthenticated, logout } = useAuthStore();
  const { events, addEvent, updateEvent, deleteEvent } = useEventStore();
  const navigate = useNavigate();

  const [showEventForm, setShowEventForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<Event | null>(null);
  const [sortConfig, setSortConfig] = useState<{
    key: 'title' | 'date' | 'category';
    direction: 'asc' | 'desc';
  }>({
    key: 'date',
    direction: 'desc'
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const categories = ["all", ...Array.from(new Set(events.map((event) => event.category)))];

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory =
      categoryFilter === "all" || event.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const sortedEvents = [...filteredEvents].sort((a, b) => {
    const direction = sortConfig.direction === 'asc' ? 1 : -1;
    
    switch (sortConfig.key) {
      case 'title':
        return direction * a.title.localeCompare(b.title);
      case 'date':
        return direction * (new Date(a.date).getTime() - new Date(b.date).getTime());
      case 'category':
        return direction * a.category.localeCompare(b.category);
      default:
        return 0;
    }
  });

  const handleSort = (key: 'title' | 'date' | 'category') => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleAddEvent = (eventData: Omit<Event, "id">) => {
    addEvent(eventData);
    setShowEventForm(false);
  };

  const handleUpdateEvent = (eventData: Omit<Event, "id">) => {
    if (editingEvent) {
      updateEvent(editingEvent.id, eventData);
      setEditingEvent(null);
    }
  };

  const handleDeleteClick = (event: Event) => {
    setEventToDelete(event);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (eventToDelete) {
      deleteEvent(eventToDelete.id);
      toast({
        title: "Event Deleted",
        description: `${eventToDelete.title} has been deleted successfully`,
      });
      setDeleteDialogOpen(false);
      setEventToDelete(null);
    }
  };

  const handleFormCancel = () => {
    setShowEventForm(false);
    setEditingEvent(null);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <MotionSection
        initial="hidden"
        animate="visible"
        variants={fadeIn()}
      >
        <AdminHeader 
          onAddEvent={() => {
            setShowEventForm(true);
            setEditingEvent(null);
          }}
          onLogout={logout}
        />
      </MotionSection>

      <MotionSection
        initial="hidden"
        animate="visible"
        variants={fadeIn(0.2)}
        className="py-8 bg-gray-50"
      >
        <EventFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          categoryFilter={categoryFilter}
          onCategoryChange={setCategoryFilter}
          categories={categories}
        />
      </MotionSection>

      <div className="flex-grow py-8">
        <div className="container mx-auto px-4">
          {showEventForm || editingEvent ? (
            <EventForm
              event={editingEvent || undefined}
              onSubmit={editingEvent ? handleUpdateEvent : handleAddEvent}
              onCancel={handleFormCancel}
              isEditing={!!editingEvent}
            />
          ) : (
            <MotionBox
              initial="hidden"
              animate="visible"
              variants={slideIn("up")}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold">
                  Events ({sortedEvents.length})
                </h2>
              </div>
              
              <EventsTable
                events={sortedEvents}
                onEdit={setEditingEvent}
                onDelete={handleDeleteClick}
                onView={(eventId) => navigate(`/events/${eventId}`)}
                sortConfig={sortConfig}
                onSort={handleSort}
              />
            </MotionBox>
          )}
        </div>
      </div>

      <DeleteEventDialog
        event={eventToDelete}
        isOpen={deleteDialogOpen}
        onClose={() => {
          setDeleteDialogOpen(false);
          setEventToDelete(null);
        }}
        onConfirm={confirmDelete}
      />

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} AVN Institute. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AdminDashboard;
