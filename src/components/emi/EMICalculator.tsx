/**
 * EMI Calculator Component
 * Calculate home loan EMI with detailed breakdown
 */

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { IndianRupee, Calendar, Percent, Calculator } from "lucide-react";

const EMICalculatorComponent = () => {
  const [loanAmount, setLoanAmount] = useState(5000000); // 50 lakhs
  const [interestRate, setInterestRate] = useState(8.5); // 8.5%
  const [loanTenure, setLoanTenure] = useState(20); // 20 years
  const [showResult, setShowResult] = useState(false);

  // Calculate EMI using the formula: EMI = P × r × (1 + r)^n / ((1 + r)^n - 1)
  const calculateEMI = () => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 12 / 100;
    const numberOfMonths = loanTenure * 12;

    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfMonths)) /
      (Math.pow(1 + monthlyRate, numberOfMonths) - 1);

    const totalAmount = emi * numberOfMonths;
    const totalInterest = totalAmount - principal;

    return {
      emi: Math.round(emi),
      totalAmount: Math.round(totalAmount),
      totalInterest: Math.round(totalInterest),
      principal: principal,
    };
  };

  const result = showResult ? calculateEMI() : null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleCalculate = () => {
    setShowResult(true);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Calculator Form */}
      <Card className="p-8 space-y-8">
        <div>
          <h2 className="text-2xl font-normal text-[#00274D] mb-2">
            Calculate Your EMI
          </h2>
          <p className="text-gray-400">
            Adjust the values to calculate your monthly EMI and total payment
          </p>
        </div>

        {/* Loan Amount */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium flex items-center">
              <IndianRupee className="h-4 w-4 mr-2 text-[#D7A764]" />
              Loan Amount
            </Label>
            <span className="text-lg font-normal text-[#D7A764]">
              {formatCurrency(loanAmount)}
            </span>
          </div>
          <Slider
            value={[loanAmount]}
            onValueChange={(value) => setLoanAmount(value[0])}
            min={1000000}
            max={50000000}
            step={100000}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-400">
            <span>₹10L</span>
            <span>₹5Cr</span>
          </div>
        </div>

        {/* Interest Rate */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium flex items-center">
              <Percent className="h-4 w-4 mr-2 text-[#D7A764]" />
              Interest Rate (p.a.)
            </Label>
            <span className="text-lg font-normal text-[#D7A764]">
              {interestRate}%
            </span>
          </div>
          <Slider
            value={[interestRate]}
            onValueChange={(value) => setInterestRate(value[0])}
            min={6}
            max={15}
            step={0.1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-400">
            <span>6%</span>
            <span>15%</span>
          </div>
        </div>

        {/* Loan Tenure */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-[#D7A764]" />
              Loan Tenure
            </Label>
            <span className="text-lg font-normal text-[#D7A764]">
              {loanTenure} Years
            </span>
          </div>
          <Slider
            value={[loanTenure]}
            onValueChange={(value) => setLoanTenure(value[0])}
            min={5}
            max={30}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-400">
            <span>5 years</span>
            <span>30 years</span>
          </div>
        </div>

        {/* Calculate Button */}
        <Button
          onClick={handleCalculate}
          size="lg"
          className="w-full bg-gradient-primary hover:scale-105 transition-all duration-300 shadow-primary"
        >
          <Calculator className="mr-2 h-5 w-5" />
          Calculate EMI
        </Button>
      </Card>

      {/* Results */}
      <div className="space-y-6">
        {showResult && result ? (
          <>
            {/* EMI Result */}
            <Card className="p-8 bg-gradient-primary text-white">
              <div className="text-center space-y-2">
                <p className="text-sm uppercase tracking-wider opacity-90">
                  Your Monthly EMI
                </p>
                <p className="text-5xl font-normal">
                  {formatCurrency(result.emi)}
                </p>
                <p className="text-sm opacity-75">
                  for {loanTenure} years @ {interestRate}% p.a.
                </p>
              </div>
            </Card>

            {/* Breakdown */}
            <Card className="p-8 space-y-6">
              <h3 className="text-xl font-normal text-[#00274D]">
                Payment Breakdown
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-border">
                  <span className="text-gray-400">Principal Amount</span>
                  <span className="text-lg font-normal text-[#00274D]">
                    {formatCurrency(result.principal)}
                  </span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-border">
                  <span className="text-gray-400">Total Interest</span>
                  <span className="text-lg font-normal text-destructive">
                    {formatCurrency(result.totalInterest)}
                  </span>
                </div>
                <div className="flex items-center justify-between py-3 bg-accent rounded-lg px-4">
                  <span className="font-medium text-accent-foreground">
                    Total Amount Payable
                  </span>
                  <span className="text-xl font-normal text-[#D7A764]">
                    {formatCurrency(result.totalAmount)}
                  </span>
                </div>
              </div>

              {/* Chart Representation */}
              <div className="pt-4">
                <p className="text-sm text-gray-400 mb-3">
                  Payment Distribution
                </p>
                <div className="flex h-12 rounded-lg overflow-hidden">
                  <div
                    className="bg-[#00274D] flex items-center justify-center text-white text-xs font-medium"
                    style={{
                      width: `${
                        (result.principal / result.totalAmount) * 100
                      }%`,
                    }}
                  >
                    Principal
                  </div>
                  <div
                    className="bg-secondary flex items-center justify-center text-white text-xs font-medium"
                    style={{
                      width: `${
                        (result.totalInterest / result.totalAmount) * 100
                      }%`,
                    }}
                  >
                    Interest
                  </div>
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-400">
                  <span>
                    Principal:{" "}
                    {((result.principal / result.totalAmount) * 100).toFixed(
                      1
                    )}
                    %
                  </span>
                  <span>
                    Interest:{" "}
                    {((result.totalInterest / result.totalAmount) * 100).toFixed(
                      1
                    )}
                    %
                  </span>
                </div>
              </div>
            </Card>

            {/* Note */}
            <Card className="p-6 bg-accent/50">
              <p className="text-sm text-gray-400">
                <strong>Note:</strong> This is an approximate calculation. Actual
                EMI may vary based on your loan provider's terms, processing
                fees, and other charges. Please consult with our financial
                advisors for accurate quotations.
              </p>
            </Card>
          </>
        ) : (
          <Card className="p-12 flex flex-col items-center justify-center text-center space-y-4 min-h-[500px]">
            <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center">
              <Calculator className="h-10 w-10 text-[#D7A764]" />
            </div>
            <h3 className="text-xl font-normal text-[#00274D]">
              Ready to Calculate?
            </h3>
            <p className="text-gray-400 max-w-sm">
              Adjust the loan amount, interest rate, and tenure on the left, then
              click "Calculate EMI" to see your monthly payment breakdown.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default EMICalculatorComponent;
