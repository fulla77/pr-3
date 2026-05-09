/*
 * ============================================================
 *  نظام مكتبة كائني التوجه مع STL
 *  Library Management System — OOP + STL + Templates
 * ============================================================
 *
 * Features:
 *  1. Shape hierarchy  (abstract base + derived) with unique_ptr
 *  2. Stack<T>         custom class template
 *  3. std::map<int, std::shared_ptr<Book>>  for book storage
 *  4. STL algorithms   sort, find_if, copy_if, accumulate
 *  5. Operator Overloading  >, ==, >>
 *  6. Exception handling    invalid input / not-found errors
 *
 * Compile:  g++ -std=c++17 -Wall -o library_system library_system.cpp
 * ============================================================
 */

#include <iostream>
#include <memory>
#include <map>
#include <vector>
#include <algorithm>
#include <numeric>
#include <stdexcept>
#include <string>
#include <sstream>
#include <iomanip>
#include <cmath>

// ════════════════════════════════════════════════════════════
//  SECTION 1 — Shape Hierarchy (abstract base + derived)
// ════════════════════════════════════════════════════════════

class Shape {
public:
    virtual ~Shape() = default;
    virtual double area()      const = 0;   // pure virtual
    virtual double perimeter() const = 0;   // pure virtual
    virtual std::string name() const = 0;   // pure virtual
    virtual void print()       const {
        std::cout << std::fixed << std::setprecision(2)
                  << "[Shape] " << name()
                  << " | Area: "      << area()
                  << " | Perimeter: " << perimeter() << "\n";
    }
};

class Circle : public Shape {
    double r_;
public:
    explicit Circle(double r) : r_(r) {
        if (r <= 0) throw std::invalid_argument("Circle radius must be > 0");
    }
    double area()      const override { return 3.14159265 * r_ * r_; }
    double perimeter() const override { return 2 * 3.14159265 * r_; }
    std::string name() const override { return "Circle(r=" + std::to_string(r_) + ")"; }
};

class Rectangle : public Shape {
    double w_, h_;
public:
    Rectangle(double w, double h) : w_(w), h_(h) {
        if (w <= 0 || h <= 0) throw std::invalid_argument("Rectangle dimensions must be > 0");
    }
    double area()      const override { return w_ * h_; }
    double perimeter() const override { return 2 * (w_ + h_); }
    std::string name() const override {
        return "Rectangle(" + std::to_string(w_) + "x" + std::to_string(h_) + ")";
    }
};

class Triangle : public Shape {
    double a_, b_, c_;
public:
    Triangle(double a, double b, double c) : a_(a), b_(b), c_(c) {
        if (a <= 0 || b <= 0 || c <= 0)
            throw std::invalid_argument("Triangle sides must be > 0");
        if (a + b <= c || a + c <= b || b + c <= a)
            throw std::invalid_argument("Invalid triangle sides (triangle inequality)");
    }
    double area() const override {
        double s = (a_ + b_ + c_) / 2.0;
        return std::sqrt(s * (s-a_) * (s-b_) * (s-c_));
    }
    double perimeter() const override { return a_ + b_ + c_; }
    std::string name() const override {
        return "Triangle(" + std::to_string(a_) + ","
             + std::to_string(b_) + "," + std::to_string(c_) + ")";
    }
};

// ════════════════════════════════════════════════════════════
//  SECTION 2 — Custom Stack<T> Template
// ════════════════════════════════════════════════════════════

template<typename T>
class Stack {
    std::vector<T> data_;
public:
    void push(const T& item) { data_.push_back(item); }

    T pop() {
        if (empty()) throw std::underflow_error("Stack is empty — cannot pop");
        T top = data_.back();
        data_.pop_back();
        return top;
    }

    const T& peek() const {
        if (empty()) throw std::underflow_error("Stack is empty — cannot peek");
        return data_.back();
    }

    bool  empty() const { return data_.empty(); }
    size_t size() const { return data_.size();  }

