import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEventStore, TeamRegistration as TeamRegistrationType } from "@/store/eventStore";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, PlusCircle, UserPlus, CheckCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { MotionBox, MotionSection, fadeIn, slideIn } from "@/components/ui/motion";

// Define the team member schema to match TeamMember type in eventStore
const teamMemberSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  collegeId: z.string().min(3, { message: "College ID is required" }),
});

const formSchema = z.object({
  eventId: z.string(),
  teamName: z.string().min(3, { message: "Team name must be at least 3 characters" }),
  leaderName: z.string().min(3, { message: "Name must be at least 3 characters" }),
  leaderEmail: z.string().email({ message: "Please enter a valid email address" }),
  leaderPhone: z.string().min(10, { message: "Please enter a valid phone number" }),
  leaderBranch: z.string().min(2, { message: "Branch is required" }),
  leaderYear: z.string().min(1, { message: "Year is required" }),
  members: z.array(teamMemberSchema).max(5, { message: "Maximum 5 members allowed" }),
});

type FormValues = z.infer<typeof formSchema>;

const TeamRegistration = () => {
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get("eventId") || "";
  const { events, registerTeam } = useEventStore();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showSuccess, setShowSuccess] = useState(false);

  const event = events.find((e) => e.id === eventId);
  const MAX_TEAM_SIZE = 5; // Maximum number of team members allowed

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      eventId,
      teamName: "",
      leaderName: "",
      leaderEmail: "",
      leaderPhone: "",
      leaderBranch: "",
      leaderYear: "",
      members: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "members",
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data);
    
    // Create registration data with the correct type structure
    // Ensuring all members have the required properties as non-optional
    const registrationData: Omit<TeamRegistrationType, 'id' | 'registeredAt'> = {
      eventId: data.eventId,
      teamName: data.teamName,
      leaderName: data.leaderName,
      leaderEmail: data.leaderEmail,
      leaderPhone: data.leaderPhone,
      leaderBranch: data.leaderBranch,
      leaderYear: data.leaderYear,
      // The members array now has the correct type because of our formSchema definition
      members: data.members.map(member => ({
        name: member.name,
        email: member.email,
        collegeId: member.collegeId
      }))
    };

    registerTeam(registrationData);
    setShowSuccess(true);
    
    toast({
      title: "Registration Submitted!",
      description: `${data.teamName} has been registered successfully.`,
      duration: 5000,
    });
  };

  const addTeamMember = () => {
    if (fields.length < MAX_TEAM_SIZE) {
      append({ name: "", email: "", collegeId: "" });
    } else {
      toast({
        title: "Maximum Team Size Reached",
        description: `Teams cannot have more than ${MAX_TEAM_SIZE} members.`,
        variant: "destructive",
      });
    }
  };

  const closeSuccessDialog = () => {
    setShowSuccess(false);
    navigate("/events");
  };

  const branchOptions = [
    "Computer Science",
    "Information Technology",
    "Electronics & Communication",
    "Electrical & Electronics",
    "Mechanical",
    "Civil",
    "Chemical",
    "Biotechnology",
  ];

  const yearOptions = ["1", "2", "3", "4", "5"];

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Event Not Found</CardTitle>
              <CardDescription>The event you're looking for doesn't exist.</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button onClick={() => navigate("/events")} className="w-full">
                Browse Events
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <MotionSection
        initial="hidden"
        animate="visible"
        variants={fadeIn()}
        className="py-10 bg-gradient-to-r from-event-600 to-event-800 text-white"
      >
        <div className="container mx-auto px-4">
          <MotionBox
            variants={slideIn("up")}
            className="text-center"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Team Registration</h1>
            <p className="text-lg text-white/90">
              Register your team for {event.title}
            </p>
          </MotionBox>
        </div>
      </MotionSection>

      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-4xl mx-auto shadow-lg border-t-4 border-t-event-500">
          <CardHeader className="bg-gray-50 rounded-t-lg">
            <CardTitle className="text-2xl text-center text-event-700">Team Registration Form</CardTitle>
            <CardDescription className="text-center">
              Fill in the details to register your team for {event.title}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Event Name (Read-only) */}
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded overflow-hidden shrink-0">
                      <img src={event.image} alt={event.title} className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{event.title}</h3>
                      <p className="text-sm text-gray-500">{event.date} • {event.venue}</p>
                    </div>
                  </div>
                </div>

                {/* Team Name */}
                <FormField
                  control={form.control}
                  name="teamName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Team Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your team name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Team Leader Section */}
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                  <h3 className="text-lg font-semibold mb-4 text-event-700 flex items-center">
                    <UserPlus className="mr-2 h-5 w-5" />
                    Team Leader Information
                  </h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Leader's Full Name */}
                    <FormField
                      control={form.control}
                      name="leaderName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Leader's Email */}
                    <FormField
                      control={form.control}
                      name="leaderEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter email address" type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Leader's Phone */}
                    <FormField
                      control={form.control}
                      name="leaderPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Leader's Branch */}
                    <FormField
                      control={form.control}
                      name="leaderBranch"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Branch</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select branch" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {branchOptions.map((branch) => (
                                <SelectItem key={branch} value={branch}>
                                  {branch}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Leader's Year */}
                    <FormField
                      control={form.control}
                      name="leaderYear"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Year of Study</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select year" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {yearOptions.map((year) => (
                                <SelectItem key={year} value={year}>
                                  Year {year}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Team Members Section */}
                <div className="border border-gray-100 rounded-lg">
                  <div className="p-4 bg-gray-50 rounded-t-lg flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold text-event-700">Team Members</h3>
                      <p className="text-sm text-gray-500">
                        Maximum {MAX_TEAM_SIZE} members allowed • {MAX_TEAM_SIZE - fields.length} spots remaining
                      </p>
                    </div>
                    <Button 
                      type="button" 
                      onClick={addTeamMember} 
                      variant="outline"
                      className="flex items-center text-event-700"
                      disabled={fields.length >= MAX_TEAM_SIZE}
                    >
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Member
                    </Button>
                  </div>

                  <div className="p-4">
                    {fields.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <p>No team members added yet.</p>
                        <p className="text-sm">Click the "Add Member" button to add team members.</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {fields.map((field, index) => (
                          <div key={field.id} className="p-4 border border-gray-100 rounded-lg">
                            <div className="flex justify-between items-center mb-3">
                              <h4 className="font-medium">Team Member {index + 1}</h4>
                              <Button 
                                type="button" 
                                onClick={() => remove(index)} 
                                variant="ghost"
                                size="sm"
                                className="text-red-500 h-8"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="grid md:grid-cols-3 gap-4">
                              {/* Member Name */}
                              <FormField
                                control={form.control}
                                name={`members.${index}.name`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                      <Input placeholder="Enter full name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              {/* Member Email */}
                              <FormField
                                control={form.control}
                                name={`members.${index}.email`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                      <Input placeholder="Enter email" type="email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              {/* Member College ID */}
                              <FormField
                                control={form.control}
                                name={`members.${index}.collegeId`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>College ID</FormLabel>
                                    <FormControl>
                                      <Input placeholder="Enter college ID" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Button type="submit" className="w-full">Submit Registration</Button>
                  <Button type="button" variant="outline" onClick={() => navigate("/events")} className="w-full">
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center text-center justify-center text-green-600">
              <CheckCircle className="h-6 w-6 mr-2" />
              Registration Successful!
            </DialogTitle>
            <DialogDescription className="text-center pt-4">
              Your team has been successfully registered for {event.title}. We'll contact you with further details soon.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center mt-4">
            <Button onClick={closeSuccessDialog} className="w-full sm:w-auto">
              Return to Events
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeamRegistration;
