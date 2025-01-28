import React, { useState } from 'react'
import Image from 'next/image'
import { formatPrice } from '@/lib/formatPrice';

export default function Checkout({ products }: { products: any[] }) {
  const [cardNumber, setCardNumber] = useState('');
  const [expireDate, setExpireDate] = useState('');

  // Card number formatter (1111 2222 3333 4444)
  const formatCardNumber = (value: string) => {
    // Remove all non-numeric characters
    const v = value.replace(/[^0-9]/g, '');
    
    // Limit to 16 digits
    const truncated = v.slice(0, 16);
    const parts = [];

    // Split into groups of 4
    for (let i = 0; i < truncated.length; i += 4) {
      parts.push(truncated.slice(i, i + 4));
    }

    // Join with spaces or return empty if no valid parts
    return parts.length ? parts.join(' ') : '';
  };

  // Expire date formatter and validator (MM/YY)
  const formatExpireDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return `${v.slice(0, 2)}/${v.slice(2, 4)}`;
    }
    return v;
  };

  const validateExpireDate = (value: string) => {
    const [month, year] = value.split('/');
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;

    if (!month || !year) return true;
    
    const expMonth = parseInt(month);
    const expYear = parseInt(year);

    if (expYear < currentYear) return false;
    if (expYear === currentYear && expMonth < currentMonth) return false;
    if (expMonth > 12) return false;

    return true;
  };

  // Add calculation logic
  const subtotal = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
  const shipping = products.length > 0 ? 4 : 0;
  const total = subtotal + shipping;

  return (
    <div className="w-full col-span-1 sticky top-10 h-fit bg-[#565ABB] text-white p-6 rounded-2xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl">Card Details</h2>
        <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden">
          <Image src="/_static/avatar/avatar.png" alt="User" width={48} height={48} />
        </div>
      </div>
    
      <div className="space-y-6">
        <div>
          <label className="block mb-2">Card type</label>
          <div className="grid grid-cols-4 gap-2">
            <div className="bg-[#7073c1] p-2 rounded-lg flex items-center justify-center">
              <Image src="/_static/cards/mastercard.png" alt="Mastercard" width={50} height={24} />
            </div>
            <div className="bg-[#7073c1] p-2 rounded-lg flex items-center justify-center">
              <Image src="/_static/cards/visa.png" alt="Visa" width={50} height={24} />
            </div>
            <div className="bg-[#7073c1] p-2 rounded-lg flex items-center justify-center">
              <Image src="/_static/cards/rupay.png" alt="RuPay" width={50} height={24} />
            </div>
            <button className="bg-[#7073c1] px-4 rounded-lg">See all</button>
          </div>
        </div>

        <div>
          <label className="block mb-2">Name on card</label>
          <input
            type="text"
            placeholder="Name"
            className="w-full bg-[#6268C6] p-3 rounded-lg"
          />
        </div>

        <div>
          <label className="block mb-2">Card Number</label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
            maxLength={19}
            placeholder="XXXX XXXX XXXX XXXX"
            className="w-full bg-[#6268C6] p-3 rounded-lg"
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block mb-2">Expiration date</label>
            <input
              type="text"
              value={expireDate}
              onChange={(e) => {
                const formatted = formatExpireDate(e.target.value);
                setExpireDate(formatted);
              }}
              maxLength={5}
              placeholder="MM/YY"
              className={`w-full bg-[#6268C6] p-3 rounded-lg ${
                !validateExpireDate(expireDate) ? 'border-red-500 border-2' : ''
              }`}
            />
            {!validateExpireDate(expireDate) && expireDate.length === 5 && (
              <p className="text-red-400 text-sm mt-1">Invalid date</p>
            )}
          </div>
          <div className="flex-1">
            <label className="block mb-2">CVV</label>
            <input
              type="text"
              placeholder="123"
              className="w-full bg-[#6268C6] p-3 rounded-lg"
              maxLength={3}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{formatPrice(shipping)}</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Total (Tax incl.)</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>

        <button className="w-full bg-[#7CE7AC] text-black py-4 rounded-lg font-semibold flex items-center justify-center gap-2">
          <span>{formatPrice(total)}</span>
          <span>Checkout →</span>
        </button>
      </div>
    </div>
  )
} 