    void print(const std::string& label = "Stack") const {
        std::cout << label << " [size=" << size() << "]: ";
        for (auto it = data_.rbegin(); it != data_.rend(); ++it)
            std::cout << *it << " ";
        std::cout << "\n";
    }
};

// ════════════════════════════════════════════════════════════
//  SECTION 3 — Book class with Operator Overloading
// ════════════════════════════════════════════════════════════

class Book {
    int    id_;
    std::string title_;
    std::string author_;
    double price_;
    int    pages_;
public:
    Book(int id, std::string title, std::string author, double price, int pages)
        : id_(id), title_(std::move(title)), author_(std::move(author)),
          price_(price), pages_(pages)
    {
        if (price < 0)   throw std::invalid_argument("Price cannot be negative");
        if (pages <= 0)  throw std::invalid_argument("Pages must be > 0");
    }

    // Getters
    int         id()     const { return id_;     }
    std::string title()  const { return title_;  }
    std::string author() const { return author_; }
    double      price()  const { return price_;  }
    int         pages()  const { return pages_;  }

    // Operator == : same id means same book
    bool operator==(const Book& o) const { return id_ == o.id_; }

    // Operator > : compare by price
    bool operator>(const Book& o) const { return price_ > o.price_; }

    // Operator >> : stream input  (id title author price pages)
    friend std::istream& operator>>(std::istream& in, Book& b) {
        in >> b.id_ >> b.title_ >> b.author_ >> b.price_ >> b.pages_;
        if (b.price_ < 0)  throw std::invalid_argument("Price cannot be negative");
        if (b.pages_ <= 0) throw std::invalid_argument("Pages must be > 0");
        return in;
    }

    // Pretty print
    void print() const {
        std::cout << std::left
                  << "  [" << std::setw(4) << id_ << "] "
                  << std::setw(30) << title_
                  << " | " << std::setw(20) << author_
                  << " | $" << std::fixed << std::setprecision(2) << std::setw(7) << price_
                  << " | " << pages_ << " pages\n";
    }
};

// ════════════════════════════════════════════════════════════
//  SECTION 4 — Library class (map + STL algorithms)
// ════════════════════════════════════════════════════════════

class Library {
    std::map<int, std::shared_ptr<Book>> books_;  // key = book id

public:
    // --- Add ---
    void addBook(std::shared_ptr<Book> b) {
        if (!b) throw std::invalid_argument("Null book pointer");
        if (books_.count(b->id()))
            throw std::runtime_error("Book ID " + std::to_string(b->id()) + " already exists");
        books_[b->id()] = b;
    }

    // --- Remove ---
    void removeBook(int id) {
        if (!books_.count(id))
            throw std::runtime_error("Book ID " + std::to_string(id) + " not found");
        books_.erase(id);
    }

    // --- Find by id ---
    std::shared_ptr<Book> findById(int id) const {
        auto it = books_.find(id);
        if (it == books_.end())
            throw std::runtime_error("Book ID " + std::to_string(id) + " not found");
        return it->second;
    }

    // --- Search by title (STL find_if) ---
    std::vector<std::shared_ptr<Book>> searchByTitle(const std::string& keyword) const {
        std::vector<std::shared_ptr<Book>> result;
        for (auto& [id, bk] : books_) {
            if (bk->title().find(keyword) != std::string::npos)
                result.push_back(bk);
        }
        return result;
    }

    // --- Filter by max price (STL copy_if) ---
    std::vector<std::shared_ptr<Book>> filterByMaxPrice(double maxPrice) const {
        std::vector<std::shared_ptr<Book>> all, filtered;
        for (auto& [id, bk] : books_) all.push_back(bk);

        std::copy_if(all.begin(), all.end(), std::back_inserter(filtered),
                     [maxPrice](const std::shared_ptr<Book>& b){
                         return b->price() <= maxPrice;
                     });
        return filtered;
    }

