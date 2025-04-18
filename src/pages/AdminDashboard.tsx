import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { EventForm } from "@/components/EventForm";
import { useAuthStore } from "@/store/authStore";
import { useEventStore } from "@/store/eventStore";
import { Event } from "@/data/mockEvents";
import { MotionBox, MotionSection, fadeIn, slideIn } from "@/components/ui/motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Edit, Trash2, Search, Calendar, Eye, LogOut } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

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

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory =
      categoryFilter === "all" || event.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const categories = ["all", ...Array.from(new Set(events.map((event) => event.category)))];

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

  const toggleSort = (key: 'title' | 'date' | 'category') => {
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

  const handleEditClick = (event: Event) => {
    setEditingEvent(event);
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

  const cancelDelete = () => {
    setDeleteDialogOpen(false);
    setEventToDelete(null);
  };

  const handleFormCancel = () => {
    setShowEventForm(false);
    setEditingEvent(null);
  };

  const handleViewEvent = (eventId: string) => {
    navigate(`/events/${eventId}`);
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
        className="py-8 bg-gradient-to-r from-event-600 to-event-800 text-white"
      >
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
                onClick={() => {
                  setShowEventForm(true);
                  setEditingEvent(null);
                }}
                className="bg-white text-event-800 hover:bg-gray-100"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Event
              </Button>
              <Button variant="outline" onClick={logout} className="text-white border-white hover:bg-event-700">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </MotionSection>

      <MotionSection
        initial="hidden"
        animate="visible"
        variants={fadeIn(0.2)}
        className="py-8 bg-gray-50"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="w-full md:w-1/2 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                className="pl-10"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
              
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead 
                        className="cursor-pointer hover:bg-gray-50"
                        onClick={() => toggleSort('title')}
                      >
                        Event {sortConfig.key === 'title' && (
                          <span className="ml-1">
                            {sortConfig.direction === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </TableHead>
                      <TableHead 
                        className="cursor-pointer hover:bg-gray-50"
                        onClick={() => toggleSort('date')}
                      >
                        Date {sortConfig.key === 'date' && (
                          <span className="ml-1">
                            {sortConfig.direction === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </TableHead>
                      <TableHead 
                        className="cursor-pointer hover:bg-gray-50"
                        onClick={() => toggleSort('category')}
                      >
                        Category {sortConfig.key === 'category' && (
                          <span className="ml-1">
                            {sortConfig.direction === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedEvents.length > 0 ? (
                      sortedEvents.map((event) => (
                        <TableRow key={event.id}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <div className="h-12 w-12 rounded-md overflow-hidden bg-gray-100">
                                <img
                                  src={event.image}
                                  alt={event.title}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div>
                                <p className="font-medium">{event.title}</p>
                                <p className="text-sm text-gray-500 truncate max-w-xs">
                                  {event.shortDescription}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-2 text-event-500" />
                              {event.date}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{event.category}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={event.isFeatured ? "default" : "secondary"}
                              className={event.isFeatured ? "bg-green-100 text-green-800" : ""}
                            >
                              {event.isFeatured ? "Featured" : "Standard"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleViewEvent(event.id)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEditClick(event)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                onClick={() => handleDeleteClick(event)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8">
                          <p className="text-gray-500">No events found</p>
                          <Button
                            variant="link"
                            onClick={() => {
                              setSearchTerm("");
                              setCategoryFilter("all");
                            }}
                          >
                            Clear filters
                          </Button>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </MotionBox>
          )}
        </div>
      </div>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the event "{eventToDelete?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={cancelDelete}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} AVN Institute. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AdminDashboard;
