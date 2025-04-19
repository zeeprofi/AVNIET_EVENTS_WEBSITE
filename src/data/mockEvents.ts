
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
  organizer: string;
  isFeatured: boolean;
  registeredTeams?: number;
  contactInfo: string;
}

export const events: Event[] = [
  {
    id: '1',
    title: 'Tech Symposium 2024',
    shortDescription: 'Annual tech symposium featuring workshops, talks, and competitions.',
    description: 'Join us for the annual Tech Symposium, a celebration of innovation and technology. This year\'s event includes workshops, talks from industry leaders, and exciting competitions. A great opportunity to learn, network, and showcase your skills.',
    date: '2024-03-15',
    time: '09:00 - 17:00',
    venue: 'AVN Institute Auditorium',
    category: 'Technology',
    image: '/lovable-uploads/f649999c-893d-4051-b91d-852ca801933b.png',
    organizer: 'Tech Club',
    isFeatured: true,
    contactInfo: 'techclub@avniet.edu'
  },
  {
    id: '2',
    title: 'Cultural Fest - "Vibrance"',
    shortDescription: 'A vibrant celebration of culture with music, dance, and art.',
    description: 'Experience the richness of culture at "Vibrance," our annual cultural fest. Enjoy music, dance, art exhibitions, and theatrical performances. A perfect platform to showcase your talent and immerse yourself in diverse traditions.',
    date: '2024-04-22',
    time: '10:00 - 20:00',
    venue: 'AVN Institute Grounds',
    category: 'Cultural',
    image: '/lovable-uploads/4999a958-7951-4597-8971-6c89458a4a7b.png',
    organizer: 'Cultural Committee',
    isFeatured: true,
    contactInfo: 'culturalclub@avniet.edu'
  },
  {
    id: '3',
    title: 'Coding Hackathon',
    shortDescription: 'A 24-hour coding challenge to solve real-world problems.',
    description: 'Participate in our Coding Hackathon, a 24-hour coding challenge designed to solve real-world problems. Collaborate with fellow developers, brainstorm innovative solutions, and compete for exciting prizes. A test of your coding skills and creativity.',
    date: '2024-05-10',
    time: '09:00 - 09:00 (Next Day)',
    venue: 'AVN Institute Computer Labs',
    category: 'Technology',
    image: '/lovable-uploads/4999a958-7951-4597-8971-6c89458a4a7b.png',
    organizer: 'Coding Club',
    isFeatured: false,
    contactInfo: 'codingclub@avniet.edu'
  },
  {
    id: '4',
    title: 'Sports Day',
    shortDescription: 'An energetic day filled with sports and games.',
    description: 'Join us for Sports Day, an energetic day filled with various sports and games. Participate in track events, team sports, and fun games. A great way to stay active, build team spirit, and enjoy a day of friendly competition.',
    date: '2024-06-05',
    time: '08:00 - 18:00',
    venue: 'AVN Institute Sports Complex',
    category: 'Sports',
    image: '/lovable-uploads/f649999c-893d-4051-b91d-852ca801933b.png',
    organizer: 'Sports Committee',
    isFeatured: false,
    contactInfo: 'sports@avniet.edu'
  },
  {
    id: '5',
    title: 'Entrepreneurship Workshop',
    shortDescription: 'A workshop on starting and managing your own business.',
    description: 'Attend our Entrepreneurship Workshop and learn the essentials of starting and managing your own business. Gain insights from successful entrepreneurs, learn about funding opportunities, and develop a business plan. A must-attend for aspiring business owners.',
    date: '2024-07-12',
    time: '10:00 - 16:00',
    venue: 'AVN Institute Seminar Hall',
    category: 'Workshop',
    image: '/lovable-uploads/4999a958-7951-4597-8971-6c89458a4a7b.png',
    organizer: 'E-Cell',
    isFeatured: false,
    contactInfo: 'ecell@avniet.edu'
  },
  {
    id: '6',
    title: 'Arts and Crafts Exhibition',
    shortDescription: 'An exhibition showcasing the creative talents of our students.',
    description: 'Visit our Arts and Crafts Exhibition and admire the creative talents of our students. The exhibition features paintings, sculptures, handicrafts, and digital art. A celebration of creativity and artistic expression.',
    date: '2024-08-19',
    time: '11:00 - 19:00',
    venue: 'AVN Institute Art Gallery',
    category: 'Arts',
    image: '/lovable-uploads/f649999c-893d-4051-b91d-852ca801933b.png',
    organizer: 'Arts Club',
    isFeatured: false,
    contactInfo: 'artsclub@avniet.edu'
  },
  {
    id: '7',
    title: 'Debate Competition',
    shortDescription: 'An intellectual battle of wits and words.',
    description: 'Participate in our Debate Competition, an intellectual battle of wits and words. Sharpen your argumentation skills, research diverse topics, and compete against fellow debaters. A platform to express your views and win accolades.',
    date: '2024-09-26',
    time: '14:00 - 18:00',
    venue: 'AVN Institute Lecture Hall',
    category: 'Debate',
    image: '/lovable-uploads/4999a958-7951-4597-8971-6c89458a4a7b.png',
    organizer: 'Debate Club',
    isFeatured: false,
    contactInfo: 'debateclub@avniet.edu'
  },
  {
    id: '8',
    title: 'Music Concert - "Rhythms"',
    shortDescription: 'A melodious evening of music and song.',
    description: 'Experience a melodious evening of music and song at "Rhythms," our annual music concert. Enjoy performances by talented musicians, singers, and bands. A treat for music lovers.',
    date: '2024-10-03',
    time: '19:00 - 22:00',
    venue: 'AVN Institute Open-Air Theatre',
    category: 'Music',
    image: '/lovable-uploads/f649999c-893d-4051-b91d-852ca801933b.png',
    organizer: 'Music Club',
    isFeatured: false,
    contactInfo: 'musicclub@avniet.edu'
  },
  {
    id: '9',
    title: 'Gaming Tournament',
    shortDescription: 'A thrilling gaming competition for all gaming enthusiasts.',
    description: 'Join our Gaming Tournament and compete against fellow gamers in popular video games. Test your skills, strategize with your team, and win exciting prizes. A must-attend for all gaming enthusiasts.',
    date: '2024-11-11',
    time: '10:00 - 20:00',
    venue: 'AVN Institute Gaming Arena',
    category: 'Gaming',
    image: '/lovable-uploads/4999a958-7951-4597-8971-6c89458a4a7b.png',
    organizer: 'Gaming Club',
    isFeatured: false,
    contactInfo: 'gamingclub@avniet.edu'
  },
  {
    id: '10',
    title: 'Photography Workshop',
    shortDescription: 'Learn the art of photography from experts.',
    description: 'Attend our Photography Workshop and learn the art of photography from experts. Gain insights into camera settings, composition techniques, and photo editing. A great opportunity to enhance your photography skills.',
    date: '2024-12-18',
    time: '10:00 - 16:00',
    venue: 'AVN Institute Photography Studio',
    category: 'Workshop',
    image: '/lovable-uploads/f649999c-893d-4051-b91d-852ca801933b.png',
    organizer: 'Photography Club',
    isFeatured: false,
    contactInfo: 'photoclub@avniet.edu'
  },
];
