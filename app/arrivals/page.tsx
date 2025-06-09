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
import { ClipboardCheck, Eye, MoreHorizontal, Search } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Header } from "@/components/header"

// Mock data
const arrivals = [
  {
    id: "A-4001",
    shipmentId: "S-3001",
    client: "Acme Corp",
    product: "Industrial Equipment",
    arrivalDate: "2023-04-15",
    status: "arrived",
    location: "Los Angeles Warehouse",
    checklistCompleted: 4,
    checklistTotal: 8,
  },
  {
    id: "A-4002",
    shipmentId: "S-3002",
    client: "Globex Inc",
    product: "Office Supplies",
    arrivalDate: "2023-03-25",
    status: "processing",
    location: "New York Distribution Center",
    checklistCompleted: 6,
    checklistTotal: 6,
  },
  {
    id: "A-4003",
    shipmentId: "S-3005",
    client: "Initech",
    product: "Computer Hardware",
    arrivalDate: "2023-04-02",
    status: "processing",
    location: "Miami Warehouse",
    checklistCompleted: 3,
    checklistTotal: 7,
  },
  {
    id: "A-4004",
    shipmentId: "S-3006",
    client: "Massive Dynamic",
    product: "Research Equipment",
    arrivalDate: "2023-04-10",
    status: "arrived",
    location: "Boston Research Facility",
    checklistCompleted: 2,
    checklistTotal: 9,
  },
]

// Mock checklist items
const checklistItems = [
  { id: 1, label: "Verify package count", completed: true },
  { id: 2, label: "Inspect for external damage", completed: true },
  { id: 3, label: "Check product condition", completed: true },
  { id: 4, label: "Verify product specifications", completed: true },
  { id: 5, label: "Quality control inspection", completed: false },
  { id: 6, label: "Update inventory system", completed: false },
  { id: 7, label: "Prepare for client delivery", completed: false },
  { id: 8, label: "Generate final invoice", completed: false },
]

export default function ArrivalsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedArrival, setSelectedArrival] = useState<any>(null)
  const [checklist, setChecklist] = useState(checklistItems)

  const filteredArrivals = arrivals.filter(
    (arrival) =>
      arrival.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      arrival.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      arrival.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      arrival.shipmentId.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const toggleChecklistItem = (id: number) => {
    setChecklist(checklist.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)))
  }

  return (
    <div className="flex flex-col">
      <Header title="Arrivals" />

      <div className="p-6 space-y-6">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search arrivals..."
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
              <DropdownMenuItem>Arrived</DropdownMenuItem>
              <DropdownMenuItem>Processing</DropdownMenuItem>
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
              <DropdownMenuItem>Checklist Progress</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Arrivals</CardTitle>
            <CardDescription>Process arrived shipments and complete checklists</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Arrival ID</TableHead>
                  <TableHead>Shipment ID</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Arrival Date</TableHead>
                  <TableHead>Checklist</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredArrivals.map((arrival) => (
                  <TableRow key={arrival.id}>
                    <TableCell className="font-medium">{arrival.id}</TableCell>
                    <TableCell>{arrival.shipmentId}</TableCell>
                    <TableCell>{arrival.client}</TableCell>
                    <TableCell>{arrival.product}</TableCell>
                    <TableCell>{new Date(arrival.arrivalDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary"
                            style={{ width: `${(arrival.checklistCompleted / arrival.checklistTotal) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-xs whitespace-nowrap">
                          {arrival.checklistCompleted}/{arrival.checklistTotal}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={arrival.status === "arrived" ? "outline" : "default"}>
                        {arrival.status.charAt(0).toUpperCase() + arrival.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon" onClick={() => setSelectedArrival(arrival)}>
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View arrival</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[625px]">
                          <DialogHeader>
                            <DialogTitle>Arrival Details - {selectedArrival?.id}</DialogTitle>
                            <DialogDescription>Process arrival and complete checklist</DialogDescription>
                          </DialogHeader>
                          <Tabs defaultValue="details">
                            <TabsList className="grid w-full grid-cols-2">
                              <TabsTrigger value="details">Arrival Details</TabsTrigger>
                              <TabsTrigger value="checklist">Checklist</TabsTrigger>
                            </TabsList>
                            <TabsContent value="details" className="space-y-4 py-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label>Client</Label>
                                  <div className="font-medium">{selectedArrival?.client}</div>
                                </div>
                                <div>
                                  <Label>Product</Label>
                                  <div className="font-medium">{selectedArrival?.product}</div>
                                </div>
                                <div>
                                  <Label>Arrival Date</Label>
                                  <div className="font-medium">
                                    {selectedArrival && new Date(selectedArrival.arrivalDate).toLocaleDateString()}
                                  </div>
                                </div>
                                <div>
                                  <Label>Location</Label>
                                  <div className="font-medium">{selectedArrival?.location}</div>
                                </div>
                                <div>
                                  <Label>Status</Label>
                                  <div className="font-medium">
                                    <Badge variant={selectedArrival?.status === "arrived" ? "outline" : "default"}>
                                      {selectedArrival?.status.charAt(0).toUpperCase() +
                                        selectedArrival?.status.slice(1)}
                                    </Badge>
                                  </div>
                                </div>
                                <div>
                                  <Label>Checklist Progress</Label>
                                  <div className="font-medium">
                                    {selectedArrival?.checklistCompleted}/{selectedArrival?.checklistTotal} completed
                                  </div>
                                </div>
                              </div>
                            </TabsContent>
                            <TabsContent value="checklist" className="py-4">
                              <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                  <ClipboardCheck className="h-5 w-5 text-muted-foreground" />
                                  <h3 className="text-lg font-medium">Processing Checklist</h3>
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
                            <Button>Save Changes</Button>
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
                          <DropdownMenuItem>View Checklist</DropdownMenuItem>
                          <DropdownMenuItem>Update Status</DropdownMenuItem>
                          <DropdownMenuItem>Generate Invoice</DropdownMenuItem>
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

