import React from 'react';

function CheckoutWizard({ activeStep }) {
  return (
    <div className="flex flex-wrap mb-5">
      {[
        'User Login ',
        'Shipping Address ',
        'Payment Method ',
        'place Order',
      ].map((step, index) => (
        <div
          key={step}
          className={`flex-1 text-center pb-2 border-b-2 ${
            index <= activeStep
              ? 'border-indigo-500 text-indigo-500'
              : 'border-gray-400 text-gray-400'
          }`}
        >
          {step}
        </div>
      ))}
    </div>
  );
}
export default CheckoutWizard;
