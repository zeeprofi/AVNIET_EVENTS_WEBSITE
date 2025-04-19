import { Event } from "@/data/mockEvents";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash2, Eye, Users } from "lucide-react";

interface EventsTableProps {
  events: Event[];
  onEdit: (event: Event) => void;
  onDelete: (event: Event) => void;
  onView: (eventId: string) => void;
  onViewRegistrations: (event: Event) => void;
  sortConfig: {
    key: 'title' | 'date' | 'category';
    direction: 'asc' | 'desc';
  };
  onSort: (key: 'title' | 'date' | 'category') => void;
}

export function EventsTable({
  events,
  onEdit,
  onDelete,
  onView,
  onViewRegistrations,
  sortConfig,
  onSort
}: EventsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[150px]">
            <Button variant="ghost" size="sm" onClick={() => onSort('title')}>
              Title
              {sortConfig.key === 'title' && (sortConfig.direction === 'asc' ? ' ▲' : ' ▼')}
            </Button>
          </TableHead>
          <TableHead>
            <Button variant="ghost" size="sm" onClick={() => onSort('date')}>
              Date
              {sortConfig.key === 'date' && (sortConfig.direction === 'asc' ? ' ▲' : ' ▼')}
            </Button>
          </TableHead>
          <TableHead>
            <Button variant="ghost" size="sm" onClick={() => onSort('category')}>
              Category
              {sortConfig.key === 'category' && (sortConfig.direction === 'asc' ? ' ▲' : ' ▼')}
            </Button>
          </TableHead>
          <TableHead>Registered Teams</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {events.map((event) => (
          <TableRow key={event.id}>
            <TableCell className="font-medium">{event.title}</TableCell>
            <TableCell>{new Date(event.date).toLocaleDateString()}</TableCell>
            <TableCell>{event.category}</TableCell>
            <TableCell>{event.registeredTeams}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onView(event.id)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewRegistrations(event)}
                >
                  <Users className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(event)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-500"
                  onClick={() => onDelete(event)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
