// import Image from "next/image"
// import { CalendarIcon, MapPin, Clock } from "lucide-react"

// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

// interface InternshipCardProps {
//   company: string
//   title: string
//   location: string
//   duration: string
//   stipend: string
//   deadline: string
//   tags: string[]
//   logo: string
// }

// export default function InternshipCard({
//   company,
//   title,
//   location,
//   duration,
//   stipend,
//   deadline,
//   tags,
//   logo,
// }: InternshipCardProps) {
//   // Format deadline date
//   const formattedDeadline = new Date(deadline).toLocaleDateString("en-US", {
//     year: "numeric",
//     month: "short",
//     day: "numeric",
//   })

//   return (
//     <Card className="overflow-hidden transition-all hover:shadow-md">
//       <CardHeader className="p-4">
//         <div className="flex items-center gap-4">
//           <div className="relative h-12 w-12 overflow-hidden rounded-md">
//             <Image src={logo || "/placeholder.svg"} alt={`${company} logo`} fill className="object-cover" />
//           </div>
//           <div>
//             <h3 className="font-semibold">{company}</h3>
//             <p className="text-sm text-muted-foreground">{title}</p>
//           </div>
//         </div>
//       </CardHeader>
//       <CardContent className="p-4 pt-0">
//         <div className="grid gap-2">
//           <div className="flex items-center gap-2 text-sm">
//             <MapPin className="h-4 w-4 text-muted-foreground" />
//             <span>{location}</span>
//           </div>
//           <div className="flex items-center gap-2 text-sm">
//             <Clock className="h-4 w-4 text-muted-foreground" />
//             <span>{duration}</span>
//           </div>
//           <div className="flex items-center gap-2 text-sm font-medium">
//             <span>Stipend:</span>
//             <span className="text-green-600">{stipend}</span>
//           </div>
//           <div className="flex items-center gap-2 text-sm">
//             <CalendarIcon className="h-4 w-4 text-muted-foreground" />
//             <span>Apply by: {formattedDeadline}</span>
//           </div>
//           <div className="mt-2 flex flex-wrap gap-2">
//             {tags.map((tag) => (
//               <Badge key={tag} variant="secondary" className="text-xs">
//                 {tag}
//               </Badge>
//             ))}
//           </div>
//         </div>
//       </CardContent>
//       <CardFooter className="p-4 pt-0">
//         <Button className="w-full">View Details</Button>
//       </CardFooter>
//     </Card>
//   )
// }

