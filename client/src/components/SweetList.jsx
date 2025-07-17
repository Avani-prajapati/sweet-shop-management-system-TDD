import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import image from "../assets/landingback.png";
import {
  Edit,
  Trash2,
  ShoppingCart,
  PackagePlus,
  Plus,
  Filter,
  X,
  Search,
  ChevronDown,
  Candy,
  Cake,
  IceCream,
  Lollipop,
  Gift,
  Star,
  Heart,
  Sparkles,
  ShoppingBag,
  PackageCheck,
} from "lucide-react";
import PurchaseSweet from "./PurchaseSweet";
import RestockSweet from "./RestockSweet";

const SweetList = () => {
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nameFilter, setNameFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [sweetToDelete, setSweetToDelete] = useState(null);
  const [purchaseDialogOpen, setPurchaseDialogOpen] = useState(false);
  const [restockDialogOpen, setRestockDialogOpen] = useState(false);
  const [currentSweet, setCurrentSweet] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [stats, setStats] = useState({
    totalItems: 0,
    totalStock: 0,
    categories: 0,
    totalValue: 0,
  });

  // Popular categories suggestions
  const popularCategories = [
    "Chocolate",
    "Candy",
    "Gum",
    "Pastry",
    "Jelly",
    "Caramel",
  ];

  useEffect(() => {
    fetchSweets();
  }, []);

  const fetchSweets = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"}/api/sweets`
      );
      setSweets(response.data || []);

      // Calculate stats
      const totalStock = response.data.reduce(
        (sum, sweet) => sum + sweet.quantity,
        0
      );
      const uniqueCategories = new Set(
        response.data.map((sweet) => sweet.category)
      ).size;
      const totalValue = response.data.reduce(
        (sum, sweet) => sum + sweet.price * sweet.quantity,
        0
      );

      setStats({
        totalItems: response.data.length,
        totalStock,
        categories: uniqueCategories,
        totalValue,
      });
    } catch (error) {
      toast.error("Failed to fetch sweets");
      setSweets([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"}/api/sweets/${sweetToDelete}`
      );
      setSweets(sweets.filter((sweet) => sweet._id !== sweetToDelete));
      toast.success("Sweet deleted successfully");

      // Update stats
      const deletedSweet = sweets.find((s) => s._id === sweetToDelete);
      setStats((prev) => ({
        ...prev,
        totalItems: prev.totalItems - 1,
        totalStock: prev.totalStock - deletedSweet.quantity,
        categories: new Set(
          sweets.filter((s) => s._id !== sweetToDelete).map((s) => s.category)
        ).size,
        totalValue:
          prev.totalValue - deletedSweet.price * deletedSweet.quantity,
      }));
    } catch (error) {
      toast.error("Failed to delete sweet");
    } finally {
      setDeleteDialogOpen(false);
    }
  };

  const openPurchaseDialog = (sweet) => {
    setCurrentSweet(sweet);
    setQuantity(1);
    setPurchaseDialogOpen(true);
  };

  const openRestockDialog = (sweet) => {
    setCurrentSweet(sweet);
    setQuantity(1);
    setRestockDialogOpen(true);
  };

  const filteredSweets = sweets.filter((sweet) => {
    const nameMatch = nameFilter
      ? sweet.name.toLowerCase().includes(nameFilter.toLowerCase())
      : true;
    const categoryMatch = categoryFilter
      ? sweet.category.toLowerCase().includes(categoryFilter.toLowerCase())
      : true;
    const priceMatch = priceFilter
      ? sweet.price <= parseFloat(priceFilter)
      : true;
    return nameMatch && categoryMatch && priceMatch;
  });

  const clearFilters = () => {
    setNameFilter("");
    setCategoryFilter("");
    setPriceFilter("");
  };

  const getCategoryIcon = (category) => {
    const icons = {
      chocolate: <Cake className="h-5 w-5" />,
      candy: <Candy className="h-5 w-5" />,
      gum: <Lollipop className="h-5 w-5" />,
      pastry: <IceCream className="h-5 w-5" />,
      jelly: <Sparkles className="h-5 w-5" />,
      caramel: <Star className="h-5 w-5" />,
      other: <Gift className="h-5 w-5" />,
    };

    const lowerCategory = category.toLowerCase();
    if (lowerCategory.includes("chocolate")) return icons.chocolate;
    if (lowerCategory.includes("candy")) return icons.candy;
    if (lowerCategory.includes("gum")) return icons.gum;
    if (lowerCategory.includes("pastry")) return icons.pastry;
    if (lowerCategory.includes("jelly")) return icons.jelly;
    if (lowerCategory.includes("caramel")) return icons.caramel;
    return icons.other;
  };

  const getCategoryColor = (category) => {
    const colors = {
      chocolate: "from-amber-600 to-amber-800",
      candy: "from-pink-400 to-pink-600",
      gum: "from-teal-400 to-teal-600",
      pastry: "from-yellow-400 to-yellow-600",
      jelly: "from-purple-400 to-purple-600",
      caramel: "from-orange-400 to-orange-600",
      other: "from-fuchsia-400 to-fuchsia-600",
    };

    const lowerCategory = category.toLowerCase();
    if (lowerCategory.includes("chocolate")) return colors.chocolate;
    if (lowerCategory.includes("candy")) return colors.candy;
    if (lowerCategory.includes("gum")) return colors.gum;
    if (lowerCategory.includes("pastry")) return colors.pastry;
    if (lowerCategory.includes("jelly")) return colors.jelly;
    if (lowerCategory.includes("caramel")) return colors.caramel;
    return colors.other;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-fuchsia-50 to-rose-50 p-6">
        {/* Loading Header */}
        <div className="animate-pulse mb-8">
          <div className="h-16 w-full max-w-4xl bg-rose-100 rounded-2xl mx-auto"></div>
        </div>

        {/* Loading Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 shadow-sm h-32 animate-pulse"
            ></div>
          ))}
        </div>

        {/* Loading Filters */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8 animate-pulse h-40"></div>

        {/* Loading Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-sm h-80 animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  p-4 sm:p-6">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-tr from-fuchsia-600 via-pink-500 to-rose-400 p-10 text-white  mb-12">
        {/* Background Image (Faded Dessert Image) */}
        <div className="absolute top-0 right-0 opacity-10 pointer-events-none select-none">
          <svg
            width="300"
            height="300"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#FFFFFF"
              d="M42.7,-56.3C54.1,-46.4,61.5,-32.2,64.9,-17.3C68.3,-2.4,67.7,13.2,61.2,26.7C54.7,40.2,42.3,51.6,27.5,59.8C12.7,68,-4.5,73.1,-19.5,68.3C-34.6,63.5,-47.5,48.9,-56.2,32.7C-64.9,16.5,-69.4,-1.3,-66.1,-17.4C-62.8,-33.5,-51.7,-47.9,-38.1,-57.1C-24.5,-66.3,-8.4,-70.3,6.5,-78.3C21.4,-86.3,42.8,-98.2,42.7,-56.3Z"
              transform="translate(100 100)"
            />
          </svg>
        </div>

        {/* Main Content */}
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
            {/* Left Content */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight drop-shadow">
                Sweet Shop <span className="text-yellow-300">Delights</span>
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl font-light mb-6 max-w-2xl mx-auto md:mx-0">
                Manage your candy inventory with sweetness and joy 🍬
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <Link
                  to="/sweets/add"
                  className="flex items-center justify-center rounded-full bg-white px-6 py-3 text-lg font-semibold text-rose-600 shadow-lg hover:shadow-xl transition-all hover:scale-105"
                >
                  <Plus className="mr-2 h-5 w-5" />
                  Add New Sweet
                </Link>
              </div>
            </div>

            <div className="w-64 h-64 flex items-center justify-center">
              <img
                src={image}
                alt="Sweet Illustration"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-fuchsia-100 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-rose-500">
                Total Products
              </p>
              <h3 className="text-3xl font-bold text-gray-800">
                {stats.totalItems}
              </h3>
              <p className="text-xs text-gray-500 mt-1">Different sweets</p>
            </div>
            <div className="p-3 rounded-full bg-rose-100 text-rose-600">
              <Candy className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-fuchsia-100 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-fuchsia-500">
                Total Stock
              </p>
              <h3 className="text-3xl font-bold text-gray-800">
                {stats.totalStock}
              </h3>
              <p className="text-xs text-gray-500 mt-1">Items available</p>
            </div>
            <div className="p-3 rounded-full bg-fuchsia-100 text-fuchsia-600">
              <PackagePlus className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-fuchsia-100 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-500">Categories</p>
              <h3 className="text-3xl font-bold text-gray-800">
                {stats.categories}
              </h3>
              <p className="text-xs text-gray-500 mt-1">Sweet varieties</p>
            </div>
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              <Gift className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-fuchsia-100 mb-8">
        <div className="p-6 border-b border-fuchsia-100 bg-gradient-to-r from-fuchsia-50 to-rose-50">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {(nameFilter || categoryFilter || priceFilter) && (
              <button
                onClick={clearFilters}
                className="flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50 transition-colors"
              >
                <X className="h-4 w-4 mr-2" />
                Clear Filters
              </button>
            )}
          </div>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">
              Search by name
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                className="flex h-12 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 py-2 text-sm ring-offset-2 ring-rose-200 focus:outline-none focus:ring-2 placeholder:text-gray-400"
                placeholder="Sweet name..."
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">
              Category
            </label>
            <div className="relative">
              <input
                className="flex h-12 w-full rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm ring-offset-2 ring-rose-200 focus:outline-none focus:ring-2 placeholder:text-gray-400"
                placeholder="Type category..."
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                list="categorySuggestions"
              />
              <datalist id="categorySuggestions">
                {popularCategories.map((category) => (
                  <option key={category} value={category} />
                ))}
              </datalist>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">
              Max Price
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                $
              </span>
              <input
                type="number"
                className="flex h-12 w-full rounded-xl border border-gray-200 bg-white pl-8 pr-4 py-2 text-sm ring-offset-2 ring-rose-200 focus:outline-none focus:ring-2 placeholder:text-gray-400"
                placeholder="Maximum price..."
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                min="0"
                step="0.01"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Sweets Grid */}
      {filteredSweets.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-fuchsia-100 text-center p-12">
          <div className="mx-auto w-24 h-24 bg-rose-100 rounded-full flex items-center justify-center mb-6">
            <PackagePlus className="h-10 w-10 text-rose-500" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">
            No sweets found
          </h3>
          <p className="text-gray-500 mb-6">
            Try adjusting your filters or add a new sweet to your inventory
          </p>
          <Link
            to="/sweets/add"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-fuchsia-600 to-rose-500 px-8 py-3 text-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all hover:scale-105 mx-auto"
          >
            <Plus className="mr-2 h-5 w-5" />
            Add New Sweet
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSweets.map((sweet) => (
            <div
              key={sweet._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-fuchsia-100 flex flex-col"
            >
              {/* Category indicator top bar */}
              <div
                className={`h-2 bg-gradient-to-r ${getCategoryColor(
                  sweet.category
                )}`}
              ></div>

              {/* Sweet Content */}
              <div className="p-4 flex flex-col flex-grow">
                {/* Header with name and category */}
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-gray-800 text-lg group-hover:text-rose-600 transition-colors line-clamp-1">
                    {sweet.name}
                  </h3>
                  <span className="inline-flex items-center rounded-lg px-2 py-1 text-xs font-bold text-white bg-gray-800">
                    {getCategoryIcon(sweet.category)}
                    <span className="ml-1">{sweet.category}</span>
                  </span>
                </div>

                {/* Price and Stock Info */}
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center bg-rose-50 rounded-lg p-2">
                    <span className="text-sm font-medium text-gray-600">
                      Price:
                    </span>
                    <span className="font-bold text-gray-800">
                      ₹ {sweet.price.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center bg-green-50 rounded-lg p-2">
                    <span className="text-sm font-medium text-gray-600">
                      Stock:
                    </span>
                    <span
                      className={`text-xs font-bold px-2 py-1 rounded-lg ${
                        sweet.quantity < 10
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {sweet.quantity} in stock
                    </span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="p-4 border-t border-gray-100">
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex space-x-2">
                    <Link
                      to={`/sweets/edit/${sweet._id}`}
                      state={{ sweet }} // Pass the sweet data via state
                      className="inline-flex items-center justify-center flex-1 rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-xs font-medium text-gray-700 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-all"
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Link>
                    <button
                      onClick={() => {
                        setSweetToDelete(sweet._id);
                        setDeleteDialogOpen(true);
                      }}
                      className="inline-flex items-center justify-center flex-1 rounded-lg border border-red-200 bg-white px-2 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition-all"
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </button>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openRestockDialog(sweet)}
                      className="inline-flex items-center justify-center flex-1 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-2 py-1.5 text-xs font-medium text-white shadow-md hover:shadow-lg transition-all"
                    >
                      <PackageCheck className="h-3 w-3 mr-1" />
                      Restock
                    </button>
                    <button
                      onClick={() => openPurchaseDialog(sweet)}
                      className="inline-flex items-center justify-center flex-1 rounded-lg bg-gradient-to-r from-rose-500 to-rose-600 px-2 py-1.5 text-xs font-medium text-white shadow-md hover:shadow-lg transition-all"
                    >
                      <ShoppingCart className="h-3 w-3 mr-1" />
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Delete Confirmation Dialog */}
      {deleteDialogOpen && (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-200">
            <div className="p-8 space-y-6 text-center">
              <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                <Trash2 className="h-10 w-10 text-red-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">
                Delete Sweet?
              </h3>
              <p className="text-gray-500">
                Are you sure you want to delete{" "}
                <span className="font-semibold text-gray-800">
                  "{sweets.find((s) => s._id === sweetToDelete)?.name}"
                </span>
                ? This action cannot be undone.
              </p>
              <div className="flex justify-center space-x-4 pt-2">
                <button
                  onClick={() => setDeleteDialogOpen(false)}
                  className="px-6 py-2.5 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-6 py-2.5 text-sm font-medium rounded-lg bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-md hover:shadow-lg transition-all"
                >
                  Delete Permanently
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Purchase Dialog */}
      {purchaseDialogOpen && currentSweet && (
        <PurchaseSweet
          currentSweet={currentSweet}
          setPurchaseDialogOpen={setPurchaseDialogOpen}
          fetchSweets={fetchSweets}
          quantity={quantity}
          setQuantity={setQuantity}
        />
      )}

      {/* Restock Dialog */}
      {restockDialogOpen && currentSweet && (
        <RestockSweet
          currentSweet={currentSweet}
          setRestockDialogOpen={setRestockDialogOpen}
          fetchSweets={fetchSweets}
          quantity={quantity}
          setQuantity={setQuantity}
        />
      )}

      {/* Footer */}
      <footer className="mt-12 py-8 border-t border-fuchsia-100 text-center">
        <div className="flex justify-center space-x-4 mb-4">
          <button className="text-rose-500 hover:text-rose-600 transition-colors">
            <Heart className="h-5 w-5" />
          </button>
          <button className="text-rose-500 hover:text-rose-600 transition-colors">
            <Star className="h-5 w-5" />
          </button>
          <button className="text-rose-500 hover:text-rose-600 transition-colors">
            <Sparkles className="h-5 w-5" />
          </button>
        </div>
        <p className="text-sm text-gray-500">
          Sweet Shop Inventory System © {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
};

export default SweetList;
