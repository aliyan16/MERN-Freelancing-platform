import React from "react";


const SellerTips:React.FC=()=>{
    const tips=[
        "Use clear, high-quality images for your gigs.",
        "Write a catchy and keyword-rich title.",
        "Offer fast delivery options to attract more buyers.",
        "Keep your pricing competitive and transparent.",
        "Respond quickly to buyer messages to improve trust.",
        "Promote your gigs on social media platforms.",
    ]
    return(
        <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-md p-6 mt-8">
        <h2 className="text-2xl font-bold text-emerald-700 mb-4">💡 Seller Tips to Boost Sales</h2>
        <ul className="space-y-2 text-gray-700">
            {tips.map((tip,idx)=>(
               <li key={idx} className="flex items-start">
                    <span className="text-emerald-600 mr-2">✔️</span>
                    {tip}
                </li> 
            ))}
        </ul>
        </div>
    )
}
export default SellerTips;