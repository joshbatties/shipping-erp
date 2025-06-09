"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Eye, MoreHorizontal, Search, Truck, CheckSquare } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Header } from "@/components/header"
import { Checkbox } from "@/components/ui/checkbox"

// Mock data
const bookings = [
  {
    id: "B-2001",
    client: "Acme Corp",
    product: "Industrial Equipment",
    bookingDate: "2023-03-10",
    deliveryDate: "2023-04-15",
    status: "confirmed",
    value: 18750,
  },
  {
    id: "B-2002",
    client: "Globex Inc",
    product: "Office Supplies",
    bookingDate: "2023-03-12",
    deliveryDate: "2023-03-25",
    status: "confirmed",
    value: 5460,
  },
  {
    id: "B-2003",
    client: "Wayne Enterprises",
    product: "Security Systems",
    bookingDate: "2023-03-15",
    deliveryDate: "2023-05-01",
    status: "confirmed",
    value: 34500,
  },
  {
    id: "B-2004",
    client: "Stark Industries",
    product: "Tech Components",
    bookingDate: "2023-03-18",
    deliveryDate: "2023-04-10",
    status: "confirmed",
    value: 19760,
  },
  {
    id: "B-2005",
    client: "Umbrella Corp",
    product: "Lab Equipment",
    bookingDate: "2023-03-20",
    deliveryDate: "2023-05-15",
    status: "confirmed",
    value: 38880,
  },
]

// Mock checklist items
const bookingChecklist = [
  { id: 1, label: "Client confirmation received", completed: true },
  { id: 2, label: "Payment processed", completed: true },
  { id: 3, label: "Shipping details confirmed", completed: false },
  { id: 4, label: "Customs documentation prepared", completed: false },
  { id: 5, label: "Carrier booking confirmed", completed: false },
  { id: 6, label: "Pre-shipment inspection scheduled", completed: false },
]

export default function BookingsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBooking, setSelectedBooking] = useState<any>(null)
  const [checklist, setChecklist] = useState(bookingChecklist)

  const filteredBookings = bookings.filter(
    (booking) =>
      booking.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const toggleChecklistItem = (id: number) => {
    setChecklist(checklist.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)))
  }

  return (
    <div className="flex flex-col">
      <Header title="Bookings" />

      <div className="p-6 space-y-6">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search bookings..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Status</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>All</DropdownMenuItem>
              <DropdownMenuItem>Confirmed</DropdownMenuItem>
              <DropdownMenuItem>In Progress</DropdownMenuItem>
              <DropdownMenuItem>Completed</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Sort By</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Newest</DropdownMenuItem>
              <DropdownMenuItem>Oldest</DropdownMenuItem>
              <DropdownMenuItem>Delivery Date</DropdownMenuItem>
              <DropdownMenuItem>Value: High to Low</DropdownMenuItem>
              <DropdownMenuItem>Value: Low to High</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Confirmed Bookings</CardTitle>
            <CardDescription>Manage all confirmed bookings</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Booking ID</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Booking Date</TableHead>
                  <TableHead>Delivery Date</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">{booking.id}</TableCell>
                    <TableCell>{booking.client}</TableCell>
                    <TableCell>{booking.product}</TableCell>
                    <TableCell>{new Date(booking.bookingDate).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(booking.deliveryDate).toLocaleDateString()}</TableCell>
                    <TableCell>${booking.value.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant="default">
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon" onClick={() => setSelectedBooking(booking)}>
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View booking</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[625px]">
                          <DialogHeader>
                            <DialogTitle>Booking Details - {selectedBooking?.id}</DialogTitle>
                            <DialogDescription>Review booking details and manage shipment</DialogDescription>
                          </DialogHeader>
                          <Tabs defaultValue="details">
                            <TabsList className="grid w-full grid-cols-3">
                              <TabsTrigger value="details">Booking Details</TabsTrigger>
                              <TabsTrigger value="shipment">Shipment Info</TabsTrigger>
                              <TabsTrigger value="checklist">Checklist</TabsTrigger>
                            </TabsList>
                            <TabsContent value="details" className="space-y-4 py-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label>Client</Label>
                                  <div className="font-medium">{selectedBooking?.client}</div>
                                </div>
                                <div>
                                  <Label>Product</Label>
                                  <div className="font-medium">{selectedBooking?.product}</div>
                                </div>
                                <div>
                                  <Label>Booking Date</Label>
                                  <div className="font-medium">
                                    {selectedBooking && new Date(selectedBooking.bookingDate).toLocaleDateString()}
                                  </div>
                                </div>
                                <div>
                                  <Label>Delivery Date</Label>
                                  <div className="font-medium">
                                    {selectedBooking && new Date(selectedBooking.deliveryDate).toLocaleDateString()}
                                  </div>
                                </div>
                                <div>
                                  <Label>Status</Label>
                                  <div className="font-medium">
                                    <Badge variant="default">
                                      {selectedBooking?.status.charAt(0).toUpperCase() +
                                        selectedBooking?.status.slice(1)}
                                    </Badge>
                                  </div>
                                </div>
                                <div>
                                  <Label>Value</Label>
                                  <div className="font-medium">${selectedBooking?.value.toLocaleString()}</div>
                                </div>
                              </div>
                            </TabsContent>
                            <TabsContent value="shipment" className="py-4">
                              <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                  <Truck className="h-5 w-5 text-muted-foreground" />
                                  <h3 className="text-lg font-medium">Shipment Details</h3>
                                </div>
                                <div className="rounded-md bg-muted p-4 text-center">
                                  <p className="text-sm text-muted-foreground">No shipment created yet</p>
                                  <Button className="mt-4">Create Shipment</Button>
                                </div>
                              </div>
                            </TabsContent>
                            <TabsContent value="checklist" className="py-4">
                              <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                  <CheckSquare className="h-5 w-5 text-muted-foreground" />
                                  <h3 className="text-lg font-medium">Booking Checklist</h3>
                                </div>
                                <div className="space-y-2">
                                  {checklist.map((item) => (
                                    <div key={item.id} className="flex items-center space-x-2">
                                      <Checkbox
                                        id={`item-${item.id}`}
                                        checked={item.completed}
                                        onCheckedChange={() => toggleChecklistItem(item.id)}
                                      />
                                      <label
                                        htmlFor={`item-${item.id}`}
                                        className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                                          item.completed ? "line-through text-muted-foreground" : ""
                                        }`}
                                      >
                                        {item.label}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </TabsContent>
                          </Tabs>
                          <DialogFooter>
                            <Button variant="outline">Close</Button>
                            <Button>Update Booking</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>Edit Booking</DropdownMenuItem>
                          <DropdownMenuItem>Create Shipment</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">Cancel Booking</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
