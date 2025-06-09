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
import { Progress } from "@/components/ui/progress"
import { Header } from "@/components/header"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"

// Mock data
const shipments = [
  {
    id: "S-3001",
    bookingId: "B-2001",
    client: "Acme Corp",
    product: "Industrial Equipment",
    origin: "Shanghai, China",
    destination: "Los Angeles, USA",
    departureDate: "2023-03-20",
    arrivalDate: "2023-04-15",
    status: "in transit",
    progress: 65,
    carrier: "Ocean Freight Ltd",
    trackingNumber: "OCF12345678",
    isAutoUpdated: true,
  },
  {
    id: "S-3002",
    bookingId: "B-2002",
    client: "Globex Inc",
    product: "Office Supplies",
    origin: "Guangzhou, China",
    destination: "New York, USA",
    departureDate: "2023-03-15",
    arrivalDate: "2023-03-25",
    status: "in transit",
    progress: 85,
    carrier: "Air Express",
    trackingNumber: "AEX87654321",
    isAutoUpdated: false,
  },
  {
    id: "S-3003",
    bookingId: "B-2003",
    client: "Wayne Enterprises",
    product: "Security Systems",
    origin: "Tokyo, Japan",
    destination: "Chicago, USA",
    departureDate: "2023-03-25",
    arrivalDate: "2023-05-01",
    status: "in transit",
    progress: 40,
    carrier: "Global Logistics",
    trackingNumber: "GL98765432",
    isAutoUpdated: true,
  },
  {
    id: "S-3004",
    bookingId: "B-2004",
    client: "Stark Industries",
    product: "Tech Components",
    origin: "Seoul, South Korea",
    destination: "San Francisco, USA",
    departureDate: "2023-03-22",
    arrivalDate: "2023-04-10",
    status: "in transit",
    progress: 70,
    carrier: "Tech Transit",
    trackingNumber: "TT56781234",
    isAutoUpdated: false,
  },
]

// Mock checklist items
const shipmentChecklist = [
  { id: 1, label: "Booking confirmation received", completed: true },
  { id: 2, label: "Export documentation prepared", completed: true },
  { id: 3, label: "Customs clearance completed", completed: false },
  { id: 4, label: "Container loaded and sealed", completed: false },
  { id: 5, label: "Bill of Lading issued", completed: false },
  { id: 6, label: "Shipment departed from origin", completed: false },
]

