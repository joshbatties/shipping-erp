"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, FileText, History } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Header } from "@/components/header"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

// Mock data
const quotes = [
  {
    id: "Q-1001",
    client: "Acme Corp",
    product: "Industrial Equipment",
    requestDate: "2023-03-01",
    status: "pending",
  },
  {
    id: "Q-1002",
    client: "Globex Inc",
    product: "Office Supplies",
    requestDate: "2023-03-02",
    status: "pending",
  },
  {
    id: "Q-1003",
    client: "Wayne Enterprises",
    product: "Security Systems",
    requestDate: "2023-03-03",
    status: "pending",
  },
  {
    id: "Q-1004",
    client: "Stark Industries",
    product: "Tech Components",
    requestDate: "2023-03-04",
    status: "pending",
  },
  {
    id: "Q-1005",
    client: "Umbrella Corp",
    product: "Lab Equipment",
    requestDate: "2023-03-05",
    status: "pending",
  },
]

// Mock suppliers data
const suppliers = {
  "Q-1001": [
    { id: 1, name: "EquipmentPro", costPrice: 12500, deliveryTime: "2 weeks" },
    { id: 2, name: "Industrial Solutions", costPrice: 13200, deliveryTime: "10 days" },
    { id: 3, name: "MachineWorks", costPrice: 11800, deliveryTime: "3 weeks" },
  ],
  "Q-1002": [
    { id: 1, name: "Office Depot", costPrice: 4200, deliveryTime: "3 days" },
    { id: 2, name: "Staples", costPrice: 4350, deliveryTime: "2 days" },
    { id: 3, name: "OfficeMax", costPrice: 4100, deliveryTime: "5 days" },
  ],
  "Q-1003": [
    { id: 1, name: "SecureTech", costPrice: 28750, deliveryTime: "4 weeks" },
    { id: 2, name: "Guardian Systems", costPrice: 30200, deliveryTime: "3 weeks" },
    { id: 3, name: "FortressOne", costPrice: 27500, deliveryTime: "5 weeks" },
  ],
  "Q-1004": [
    { id: 1, name: "TechSupply", costPrice: 15800, deliveryTime: "1 week" },
    { id: 2, name: "ComponentWorld", costPrice: 16200, deliveryTime: "5 days" },
    { id: 3, name: "CircuitMaster", costPrice: 15500, deliveryTime: "10 days" },
  ],
  "Q-1005": [
    { id: 1, name: "LabEquip", costPrice: 32400, deliveryTime: "3 weeks" },
    { id: 2, name: "SciencePro", costPrice: 33500, deliveryTime: "2 weeks" },
    { id: 3, name: "ResearchTools", costPrice: 31800, deliveryTime: "4 weeks" },
  ],
}

// Mock price history
const priceHistory = {
  "Acme Corp": [
    { date: "2023-01-15", product: "Industrial Equipment", salePrice: 18750 },
    { date: "2022-11-20", product: "Industrial Equipment", salePrice: 17500 },
    { date: "2022-09-05", product: "Industrial Equipment", salePrice: 19200 },
    { date: "2022-07-12", product: "Industrial Equipment", salePrice: 18000 },
  ],
  "Globex Inc": [
    { date: "2023-02-10", product: "Office Supplies", salePrice: 5800 },
    { date: "2022-12-05", product: "Office Supplies", salePrice: 5500 },
    { date: "2022-10-15", product: "Office Supplies", salePrice: 6200 },
  ],
  "Wayne Enterprises": [
    { date: "2023-01-25", product: "Security Systems", salePrice: 35000 },
    { date: "2022-11-10", product: "Security Systems", salePrice: 33500 },
    { date: "2022-08-20", product: "Security Systems", salePrice: 34200 },
  ],
  "Stark Industries": [
    { date: "2023-02-05", product: "Tech Components", salePrice: 19500 },
    { date: "2022-12-15", product: "Tech Components", salePrice: 18800 },
    { date: "2022-10-25", product: "Tech Components", salePrice: 20200 },
  ],
  "Umbrella Corp": [
    { date: "2023-01-20", product: "Lab Equipment", salePrice: 39500 },
    { date: "2022-11-15", product: "Lab Equipment", salePrice: 38200 },
    { date: "2022-09-10", product: "Lab Equipment", salePrice: 40500 },
  ],
}