    // --- Sort by price descending (STL sort + operator>) ---
    std::vector<std::shared_ptr<Book>> sortedByPrice() const {
        std::vector<std::shared_ptr<Book>> v;
        for (auto& [id, bk] : books_) v.push_back(bk);
        std::sort(v.begin(), v.end(),
                  [](const std::shared_ptr<Book>& a, const std::shared_ptr<Book>& b){
                      return *a > *b;   // uses operator>
                  });
        return v;
    }

    // --- Total value (STL accumulate) ---
    double totalValue() const {
        return std::accumulate(books_.begin(), books_.end(), 0.0,
                               [](double sum, const auto& kv){
                                   return sum + kv.second->price();
                               });
    }

    // --- Print all ---
    void printAll(const std::string& header = "Library Catalog") const {
        std::cout << "\n══════════════════════════════════════════════════\n";
        std::cout << "  " << header << "  (" << books_.size() << " books)\n";
        std::cout << "══════════════════════════════════════════════════\n";
        if (books_.empty()) { std::cout << "  (empty)\n"; return; }
        for (auto& [id, bk] : books_) bk->print();
        std::cout << "  Total value: $"
                  << std::fixed << std::setprecision(2) << totalValue() << "\n";
    }

    size_t size() const { return books_.size(); }
};

// ════════════════════════════════════════════════════════════
//  Helpers — section headers
// ════════════════════════════════════════════════════════════

void header(const std::string& s) {
    std::cout << "\n\033[1;36m╔═══════════════════════════════════════╗\n";
    std::cout <<          "║  " << std::left << std::setw(37) << s << "║\n";
    std::cout <<          "╚═══════════════════════════════════════╝\033[0m\n";
}

void ok(const std::string& s)  { std::cout << "\033[32m✔ " << s << "\033[0m\n"; }
void err(const std::string& s) { std::cout << "\033[31m✘ " << s << "\033[0m\n"; }

// ════════════════════════════════════════════════════════════
//  MAIN — demo all features
// ════════════════════════════════════════════════════════════