export default function ShipmentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedShipment, setSelectedShipment] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [checklist, setChecklist] = useState(shipmentChecklist)

  const filteredShipments = shipments.filter(
    (shipment) =>
      shipment.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.bookingId.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const toggleChecklistItem = (id: number) => {
    setChecklist(checklist.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)))
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    // Here you would typically save the changes to your backend
    setIsEditing(false)
  }

  return (
    <div className="flex flex-col">
      <Header title="Shipments" />

      <div className="p-6 space-y-6">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search shipments..."
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
              <DropdownMenuItem>In Transit</DropdownMenuItem>
              <DropdownMenuItem>Arrived</DropdownMenuItem>
              <DropdownMenuItem>Delayed</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Sort By</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Newest</DropdownMenuItem>
              <DropdownMenuItem>Oldest</DropdownMenuItem>
              <DropdownMenuItem>Arrival Date</DropdownMenuItem>
              <DropdownMenuItem>Progress</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Active Shipments</CardTitle>
            <CardDescription>Track all shipments currently in transit</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Shipment ID</TableHead>
                  <TableHead>Booking ID</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Arrival Date</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>ETA Updates</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredShipments.map((shipment) => (
                  <TableRow key={shipment.id}>
                    <TableCell className="font-medium">{shipment.id}</TableCell>
                    <TableCell>{shipment.bookingId}</TableCell>
                    <TableCell>{shipment.client}</TableCell>
                    <TableCell>{shipment.product}</TableCell>
                    <TableCell>{new Date(shipment.arrivalDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={shipment.progress} className="h-2" />
                        <span className="text-xs text-muted-foreground">{shipment.progress}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {shipment.status.charAt(0).toUpperCase() + shipment.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={shipment.isAutoUpdated ? "default" : "outline"}>
                        {shipment.isAutoUpdated ? "Auto" : "Manual"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setSelectedShipment(shipment)
                              setIsEditing(false)
                            }}
                          >
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View shipment</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[625px]">
                          <DialogHeader>
                            <DialogTitle>Shipment Details - {selectedShipment?.id}</DialogTitle>
                            <DialogDescription>Track shipment progress and update status</DialogDescription>
                          </DialogHeader>
                          <Tabs defaultValue="details">
                            <TabsList className="grid w-full grid-cols-3">
                              <TabsTrigger value="details">Shipment Details</TabsTrigger>
                              <TabsTrigger value="tracking">Tracking Info</TabsTrigger>
                              <TabsTrigger value="checklist">Checklist</TabsTrigger>
                            </TabsList>
                            <TabsContent value="details" className="space-y-4 py-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label>Client</Label>
                                  <div className="font-medium">{selectedShipment?.client}</div>
                                </div>
                                <div>
                                  <Label>Product</Label>
                                  <div className="font-medium">{selectedShipment?.product}</div>
                                </div>
                                <div>
                                  <Label>Origin</Label>
                                  <div className="font-medium">{selectedShipment?.origin}</div>
                                </div>
                                <div>
                                  <Label>Destination</Label>
                                  <div className="font-medium">{selectedShipment?.destination}</div>
                                </div>
                                <div>
                                  <Label>Departure Date</Label>
                                  <div className="font-medium">
                                    {selectedShipment && new Date(selectedShipment.departureDate).toLocaleDateString()}
                                  </div>
                                </div>
                                <div>
                                  <Label>Arrival Date</Label>
                                  {isEditing ? (
                                    <Input type="date" defaultValue={selectedShipment?.arrivalDate} />
                                  ) : (
                                    <div className="font-medium">
                                      {selectedShipment && new Date(selectedShipment.arrivalDate).toLocaleDateString()}
                                    </div>
                                  )}
                                </div>
                                <div>
                                  <Label>Carrier</Label>
                                  {isEditing ? (
                                    <Input type="text" defaultValue={selectedShipment?.carrier} />
                                  ) : (
                                    <div className="font-medium">{selectedShipment?.carrier}</div>
                                  )}
                                </div>
                                <div>
                                  <Label>Tracking Number</Label>
                                  <div className="font-medium">{selectedShipment?.trackingNumber}</div>
                                </div>
                                <div className="col-span-2">
                                  <Label>ETA Updates</Label>
                                  <div className="flex items-center space-x-2 mt-1">
                                    <Switch
                                      checked={selectedShipment?.isAutoUpdated}
                                      onCheckedChange={(checked) => {
                                        setSelectedShipment({ ...selectedShipment, isAutoUpdated: checked })
                                      }}
                                    />
                                    <Label>{selectedShipment?.isAutoUpdated ? "Automatic (API)" : "Manual"}</Label>
                                  </div>
                                </div>
                              </div>
                            </TabsContent>
                            <TabsContent value="tracking" className="py-4">
                              <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                  <Truck className="h-5 w-5 text-muted-foreground" />
                                  <h3 className="text-lg font-medium">Shipment Progress</h3>
                                </div>
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Transit Progress</span>
                                    <span className="text-sm text-muted-foreground">{selectedShipment?.progress}%</span>
                                  </div>
                                  <Progress value={selectedShipment?.progress} className="h-2" />
                                </div>
                                <div className="space-y-4 pt-4">
                                  <div className="flex items-center gap-4">
                                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                                      1
                                    </div>
                                    <div>
                                      <p className="font-medium">Departed from Origin</p>
                                      <p className="text-sm text-muted-foreground">
                                        {selectedShipment &&
                                          new Date(selectedShipment.departureDate).toLocaleDateString()}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="ml-4 h-10 w-px bg-muted"></div>
                                  <div className="flex items-center gap-4">
                                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                                      2
                                    </div>
                                    <div>
                                      <p className="font-medium">In Transit</p>
                                      <p className="text-sm text-muted-foreground">Currently in transit</p>
                                    </div>
                                  </div>
                                  <div className="ml-4 h-10 w-px bg-muted"></div>
                                  <div className="flex items-center gap-4">
                                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                                      3
                                    </div>
                                    <div>
                                      <p className="font-medium">Arrival at Destination</p>
                                      <p className="text-sm text-muted-foreground">
                                        {selectedShipment &&
                                          new Date(selectedShipment.arrivalDate).toLocaleDateString()}{" "}
                                        (Expected)
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </TabsContent>
                            <TabsContent value="checklist" className="py-4">
                              <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                  <CheckSquare className="h-5 w-5 text-muted-foreground" />
                                  <h3 className="text-lg font-medium">Shipment Checklist</h3>
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
                            {isEditing ? (
                              <>
                                <Button variant="outline" onClick={() => setIsEditing(false)}>
                                  Cancel
                                </Button>
                                <Button onClick={handleSave}>Save Changes</Button>
                              </>
                            ) : (
                              <>
                                <Button variant="outline" onClick={() => setIsEditing(true)}>
                                  Edit
                                </Button>
                                <Button>Mark as Arrived</Button>
                              </>
                            )}
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
                          <DropdownMenuItem>Update Status</DropdownMenuItem>
                          <DropdownMenuItem>Update Tracking</DropdownMenuItem>
                          <DropdownMenuItem>Mark as Arrived</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">Report Issue</DropdownMenuItem>
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
