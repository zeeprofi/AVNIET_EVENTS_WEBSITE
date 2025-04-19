
import { TeamRegistration } from "@/store/eventStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Users } from "lucide-react";

interface TeamRegistrationsViewProps {
  registrations: TeamRegistration[];
}

export function TeamRegistrationsView({ registrations }: TeamRegistrationsViewProps) {
  if (registrations.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Users className="mx-auto h-12 w-12 opacity-20 mb-2" />
        <p>No team registrations yet</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[400px] pr-4">
      <div className="space-y-4">
        {registrations.map((registration) => (
          <Card key={registration.id}>
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                <span>{registration.teamName}</span>
                <span className="text-sm text-gray-500">
                  {new Date(registration.registeredAt).toLocaleDateString()}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Team Leader</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <p><span className="text-gray-500">Name:</span> {registration.leaderName}</p>
                    <p><span className="text-gray-500">Email:</span> {registration.leaderEmail}</p>
                    <p><span className="text-gray-500">Phone:</span> {registration.leaderPhone}</p>
                    <p><span className="text-gray-500">Branch:</span> {registration.leaderBranch}</p>
                    <p><span className="text-gray-500">Year:</span> {registration.leaderYear}</p>
                  </div>
                </div>

                {registration.members.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">Team Members</h4>
                    <div className="space-y-2">
                      {registration.members.map((member, index) => (
                        <div key={index} className="bg-muted/30 p-3 rounded-lg text-sm">
                          <div className="grid grid-cols-2 gap-2">
                            <p><span className="text-gray-500">Name:</span> {member.name}</p>
                            <p><span className="text-gray-500">Email:</span> {member.email}</p>
                            <p><span className="text-gray-500">College ID:</span> {member.collegeId}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
}