int main() {
    std::cout << "\033[1;33m";
    std::cout << "  نظام مكتبة كائني التوجه مع STL\n";
    std::cout << "  OOP Library Management System\n";
    std::cout << "\033[0m";

    // ── 1. Shape Hierarchy ──────────────────────────────────
    header("1. Shape Hierarchy + unique_ptr");
    {
        std::vector<std::unique_ptr<Shape>> shapes;
        shapes.push_back(std::make_unique<Circle>(5.0));
        shapes.push_back(std::make_unique<Rectangle>(4.0, 6.0));
        shapes.push_back(std::make_unique<Triangle>(3.0, 4.0, 5.0));

        for (auto& s : shapes) s->print();

        // Exception: invalid shape
        try {
            auto bad = std::make_unique<Circle>(-1.0);
        } catch (const std::exception& e) {
            err(std::string("Caught: ") + e.what());
        }
    }

    // ── 2. Stack<T> ─────────────────────────────────────────
    header("2. Custom Stack<T> Template");
    {
        Stack<std::string> history;
        history.push("Login");
        history.push("Search: C++");
        history.push("View Book #42");
        history.push("Checkout");
        history.print("Browser History Stack");

        ok("Popped: " + history.pop());
        ok("Peek:   " + history.peek());
        history.print("After pop");

        // Exception: pop from empty
        Stack<int> empty;
        try {
            empty.pop();
        } catch (const std::underflow_error& e) {
            err(std::string("Caught: ") + e.what());
        }
    }

    // ── 3. Library (map + shared_ptr) ───────────────────────
    header("3. Library — map<int, shared_ptr<Book>>");
    Library lib;
    {
        lib.addBook(std::make_shared<Book>(1,  "Clean Code",            "Robert Martin",   35.99, 431));
        lib.addBook(std::make_shared<Book>(2,  "The Pragmatic Programmer","Hunt & Thomas", 49.95, 352));
        lib.addBook(std::make_shared<Book>(3,  "Design Patterns",       "GoF",             54.00, 395));
        lib.addBook(std::make_shared<Book>(4,  "C++ Primer",            "Lippman",         42.50, 938));
        lib.addBook(std::make_shared<Book>(5,  "Code Complete",         "McConnell",       29.99, 960));
        lib.addBook(std::make_shared<Book>(6,  "Refactoring",           "Fowler",          39.99, 448));

        // Duplicate ID exception
        try {
            lib.addBook(std::make_shared<Book>(1, "Duplicate", "Nobody", 9.99, 100));
        } catch (const std::runtime_error& e) {
            err(std::string("Caught: ") + e.what());
        }

        lib.printAll();
    }

    // ── 4. STL Algorithms ───────────────────────────────────
    header("4. STL Algorithms");

    // find_if — search by title keyword
    {
        auto results = lib.searchByTitle("Code");
        std::cout << "\n  Search title containing 'Code' → "
                  << results.size() << " result(s):\n";
        for (auto& b : results) b->print();
    }

    // copy_if — filter by price ≤ 40
    {
        auto cheap = lib.filterByMaxPrice(40.0);
        std::cout << "\n  Filter price ≤ $40.00 → "
                  << cheap.size() << " book(s):\n";
        for (auto& b : cheap) b->print();
    }

    // sort — by price descending (uses operator>)
    {
        auto sorted = lib.sortedByPrice();
        std::cout << "\n  Sorted by price (desc):\n";
        for (auto& b : sorted) b->print();
    }

    // accumulate — total value
    {
        std::cout << "\n  Total catalog value: $"
                  << std::fixed << std::setprecision(2)
                  << lib.totalValue() << "\n";
    }

    // ── 5. Operator Overloading ──────────────────────────────
    header("5. Operator Overloading  (==, >, >>)");
    {
        Book b1(10, "BookA", "AuthorA", 25.0, 200);
        Book b2(11, "BookB", "AuthorB", 40.0, 300);
        Book b3(10, "BookA", "AuthorA", 25.0, 200);  // same id as b1

        std::cout << "  b1 == b3 (same id)? " << (b1 == b3 ? "YES" : "NO") << "\n";
        std::cout << "  b1 == b2 (diff id)? " << (b1 == b2 ? "YES" : "NO") << "\n";
        std::cout << "  b2 >  b1 (price)?   " << (b2 > b1  ? "YES" : "NO") << "\n";

        // operator>>  — read a book from a string stream
        std::istringstream ss("99 EffectiveC++ ScottMeyers 33.50 320");
        Book bIn(0, "", "", 0.0, 1);
        ss >> bIn;
        std::cout << "\n  Book read via operator>>:\n";
        bIn.print();

        // Bad input via >>
        try {
            std::istringstream bad("98 Bad Book -5.0 100");
            Book bBad(0, "", "", 0.0, 1);
            bad >> bBad;
        } catch (const std::invalid_argument& e) {
            err(std::string("Caught: ") + e.what());
        }
    }

    // ── 6. Exception Handling ────────────────────────────────
    header("6. Exception Handling Summary");
    {
        // findById — not found
        try {
            lib.findById(999);
        } catch (const std::runtime_error& e) {
            err(std::string("findById(999) → ") + e.what());
        }

        // removeBook — not found
        try {
            lib.removeBook(777);
        } catch (const std::runtime_error& e) {
            err(std::string("removeBook(777) → ") + e.what());
        }

        // Invalid book construction
        try {
            Book bad(20, "Zero Pages", "Author", 10.0, 0);
        } catch (const std::invalid_argument& e) {
            err(std::string("Book(pages=0) → ") + e.what());
        }

        ok("All exceptions handled gracefully");
    }

    std::cout << "\n\033[1;32m══════════════════════════════════════════════════\n";
    std::cout << "  ✔  All systems operational — library demo complete\n";
    std::cout << "══════════════════════════════════════════════════\033[0m\n\n";

    return 0;
}
