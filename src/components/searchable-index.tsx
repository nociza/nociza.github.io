"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchableIndexProps<T> {
  title: string;
  items: T[];
  searchFields: (keyof T)[];
  renderItem: (item: T, index: number) => React.ReactNode;
  placeholder?: string;
}

export default function SearchableIndex<T>({
  title,
  items,
  searchFields,
  renderItem,
  placeholder = "Search...",
}: SearchableIndexProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = useMemo(() => {
    if (!searchTerm.trim()) return items;

    return items.filter((item) =>
      searchFields.some((field) => {
        const value = item[field];
        return (
          typeof value === "string" &&
          value.toLowerCase().includes(searchTerm.toLowerCase())
        );
      })
    );
  }, [items, searchFields, searchTerm]);

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4 font-serif">
            {title}
          </h1>
          <p className="text-xl text-gray-600 font-inconsolata">
            Complete archive with search functionality
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8 max-w-2xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-muted-foreground" />
          </div>
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 font-inconsolata focus:ring-orange-500 focus:border-orange-500"
            placeholder={placeholder}
          />
        </div>

        {/* Results Count */}
        <div className="text-center mb-6">
          <p className="text-gray-600 font-inconsolata">
            {filteredItems.length} of {items.length} items
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </div>

        {/* Items Grid */}
        <div className="grid gap-6">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => renderItem(item, index))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg font-inconsolata">
                No items found matching your search.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
