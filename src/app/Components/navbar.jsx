// "use client"

// import { useState } from "react"
// import Link from "next/link"
// import { Menu, Github } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false)

//   return (
//     <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//       <div className="container flex h-16 items-center justify-between px-4 md:px-6">
//         <div className="flex items-center gap-2">
//           <Link href="/" className="flex items-center gap-2">
//             <Github className="h-6 w-6" />
//             <span className="text-lg font-bold">Open Galaxy</span>
//           </Link>
//         </div>
//         <nav className="hidden md:flex md:gap-6">
//           <Link href="#" className="text-sm font-medium transition-colors hover:text-primary">
//             Browse Internships
//           </Link>
//           <Link href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
//             Companies
//           </Link>
//           <Link href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
//             Resources
//           </Link>
//           <Link href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
//             About
//           </Link>
//         </nav>
//         <div className="hidden md:flex md:gap-2">
//           <Button variant="outline" size="sm">
//             Log In
//           </Button>
//           <Button size="sm">Sign Up</Button>
//         </div>
//         <Sheet open={isOpen} onOpenChange={setIsOpen}>
//           <SheetTrigger asChild className="md:hidden">
//             <Button variant="outline" size="icon" className="h-8 w-8">
//               <Menu className="h-5 w-5" />
//               <span className="sr-only">Toggle menu</span>
//             </Button>
//           </SheetTrigger>
//           <SheetContent side="right">
//             <div className="flex flex-col gap-6 pt-6">
//               <Link
//                 href="#"
//                 className="text-sm font-medium transition-colors hover:text-primary"
//                 onClick={() => setIsOpen(false)}
//               >
//                 Browse Internships
//               </Link>
//               <Link
//                 href="#"
//                 className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
//                 onClick={() => setIsOpen(false)}
//               >
//                 Companies
//               </Link>
//               <Link
//                 href="#"
//                 className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
//                 onClick={() => setIsOpen(false)}
//               >
//                 Resources
//               </Link>
//               <Link
//                 href="#"
//                 className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
//                 onClick={() => setIsOpen(false)}
//               >
//                 About
//               </Link>
//               <div className="flex flex-col gap-2 pt-4">
//                 <Button variant="outline" size="sm">
//                   Log In
//                 </Button>
//                 <Button size="sm">Sign Up</Button>
//               </div>
//             </div>
//           </SheetContent>
//         </Sheet>
//       </div>
//     </header>
//   )
// }

