import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown"

export function Navbar() {
  return (
    <nav className="bg-background bg-gradient-to-t   py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="/" className="text-2xl font-bold">Ticket'D</a>
        <div className="hidden md:flex space-x-4">
          <a href="#features" className="hover:text-primary">Features</a>
          <a href="#events" className="hover:text-primary">Events</a>
          <a href="#how-it-works" className="hover:text-primary">How It Works</a>
          <a href="#testimonials" className="hover:text-primary">Testimonials</a>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline">Sign In</Button>
          <Button>Sign Up</Button>
        </div>
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Menu</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <a href="#features">Features</a>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <a href="#events">Events</a>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <a href="#how-it-works">How It Works</a>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <a href="#testimonials">Testimonials</a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}