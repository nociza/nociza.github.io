"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, X, Loader2 } from "lucide-react";

export default function AddCoffeeForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    roaster: "",
    date: new Date().toISOString().split("T")[0], // Today's date
    notes: "",
    pourOverRating: "",
    americanoRating: "",
    origin: "",
    process: "",
    status: "currently_drinking" as const,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: Implement coffee entry submission when needed
      console.log("Coffee entry data:", {
        name: formData.name,
        roaster: formData.roaster,
        date: formData.date,
        notes: formData.notes,
        pourOverRating: formData.pourOverRating
          ? parseInt(formData.pourOverRating)
          : undefined,
        americanoRating: formData.americanoRating
          ? parseInt(formData.americanoRating)
          : undefined,
        origin: formData.origin || undefined,
        process: formData.process || undefined,
        status: formData.status,
      });

      // Reset form
      setFormData({
        name: "",
        roaster: "",
        date: new Date().toISOString().split("T")[0],
        notes: "",
        pourOverRating: "",
        americanoRating: "",
        origin: "",
        process: "",
        status: "currently_drinking",
      });

      setIsOpen(false);
    } catch (error) {
      console.error("Failed to add coffee entry:", error);
      alert("Failed to add coffee entry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-50 rounded-full w-14 h-14 bg-orange-500 hover:bg-orange-600 text-white shadow-lg"
      >
        <Plus className="w-6 h-6" />
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="font-inconsolata">Add Coffee Entry</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium font-inconsolata">
                Coffee Name *
              </label>
              <Input
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="e.g., Ethiopian Yirgacheffe"
                required
                className="font-inconsolata"
              />
            </div>

            <div>
              <label className="text-sm font-medium font-inconsolata">
                Roaster *
              </label>
              <Input
                value={formData.roaster}
                onChange={(e) => handleInputChange("roaster", e.target.value)}
                placeholder="e.g., Blue Bottle Coffee"
                required
                className="font-inconsolata"
              />
            </div>

            <div>
              <label className="text-sm font-medium font-inconsolata">
                Date *
              </label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
                required
                className="font-inconsolata"
              />
            </div>

            <div>
              <label className="text-sm font-medium font-inconsolata">
                Tasting Notes *
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                placeholder="Describe the flavor profile, aroma, and your thoughts..."
                required
                className="w-full min-h-[80px] px-3 py-2 border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-inconsolata rounded-md"
              />
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium font-inconsolata">
                    Pour Over Rating (1-10)
                  </label>
                  <Input
                    type="number"
                    min="1"
                    max="10"
                    value={formData.pourOverRating}
                    onChange={(e) =>
                      handleInputChange("pourOverRating", e.target.value)
                    }
                    placeholder="8"
                    className="font-inconsolata"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium font-inconsolata">
                    Americano Rating (1-10)
                  </label>
                  <Input
                    type="number"
                    min="1"
                    max="10"
                    value={formData.americanoRating}
                    onChange={(e) =>
                      handleInputChange("americanoRating", e.target.value)
                    }
                    placeholder="7"
                    className="font-inconsolata"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium font-inconsolata">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange("status", e.target.value)}
                  className="w-full px-3 py-2 border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-inconsolata rounded-md"
                >
                  <option value="currently_drinking">Currently Drinking</option>
                  <option value="completed">Completed</option>
                  <option value="wishlist">Wishlist</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium font-inconsolata">
                Origin
              </label>
              <Input
                value={formData.origin}
                onChange={(e) => handleInputChange("origin", e.target.value)}
                placeholder="e.g., Ethiopia, Colombia"
                className="font-inconsolata"
              />
            </div>

            <div>
              <label className="text-sm font-medium font-inconsolata">
                Process
              </label>
              <Input
                value={formData.process}
                onChange={(e) => handleInputChange("process", e.target.value)}
                placeholder="e.g., Washed, Natural, Honey"
                className="font-inconsolata"
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
                className="flex-1 font-inconsolata"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-orange-500 hover:bg-orange-600 font-inconsolata"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Adding...
                  </>
                ) : (
                  "Add Coffee"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
