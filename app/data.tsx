import { Search, Users, BadgeCheck, Clock, Shield, MessageSquare } from "lucide-react";

//Data for the features section
const FEATURES = [
    {
      icon: <Search className="h-6 w-6" />,
      title: "Smart Matching",
      desc: "Match by age range, gender, skills, interests, hobbies, location, and languages in minutes.",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "10,000+ Workers",
      desc: "Australia-wide network of vetted support workers ready for community access, skill-building, and more.",
    },
    {
      icon: <BadgeCheck className="h-6 w-6" />,
      title: "Verified & Compliant",
      desc: "WWCC, NDIS Worker Screening, Police Checks and references recorded and tracked.",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Fast Turnaround",
      desc: "Shortlist in 24–72 hours for most requests. Meet-and-greet is always free.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "NDIS-Aligned",
      desc: "Fees follow the NDIS Price Guide. Transparent, no lock-in contracts.",
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Human Support",
      desc: "Real coordinators to help refine preferences and manage ongoing rosters.",
    },
  ];
  
  const WORKERS = [
    {
      name: "Hugh P.",
      role: "Community Access & Mentoring",
      rating: 4.9,
      location: "Sydney • Inner West",
      tags: ["Gaming", "Basketball", "Cooking", "Autism Experience"],
      languages: ["English"],
      skills: ["Social Skills", "Transport", "Homework Support"],
    },
    {
      name: "Sarah A.",
      role: "Personal Care & Skills-Building",
      rating: 4.8,
      location: "Brisbane • Northside",
      tags: ["Art", "Pets", "Swimming"],
      languages: ["English", "Spanish"],
      skills: ["Personal Care", "Meal Prep", "Community Access"],
    },
    {
      name: "Renee B.",
      role: "Active Support & Community Access",
      rating: 4.7,
      location: "Melbourne • East",
      tags: ["Hiking", "Board Games", "Photography"],
      languages: ["English", "Auslan (basic)"],
      skills: ["Travel Training", "Goal Setting", "Routine Building"],
    },
  ];
  
  const FAQS = [
    {
      q: "How does Support Match work?",
      a: "Tell us what you’re after—duties, hours, location, preferences—and our matching engine plus human team shortlist the best-fit workers. You can review profiles, organise a free meet & greet, and only proceed if it’s a great fit.",
    },
    {
      q: "Is there a fee to post a request?",
      a: "No. Posting and shortlisting are free. If you choose to proceed, services are billed in line with the NDIS Price Guide.",
    },
    {
      q: "Do you verify workers?",
      a: "Yes. We record Worker Screening, WWCC, Police Checks, First Aid/CPR and references, and monitor expiries.",
    },
    {
      q: "Can families use Support Match?",
      a: "Absolutely. Participants, families and support coordinators can all submit requests and manage preferences.",
    },
  ];

  export { FEATURES, WORKERS, FAQS };