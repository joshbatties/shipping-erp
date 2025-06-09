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
import { Download, Eye, FileText, MoreHorizontal, Printer, Search, Send } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Header } from "@/components/header"

// Mock data
const invoices = [
  {
    id: "INV-5001",
    arrivalId: "A-4001",
    client: "Acme Corp",
    product: "Industrial Equipment",
    issueDate: "2023-04-16",
    dueDate: "2023-05-16",
    amount: 18750,
    status: "paid",
  },
  {
    id: "INV-5002",
    arrivalId: "A-4002",
    client: "Globex Inc",
    product: "Office Supplies",
    issueDate: "2023-03-26",
    dueDate: "2023-04-26",
    amount: 5460,
    status: "paid",
  },
  {
    id: "INV-5003",
    arrivalId: "A-4003",
    client: "Initech",
    product: "Computer Hardware",
    issueDate: "2023-04-03",
    dueDate: "2023-05-03",
    amount: 12340,
    status: "pending",
  },
  {
    id: "INV-5004",
    arrivalId: "A-4004",
    client: "Massive Dynamic",
    product: "Research Equipment",
    issueDate: "2023-04-11",
    dueDate: "2023-05-11",
    amount: 42500,
    status: "pending",
  },
]

// Mock invoice items
const invoiceItems = [
  { id: 1, description: "Industrial Equipment - Model X2000", quantity: 1, unitPrice: 15000, total: 15000 },
  { id: 2, description: "Extended Warranty", quantity: 1, unitPrice: 2000, total: 2000 },
  { id: 3, description: "Installation Service", quantity: 1, unitPrice: 1000, total: 1000 },
  { id: 4, description: "Shipping and Handling", quantity: 1, unitPrice: 750, total: 750 },
]

export default function InvoicesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null)

  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.arrivalId.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="flex flex-col">
      <Header title="Invoices">
        <Button>
          <FileText className="mr-2 h-4 w-4" />
          New Invoice
        </Button>
      </Header>

      <div className="p-6 space-y-6">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search invoices..."
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
              <DropdownMenuItem>Paid</DropdownMenuItem>
              <DropdownMenuItem>Pending</DropdownMenuItem>
              <DropdownMenuItem>Overdue</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Sort By</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Newest</DropdownMenuItem>
              <DropdownMenuItem>Oldest</DropdownMenuItem>
              <DropdownMenuItem>Due Date</DropdownMenuItem>
              <DropdownMenuItem>Amount: High to Low</DropdownMenuItem>
              <DropdownMenuItem>Amount: Low to High</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Invoices</CardTitle>
            <CardDescription>Manage and track all invoices</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice ID</TableHead>
                  <TableHead>Arrival ID</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Issue Date</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.id}</TableCell>
                    <TableCell>{invoice.arrivalId}</TableCell>
                    <TableCell>{invoice.client}</TableCell>
                    <TableCell>{new Date(invoice.issueDate).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(invoice.dueDate).toLocaleDateString()}</TableCell>
                    <TableCell>${invoice.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant={invoice.status === "paid" ? "success" : "outline"}>
                        {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon" onClick={() => setSelectedInvoice(invoice)}>
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View invoice</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[625px]">
                          <DialogHeader>
                            <DialogTitle>Invoice Details - {selectedInvoice?.id}</DialogTitle>
                            <DialogDescription>View invoice details and manage payment</DialogDescription>
                          </DialogHeader>
                          <Tabs defaultValue="details">
                            <TabsList className="grid w-full grid-cols-2">
                              <TabsTrigger value="details">Invoice Details</TabsTrigger>
                              <TabsTrigger value="items">Line Items</TabsTrigger>
                            </TabsList>
                            <TabsContent value="details" className="space-y-4 py-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label>Client</Label>
                                  <div className="font-medium">{selectedInvoice?.client}</div>
                                </div>
                                <div>
                                  <Label>Product</Label>
                                  <div className="font-medium">{selectedInvoice?.product}</div>
                                </div>
                                <div>
                                  <Label>Issue Date</Label>
                                  <div className="font-medium">
                                    {selectedInvoice && new Date(selectedInvoice.issueDate).toLocaleDateString()}
                                  </div>
                                </div>
                                <div>
                                  <Label>Due Date</Label>
                                  <div className="font-medium">
                                    {selectedInvoice && new Date(selectedInvoice.dueDate).toLocaleDateString()}
                                  </div>
                                </div>
                                <div>
                                  <Label>Status</Label>
                                  <div className="font-medium">
                                    <Badge variant={selectedInvoice?.status === "paid" ? "success" : "outline"}>
                                      {selectedInvoice?.status.charAt(0).toUpperCase() +
                                        selectedInvoice?.status.slice(1)}
                                    </Badge>
                                  </div>
                                </div>
                                <div>
                                  <Label>Amount</Label>
                                  <div className="text-xl font-bold">${selectedInvoice?.amount.toLocaleString()}</div>
                                </div>
                              </div>
                            </TabsContent>
                            <TabsContent value="items" className="py-4">
                              <div className="space-y-4">
                                <Table>
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead>Description</TableHead>
                                      <TableHead className="text-right">Qty</TableHead>
                                      <TableHead className="text-right">Unit Price</TableHead>
                                      <TableHead className="text-right">Total</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {invoiceItems.map((item) => (
                                      <TableRow key={item.id}>
                                        <TableCell>{item.description}</TableCell>
                                        <TableCell className="text-right">{item.quantity}</TableCell>
                                        <TableCell className="text-right">${item.unitPrice.toLocaleString()}</TableCell>
                                        <TableCell className="text-right">${item.total.toLocaleString()}</TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                                <Separator />
                                <div className="flex justify-between">
                                  <div className="font-medium">Subtotal</div>
                                  <div className="font-medium">$18,750.00</div>
                                </div>
                                <div className="flex justify-between">
                                  <div className="font-medium">Tax (0%)</div>
                                  <div className="font-medium">$0.00</div>
                                </div>
                                <Separator />
                                <div className="flex justify-between">
                                  <div className="text-lg font-bold">Total</div>
                                  <div className="text-lg font-bold">$18,750.00</div>
                                </div>
                              </div>
                            </TabsContent>
                          </Tabs>
                          <DialogFooter className="flex justify-between items-center sm:justify-between">
                            <div className="flex gap-2">
                              <Button variant="outline" size="icon">
                                <Download className="h-4 w-4" />
                                <span className="sr-only">Download</span>
                              </Button>
                              <Button variant="outline" size="icon">
                                <Printer className="h-4 w-4" />
                                <span className="sr-only">Print</span>
                              </Button>
                              <Button variant="outline" size="icon">
                                <Send className="h-4 w-4" />
                                <span className="sr-only">Send</span>
                              </Button>
                            </div>
                            <Button>Mark as Paid</Button>
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
                          <DropdownMenuItem>View Invoice</DropdownMenuItem>
                          <DropdownMenuItem>Download PDF</DropdownMenuItem>
                          <DropdownMenuItem>Send to Client</DropdownMenuItem>
                          <DropdownMenuItem>Mark as Paid</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">Delete Invoice</DropdownMenuItem>
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

