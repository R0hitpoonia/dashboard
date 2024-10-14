import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, PlusCircle, Upload } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
// import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useState, useEffect } from "react";
import { SelectIcon } from "@radix-ui/react-select";

export const Route = createFileRoute(
  "/_layout/warehouse/products/add-product/"
)({
  component: Addproduct,
});

function Addproduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([{ name: "Electronic" }]);

  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [status, setStatus] = useState("");
  const [stock, setStock] = useState([
    { sku: "GGPC-001", quantity: 100, price: 99.99 },
    { sku: "GGPC-002", quantity: 143, price: 99.99 },
    { sku: "GGPC-003", quantity: 32, price: 99.99 },
  ]);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(image);
    }
  }, [image]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubcategoryChange = (e) => {
    setSubcategory(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleStockChange = (e, index) => {
    const newStock = [...stock];
    newStock[index].quantity = e.target.value;
    setStock(newStock);
  };

  const handlePriceChange = (e, index) => {
    const newStock = [...stock];
    newStock[index].price = e.target.value;
    setStock(newStock);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleAddVariant = () => {
    setStock([...stock, { sku: "", quantity: 0, price: 0 }]);
  };

  const handleSaveProduct = () => {
    // Save product logic here
  };
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 mb-5">
      <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
        <div className="flex items-center gap-4">
          <Link to="/warehouse/products">
            <Button variant="outline" size="icon" className="h-7 w-7">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            Add New Product
          </h1>
          <Badge variant="outline" className="ml-auto sm:ml-0">
            In stock
          </Badge>
          <div className="hidden items-center gap-2 md:ml-auto md:flex">
            <Link to="/warehouse/products">
              <Button variant="outline" size="sm">
                Discard
              </Button>
            </Link>
            <Button size="sm" onClick={handleSaveProduct}>
              Save Product
            </Button>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
            <Card x-chunk="dashboard-07-chunk-0">
              <CardHeader>
                <CardTitle>Product Details</CardTitle>
                <CardDescription>
                  Lipsum dolor sit amet, consectetur adipiscing elit
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      type="text"
                      className="w-full"
                      placeholder="Product Name"
                      value={name}
                      onChange={handleNameChange}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Write discription for your product..."
                      className="min-h-32"
                      value={description}
                      onChange={handleDescriptionChange}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-07-chunk-1">
              <CardHeader>
                <CardTitle>Stock</CardTitle>
                <CardDescription>
                  Lipsum dolor sit amet, consectetur adipiscing elit
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">SKU</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {stock.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-semibold">
                          {item.sku}
                        </TableCell>
                        <TableCell>
                          <Label htmlFor={`stock-${index}`} className="sr-only">
                            Stock
                          </Label>
                          <Input
                            id={`stock-${index}`}
                            type="number"
                            value={item.quantity}
                            onChange={(e) => handleStockChange(e, index)}
                          />
                        </TableCell>
                        <TableCell>
                          <Label htmlFor={`price-${index}`} className="sr-only">
                            Price
                          </Label>
                          <Input
                            id={`price-${index}`}
                            type="number"
                            value={item.price}
                            onChange={(e) => handlePriceChange(e, index)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="justify-center border-t p-4">
                <Button
                  size="sm"
                  variant="ghost"
                  className="gap-1"
                  onClick={handleAddVariant}
                >
                  <PlusCircle className="h-3.5 w-3.5" />
                  Add Variant
                </Button>
              </CardFooter>
            </Card>
            <Card x-chunk="dashboard-07-chunk-2">
              <CardHeader>
                <CardTitle>Product Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 sm:grid-cols-3">
                  <div className="grid gap-3">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger
                        id="category"
                        value={category}
                        onChange={handleCategoryChange}
                      >
                        <SelectValue />
                        <SelectIcon />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="hidden lg:block">
            <Card x-chunk="dashboard-07-chunk-3">
              <CardHeader>
                <CardTitle>Product Image</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex h-full w-full flex-col items-center justify-center">
                  <img
                    src={imageUrl}
                    alt="Product Image"
                    className="h-full w-full object-cover"
                  />
                  <Button
                    size="sm"
                    variant="ghost"
                    className="mt-4"
                    onClick={handleImageUpload}
                  >
                    Upload Image
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
  // return (
  //   <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 mb-5">
  //     <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
  //       <div className="flex items-center gap-4">
  //         <Link to="/warehouse/products">
  //           <Button variant="outline" size="icon" className="h-7 w-7">
  //             <ChevronLeft className="h-4 w-4" />
  //             <span className="sr-only">Back</span>
  //           </Button>
  //         </Link>
  //         <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
  //           Add New Product
  //         </h1>
  //         <Badge variant="outline" className="ml-auto sm:ml-0">
  //           In stock
  //         </Badge>
  //         <div className="hidden items-center gap-2 md:ml-auto md:flex">
  //           <Link to="/warehouse/products">
  //             <Button variant="outline" size="sm">
  //               Discard
  //             </Button>
  //           </Link>
  //           <Button size="sm">Save Product</Button>
  //         </div>
  //       </div>
  //       <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
  //         <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
  //           <Card x-chunk="dashboard-07-chunk-0">
  //             <CardHeader>
  //               <CardTitle>Product Details</CardTitle>
  //               <CardDescription>
  //                 Lipsum dolor sit amet, consectetur adipiscing elit
  //               </CardDescription>
  //             </CardHeader>
  //             <CardContent>
  //               <div className="grid gap-6">
  //                 <div className="grid gap-3">
  //                   <Label htmlFor="name">Name</Label>
  //                   <Input
  //                     id="name"
  //                     type="text"
  //                     className="w-full"
  //                     placeholder="Product Name"
  //                   />
  //                 </div>
  //                 <div className="grid gap-3">
  //                   <Label htmlFor="description">Description</Label>
  //                   <Textarea
  //                     id="description"
  //                     placeholder="Write discription for your product..."
  //                     className="min-h-32"
  //                   />
  //                 </div>
  //               </div>
  //             </CardContent>
  //           </Card>
  //           <Card x-chunk="dashboard-07-chunk-1">
  //             <CardHeader>
  //               <CardTitle>Stock</CardTitle>
  //               <CardDescription>
  //                 Lipsum dolor sit amet, consectetur adipiscing elit
  //               </CardDescription>
  //             </CardHeader>
  //             <CardContent>
  //               <Table>
  //                 <TableHeader>
  //                   <TableRow>
  //                     <TableHead className="w-[100px]">SKU</TableHead>
  //                     <TableHead>Stock</TableHead>
  //                     <TableHead>Price</TableHead>
  //                   </TableRow>
  //                 </TableHeader>
  //                 <TableBody>
  //                   <TableRow>
  //                     <TableCell className="font-semibold">GGPC-001</TableCell>
  //                     <TableCell>
  //                       <Label htmlFor="stock-1" className="sr-only">
  //                         Stock
  //                       </Label>
  //                       <Input id="stock-1" type="number" defaultValue={100} />
  //                     </TableCell>
  //                     <TableCell>
  //                       <Label htmlFor="price-1" className="sr-only">
  //                         Price
  //                       </Label>
  //                       <Input
  //                         id="price-1"
  //                         type="number"
  //                         defaultValue="99.99"
  //                       />
  //                     </TableCell>
  //                   </TableRow>
  //                   <TableRow>
  //                     <TableCell className="font-semibold">GGPC-002</TableCell>
  //                     <TableCell>
  //                       <Label htmlFor="stock-2" className="sr-only">
  //                         Stock
  //                       </Label>
  //                       <Input id="stock-2" type="number" defaultValue="143" />
  //                     </TableCell>
  //                     <TableCell>
  //                       <Label htmlFor="price-2" className="sr-only">
  //                         Price
  //                       </Label>
  //                       <Input
  //                         id="price-2"
  //                         type="number"
  //                         defaultValue="99.99"
  //                       />
  //                     </TableCell>
  //                   </TableRow>
  //                   <TableRow>
  //                     <TableCell className="font-semibold">GGPC-003</TableCell>
  //                     <TableCell>
  //                       <Label htmlFor="stock-3" className="sr-only">
  //                         Stock
  //                       </Label>
  //                       <Input id="stock-3" type="number" defaultValue="32" />
  //                     </TableCell>
  //                     <TableCell>
  //                       <Label htmlFor="price-3" className="sr-only">
  //                         Stock
  //                       </Label>
  //                       <Input
  //                         id="price-3"
  //                         type="number"
  //                         defaultValue="99.99"
  //                       />
  //                     </TableCell>
  //                   </TableRow>
  //                 </TableBody>
  //               </Table>
  //             </CardContent>
  //             <CardFooter className="justify-center border-t p-4">
  //               <Button size="sm" variant="ghost" className="gap-1">
  //                 <PlusCircle className="h-3.5 w-3.5" />
  //                 Add Variant
  //               </Button>
  //             </CardFooter>
  //           </Card>
  //           <Card x-chunk="dashboard-07-chunk-2">
  //             <CardHeader>
  //               <CardTitle>Product Category</CardTitle>
  //             </CardHeader>
  //             <CardContent>
  //               <div className="grid gap-6 sm:grid-cols-3">
  //                 <div className="grid gap-3">
  //                   <Label htmlFor="category">Category</Label>
  //                   <Select>
  //                     <SelectTrigger id="category" aria-label="Select category">
  //                       <SelectValue placeholder="Select category" />
  //                     </SelectTrigger>
  //                     <SelectContent>
  //                       <SelectItem value="clothing">Clothing</SelectItem>
  //                       <SelectItem value="electronics">Electronics</SelectItem>
  //                       <SelectItem value="accessories">Accessories</SelectItem>
  //                     </SelectContent>
  //                   </Select>
  //                 </div>
  //                 <div className="grid gap-3">
  //                   <Label htmlFor="subcategory">Subcategory (optional)</Label>
  //                   <Select>
  //                     <SelectTrigger
  //                       id="subcategory"
  //                       aria-label="Select subcategory"
  //                     >
  //                       <SelectValue placeholder="Select subcategory" />
  //                     </SelectTrigger>
  //                     <SelectContent>
  //                       <SelectItem value="t-shirts">T-Shirts</SelectItem>
  //                       <SelectItem value="hoodies">Hoodies</SelectItem>
  //                       <SelectItem value="sweatshirts">Sweatshirts</SelectItem>
  //                     </SelectContent>
  //                   </Select>
  //                 </div>
  //               </div>
  //             </CardContent>
  //           </Card>
  //         </div>
  //         <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
  //           <Card x-chunk="dashboard-07-chunk-3">
  //             <CardHeader>
  //               <CardTitle>Product Status</CardTitle>
  //             </CardHeader>
  //             <CardContent>
  //               <div className="grid gap-6">
  //                 <div className="grid gap-3">
  //                   <Label htmlFor="status">Status</Label>
  //                   <Select>
  //                     <SelectTrigger id="status" aria-label="Select status">
  //                       <SelectValue placeholder="Select status" />
  //                     </SelectTrigger>
  //                     <SelectContent>
  //                       <SelectItem value="draft">Draft</SelectItem>
  //                       <SelectItem value="published">Active</SelectItem>
  //                       <SelectItem value="archived">Archived</SelectItem>
  //                     </SelectContent>
  //                   </Select>
  //                 </div>
  //               </div>
  //             </CardContent>
  //           </Card>
  //           <Card className="overflow-hidden" x-chunk="dashboard-07-chunk-4">
  //             <CardHeader>
  //               <CardTitle>Product Images</CardTitle>
  //               <CardDescription>
  //                 Lipsum dolor sit amet, consectetur adipiscing elit
  //               </CardDescription>
  //             </CardHeader>
  //             <CardContent className="card-content">
  //               <div className="grid gap-2">
  //                 <img
  //                   alt="Product image"
  //                   className="aspect-square w-full rounded-md object-cover"
  //                   height="300"
  //                   src="/placeholder.svg"
  //                   width="300"
  //                 />
  //                 <div className="grid grid-cols-3 gap-2">
  //                   <button>
  //                     <img
  //                       alt="Product image"
  //                       className="aspect-square w-full rounded-md object-cover"
  //                       height="84"
  //                       src="/placeholder.svg"
  //                       width="84"
  //                     />
  //                   </button>
  //                   <button>
  //                     <img
  //                       alt="Product image"
  //                       className="aspect-square w-full rounded-md object-cover"
  //                       height="84"
  //                       src="/placeholder.svg"
  //                       width="84"
  //                     />
  //                   </button>
  //                   {/* <button className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed"> */}
  //                   <Button
  //                     size="sm"
  //                     variant="secondary"
  //                     onClick={() =>
  //                       document.getElementById("image-upload")?.click()
  //                     }
  //                   >
  //                     <Upload className="h-4 w-4 text-muted-foreground" />
  //                     <span className="sr-only">Upload</span>
  //                     <input
  //                       id="image-upload"
  //                       type="file"
  //                       accept="image/*"
  //                       style={{ display: "none" }}
  //                       onChange={(e) => {
  //                         const file = e.target.files ? [0] : [];
  //                         const reader = new FileReader();
  //                         reader.onload = () => {
  //                           const img = document.createElement("img");
  //                           // img?.src = reader.result:"";
  //                           img.alt = "Product image";
  //                           img.className =
  //                             "aspect-square w-full rounded-md object-cover";
  //                           img.height = 300;
  //                           img.width = 300;
  //                           // document.querySelector('.overflow-hidden > .card-content > div > img').replaceWith(img);
  //                         };
  //                         reader.readAsDataURL(file);
  //                       }}
  //                     />
  //                   </Button>

  //                   {/* <Upload className="h-4 w-4 text-muted-foreground" />
  //                       <span className="sr-only">Upload</span>
  //                     </button> */}
  //                 </div>
  //               </div>
  //             </CardContent>
  //           </Card>
  //           <Card x-chunk="dashboard-07-chunk-5">
  //             <CardHeader>
  //               <CardTitle>Archive Product</CardTitle>
  //               <CardDescription>
  //                 Lipsum dolor sit amet, consectetur adipiscing elit.
  //               </CardDescription>
  //             </CardHeader>
  //             <CardContent>
  //               <div></div>
  //               <Button size="sm" variant="secondary">
  //                 Archive Product
  //               </Button>
  //             </CardContent>
  //           </Card>
  //         </div>
  //       </div>
  //       <div className="flex items-center justify-center gap-2 md:hidden">
  //         <Button variant="outline" size="sm">
  //           Discard
  //         </Button>
  //         <Button size="sm">Save Product</Button>
  //       </div>
  //     </div>
  //   </main>
  // );
}
