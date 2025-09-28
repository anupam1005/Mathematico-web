import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, BookOpen, Users, Clock, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Empty books data - ready for real content
const books = [];

const bookCategories = ["All Books", "JEE Advanced", "Class 11", "Class 12", "Olympiad", "NTSE"];

export default function BooksSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Books");
  const [booksData, setBooksData] = useState(books);

  // Filter books based on search and category
  const filteredBooks = booksData.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All Books" || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Study Materials & Books
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Access comprehensive study materials, textbooks, and reference books 
            to enhance your mathematics learning journey.
          </p>
        </div>

        <Tabs defaultValue="books" className="w-full">
          <TabsList className="grid w-full grid-cols-1 lg:grid-cols-2 mb-8">
            <TabsTrigger value="books" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Books & Materials
            </TabsTrigger>
          </TabsList>

          {/* Books Tab */}
          <TabsContent value="books">
            {/* Search and Filters for Books */}
            <div className="mb-8 space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search books, authors, or subjects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
              </div>

              {/* Book Categories */}
              <Tabs defaultValue="All Books" className="mb-8">
                <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
                  {bookCategories.map((category) => (
                    <TabsTrigger
                      key={category}
                      value={category}
                      onClick={() => setSelectedCategory(category)}
                      className="text-xs lg:text-sm"
                    >
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            {/* Books Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredBooks.map((book) => (
                <div key={book.id} className="bg-white rounded-lg border border-gray-200 shadow-soft hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="secondary" className="text-xs">
                        {book.level}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        {book.rating}
                      </div>
                    </div>
                    
                    <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
                      {book.title}
                    </h3>
                    
                    <p className="text-sm text-gray-600 mb-3">
                      by {book.author}
                    </p>
                    
                    <p className="text-sm text-gray-700 mb-4 line-clamp-2">
                      {book.description}
                    </p>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        <span>{book.pages} pages</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>{book.students} students</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{book.duration}</span>
                      </div>
                    </div>
                    
                    <Button className="w-full mt-4">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {filteredBooks.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No books found matching your criteria.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}