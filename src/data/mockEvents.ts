
export interface Event {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  category: string;
  image: string;
  contactInfo: string;
  isFeatured: boolean;
}

export const events: Event[] = [
  {
    id: "1",
    title: "Tech Symposium 2025",
    shortDescription: "Annual technical symposium showcasing innovative projects",
    description: "Join us for the annual Technical Symposium where students showcase their innovative projects and research. The event features technical paper presentations, project exhibitions, coding competitions, and guest lectures from industry experts. This is an excellent opportunity to network with professionals and academic leaders in various engineering fields.",
    date: "May 15, 2025",
    time: "9:00 AM - 5:00 PM",
    venue: "Main Auditorium, AVN Institute",
    category: "Technical",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
    contactInfo: "techsymposium@avniet.edu",
    isFeatured: true
  },
  {
    id: "2",
    title: "Cultural Fest Harmony",
    shortDescription: "Celebrating diversity through art, music, and dance",
    description: "Harmony is AVN Institute's annual cultural extravaganza that celebrates diversity through various art forms. The fest includes dance competitions, musical performances, theatrical acts, fashion shows, and a range of cultural activities. Students from various colleges participate, making it a vibrant showcase of talent and creativity.",
    date: "June 10-12, 2025",
    time: "10:00 AM - 8:00 PM",
    venue: "College Campus",
    category: "Cultural",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2070&auto=format&fit=crop",
    contactInfo: "harmony@avniet.edu",
    isFeatured: true
  },
  {
    id: "3",
    title: "AI & Machine Learning Workshop",
    shortDescription: "Hands-on workshop on the latest AI technologies",
    description: "This intensive workshop covers the fundamentals and advanced concepts of Artificial Intelligence and Machine Learning. Industry experts will guide participants through practical sessions on neural networks, deep learning, computer vision, and natural language processing. Participants will work on real-world projects and receive certificates upon completion.",
    date: "July 5, 2025",
    time: "9:30 AM - 4:30 PM",
    venue: "Computer Science Block",
    category: "Workshop",
    image: "https://images.unsplash.com/photo-1591453089816-0fbb971b454c?q=80&w=2070&auto=format&fit=crop",
    contactInfo: "aiworkshop@avniet.edu",
    isFeatured: false
  },
  {
    id: "4",
    title: "Entrepreneurship Summit",
    shortDescription: "Learn from successful entrepreneurs and startup founders",
    description: "The Entrepreneurship Summit brings together successful entrepreneurs, venture capitalists, and industry leaders to share insights on building and scaling businesses. The event includes panel discussions, keynote speeches, startup pitching sessions, and networking opportunities. This is ideal for students interested in entrepreneurship and innovation.",
    date: "August 20, 2025",
    time: "10:00 AM - 6:00 PM",
    venue: "Business School Auditorium",
    category: "Business",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2074&auto=format&fit=crop",
    contactInfo: "esummit@avniet.edu",
    isFeatured: true
  },
  {
    id: "5",
    title: "Robotics Competition",
    shortDescription: "Battle of robots designed by engineering students",
    description: "The annual Robotics Competition challenges student teams to design, build, and program robots to complete specific tasks. The competition tests participants' mechanical design, programming, and problem-solving skills. Categories include line following robots, obstacle avoidance, and robot wars. Attractive prizes and recognition await the winning teams.",
    date: "September 8, 2025",
    time: "11:00 AM - 7:00 PM",
    venue: "Engineering Workshop Hall",
    category: "Technical",
    image: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?q=80&w=2037&auto=format&fit=crop",
    contactInfo: "robotics@avniet.edu",
    isFeatured: false
  },
  {
    id: "6",
    title: "Sports Meet 2025",
    shortDescription: "Annual inter-college sports competition",
    description: "AVN Institute's Annual Sports Meet brings together athletes from various colleges to compete in disciplines like athletics, cricket, football, basketball, volleyball, and more. The three-day event fosters sportsmanship and physical fitness while providing a platform for talented athletes to showcase their skills. Trophies and medals will be awarded to winners in each category.",
    date: "October 15-17, 2025",
    time: "8:00 AM - 6:00 PM",
    venue: "College Sports Complex",
    category: "Sports",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=2070&auto=format&fit=crop",
    contactInfo: "sportsmeet@avniet.edu",
    isFeatured: true
  }
];