export default function QuotesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedQuote, setSelectedQuote] = useState<any>(null)
  const [salePrice, setSalePrice] = useState("")
  const [selectedSupplier, setSelectedSupplier] = useState<number | null>(null)

  const filteredQuotes = quotes.filter(
    (quote) =>
      quote.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleQuoteSelect = (quote: any) => {
    setSelectedQuote(quote)
    setSelectedSupplier(null)
    setSalePrice("")
  }

  const handleSupplierSelect = (supplierId: number) => {
    setSelectedSupplier(supplierId)

    // Set a suggested sale price based on the selected supplier's cost price
    if (selectedQuote && suppliers[selectedQuote.id]) {
      const supplier = suppliers[selectedQuote.id].find((s) => s.id === supplierId)
      if (supplier) {
        // Suggest a 25% markup
        const suggestedPrice = Math.round(supplier.costPrice * 1.25)
        setSalePrice(suggestedPrice.toString())
      }
    }
  }

  const getClientHistory = (clientName: string) => {
    return priceHistory[clientName] || []
  }

  function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(" ")
  }

  return (
    <div className="flex flex-col">
      <Header title="Quotes">
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Quote
        </Button>
      </Header>

      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Quote Requests</CardTitle>
              <CardDescription>Select a quote to process</CardDescription>
              <div className="relative mt-2">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search quotes..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {filteredQuotes.map((quote) => (
                  <div
                    key={quote.id}
                    className={cn(
                      "p-3 rounded-md border cursor-pointer transition-colors",
                      selectedQuote?.id === quote.id ? "bg-muted border-primary" : "hover:bg-muted/50",
                    )}
                    onClick={() => handleQuoteSelect(quote)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{quote.id}</h3>
                        <p className="text-sm text-muted-foreground">{quote.client}</p>
                      </div>
                      <Badge variant={quote.status === "pending" ? "outline" : "default"}>
                        {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="mt-2 flex justify-between text-sm">
                      <span>{quote.product}</span>
                      <span className="text-muted-foreground">{new Date(quote.requestDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          {selectedQuote ? (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Quote Details - {selectedQuote.id}</CardTitle>
                    <CardDescription>Select a supplier and set the final sale price</CardDescription>
                  </div>
                  <Badge variant={selectedQuote.status === "pending" ? "outline" : "default"}>
                    {selectedQuote.status.charAt(0).toUpperCase() + selectedQuote.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="suppliers">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="suppliers">Supplier Options</TabsTrigger>
                    <TabsTrigger value="history">Price History</TabsTrigger>
                  </TabsList>
                  <TabsContent value="suppliers" className="space-y-6 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Client</Label>
                        <div className="font-medium">{selectedQuote.client}</div>
                      </div>
                      <div>
                        <Label>Product</Label>
                        <div className="font-medium">{selectedQuote.product}</div>
                      </div>
                      <div>
                        <Label>Request Date</Label>
                        <div className="font-medium">{new Date(selectedQuote.requestDate).toLocaleDateString()}</div>
                      </div>
                      <div>
                        <Label>Status</Label>
                        <div className="font-medium">
                          <Badge variant={selectedQuote.status === "pending" ? "outline" : "default"}>
                            {selectedQuote.status.charAt(0).toUpperCase() + selectedQuote.status.slice(1)}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label className="text-base">Select Supplier</Label>
                        <RadioGroup
                          value={selectedSupplier?.toString()}
                          onValueChange={(value) => handleSupplierSelect(Number.parseInt(value))}
                          className="mt-2"
                        >
                          {suppliers[selectedQuote.id]?.map((supplier) => (
                            <div
                              key={supplier.id}
                              className="flex items-center justify-between space-x-2 border p-4 rounded-md"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value={supplier.id.toString()} id={`supplier-${supplier.id}`} />
                                <Label htmlFor={`supplier-${supplier.id}`} className="font-medium">
                                  {supplier.name}
                                </Label>
                              </div>
                              <div className="text-right">
                                <div className="font-bold">${supplier.costPrice.toLocaleString()}</div>
                                <div className="text-sm text-muted-foreground">Delivery: {supplier.deliveryTime}</div>
                              </div>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>

                      <div className="space-y-2 pt-4">
                        <Label htmlFor="salePrice">Sale Price</Label>
                        <Input
                          id="salePrice"
                          placeholder="Enter sale price"
                          value={salePrice}
                          onChange={(e) => setSalePrice(e.target.value)}
                          disabled={selectedSupplier === null}
                        />
                        {selectedSupplier !== null && (
                          <div className="flex justify-between text-sm mt-1">
                            <span className="text-muted-foreground">
                              Cost Price: $
                              {suppliers[selectedQuote.id]
                                .find((s) => s.id === selectedSupplier)
                                ?.costPrice.toLocaleString()}
                            </span>
                            <span className={salePrice ? "text-green-600 font-medium" : "text-muted-foreground"}>
                              {salePrice
                                ? `Margin: ${Math.round(((Number.parseInt(salePrice) - suppliers[selectedQuote.id].find((s) => s.id === selectedSupplier)?.costPrice) / Number.parseInt(salePrice)) * 100)}%`
                                : "Enter a sale price"}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                      <Button variant="outline">Cancel</Button>
                      <Button disabled={!salePrice || selectedSupplier === null}>Save Quote</Button>
                    </div>
                  </TabsContent>
                  <TabsContent value="history" className="py-4">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <History className="h-5 w-5 text-muted-foreground" />
                        <h3 className="text-lg font-medium">Previous Sale Prices for {selectedQuote.client}</h3>
                      </div>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Product</TableHead>
                            <TableHead>Sale Price</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {getClientHistory(selectedQuote.client).map((item, index) => (
                            <TableRow key={index}>
                              <TableCell>{new Date(item.date).toLocaleDateString()}</TableCell>
                              <TableCell>{item.product}</TableCell>
                              <TableCell>${item.salePrice.toLocaleString()}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ) : (
            <Card className="h-full flex items-center justify-center">
              <CardContent className="py-12 text-center">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium">No Quote Selected</h3>
                <p className="text-muted-foreground mt-2">
                  Select a quote from the list to view details and process it
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

