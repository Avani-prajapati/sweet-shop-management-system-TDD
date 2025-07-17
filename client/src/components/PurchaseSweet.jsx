import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ShoppingCart } from 'lucide-react';

export default function PurchaseSweet({ 
  currentSweet, 
  setPurchaseDialogOpen, 
  fetchSweets, 
  quantity, 
  setQuantity 
}) {
  const handlePurchase = async () => {
    if (quantity <= 0) {
      toast.error("Quantity must be greater than 0");
      return;
    }
    
    if (quantity > currentSweet.quantity) {
      toast.error(`Cannot purchase more than ${currentSweet.quantity} items`);
      return;
    }

    try {
      const updatedQuantity = currentSweet.quantity - quantity;
      await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/sweets/${currentSweet._id}`, {
        quantity: updatedQuantity
      });
      
      toast.success(`Purchased ${quantity} ${currentSweet.name}(s) successfully`);
      setPurchaseDialogOpen(false);
      fetchSweets(); // Refresh the list
    } catch (error) {
      toast.error("Failed to process purchase");
    }
  };

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-200">
        <div className="p-8 space-y-6 text-center">
          <div className="mx-auto w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center">
            <ShoppingCart className="h-10 w-10 text-rose-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800">Purchase {currentSweet.name}</h3>
          <p className="text-gray-500">
            Current stock: <span className="font-semibold text-gray-800">{currentSweet.quantity}</span>
          </p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity to Purchase</label>
              <input
                type="number"
                min="1"
                max={currentSweet.quantity}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full rounded-lg border border-gray-200 px-4 py-2 text-center text-lg font-semibold focus:ring-2 focus:ring-rose-200 focus:outline-none"
              />
            </div>
            
            <div className="pt-2">
              <p className="text-lg font-semibold text-gray-800">
                Total: ${(currentSweet.price * quantity).toFixed(2)}
              </p>
            </div>
          </div>
          
          <div className="flex justify-center space-x-4 pt-4">
            <button
              onClick={() => setPurchaseDialogOpen(false)}
              className="px-6 py-2.5 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handlePurchase}
              className="px-6 py-2.5 text-sm font-medium rounded-lg bg-gradient-to-r from-rose-500 to-rose-600 text-white shadow-md hover:shadow-lg transition-all"
            >
              Confirm Purchase
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}