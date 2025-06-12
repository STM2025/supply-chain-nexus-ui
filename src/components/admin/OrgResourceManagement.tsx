
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Package, Plus, Edit, Trash2, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface OrgResourceManagementProps {
  organizationType?: string;
}

const OrgResourceManagement = ({ organizationType = 'farmer' }: OrgResourceManagementProps) => {
  const { toast } = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Sample resources data based on organization type
  const getOrgResources = () => {
    switch (organizationType) {
      case 'farmer':
        return [
          { id: 1, name: 'North Field', type: 'Field', location: 'Zone A', status: 'active', assignedTo: 'John Smith' },
          { id: 2, name: 'South Field', type: 'Field', location: 'Zone B', status: 'active', assignedTo: 'Sarah Johnson' },
          { id: 3, name: 'Wheat Harvest 2024', type: 'Product', location: 'Storage A', status: 'ready', assignedTo: 'Mike Davis' },
          { id: 4, name: 'Organic Wheat', type: 'Product', location: 'Storage B', status: 'processing', assignedTo: 'Lisa Wong' }
        ];
      case 'processor':
        return [
          { id: 1, name: 'Processing Line 1', type: 'Processing Plant', location: 'Factory Floor', status: 'active', assignedTo: 'David Chen' },
          { id: 2, name: 'Processing Line 2', type: 'Processing Plant', location: 'Factory Floor', status: 'maintenance', assignedTo: 'Emma Wilson' },
          { id: 3, name: 'Wheat Flour Batch A', type: 'Product', location: 'Storage Unit 1', status: 'ready', assignedTo: 'James Brown' }
        ];
      case 'distributor':
        return [
          { id: 1, name: 'Main Warehouse', type: 'Warehouse', location: 'Distribution Center', status: 'active', assignedTo: 'Ahmed Hassan' },
          { id: 2, name: 'Cold Storage', type: 'Warehouse', location: 'Refrigeration Unit', status: 'active', assignedTo: 'Sofia Rodriguez' },
          { id: 3, name: 'Packaged Goods Lot 1', type: 'Product', location: 'Main Warehouse', status: 'ready', assignedTo: 'Robert Kim' }
        ];
      case 'transporter':
        return [
          { id: 1, name: 'Truck Fleet A', type: 'Vehicle', location: 'Depot 1', status: 'active', assignedTo: 'Carlos Mendez' },
          { id: 2, name: 'Truck Fleet B', type: 'Vehicle', location: 'Depot 2', status: 'maintenance', assignedTo: 'Nina Patel' },
          { id: 3, name: 'Delivery Route 101', type: 'Route', location: 'Main Highway', status: 'active', assignedTo: 'Tom Anderson' }
        ];
      default:
        return [];
    }
  };

  const orgResources = getOrgResources();

  const availableResourceTypes = {
    farmer: ['Field', 'Product', 'Farm Equipment'],
    processor: ['Processing Plant', 'Product', 'Quality Control'],
    distributor: ['Warehouse', 'Product', 'Distribution Hub'],
    transporter: ['Vehicle', 'Route', 'Fleet Management']
  };

  const handleAddResource = () => {
    toast({
      title: "Resource Added",
      description: "New resource has been successfully added to the organization.",
    });
    setIsAddDialogOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'ready':
        return 'bg-green-100 text-green-700';
      case 'maintenance':
      case 'processing':
        return 'bg-yellow-100 text-yellow-700';
      case 'inactive':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Resource Management</h3>
          <p className="text-gray-600">Manage organization resources and assignments</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Resource
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Resource</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="resource-name">Resource Name</Label>
                <Input id="resource-name" placeholder="Enter resource name" />
              </div>
              <div>
                <Label htmlFor="resource-type">Resource Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select resource type" />
                  </SelectTrigger>
                  <SelectContent>
                    {(availableResourceTypes[organizationType] || []).map(type => (
                      <SelectItem key={type} value={type.toLowerCase().replace(' ', '_')}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="Enter location" />
              </div>
              <div className="flex justify-end space-x-3">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddResource}>
                  Add Resource
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Package className="h-5 w-5" />
            <span>Organization Resources</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orgResources.map((resource) => (
                <TableRow key={resource.id}>
                  <TableCell className="font-medium">{resource.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{resource.type}</Badge>
                  </TableCell>
                  <TableCell>{resource.location}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(resource.status)}>
                      {resource.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{resource.assignedTo}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrgResourceManagement;
