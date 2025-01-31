'use client'

import InputForm from "./ui/input-form";
import ChartData from "./ui/chart";
import { useState } from "react";
import NumberFlow from '@number-flow/react'

interface YearlyData {
  year: number;
  savings: number;
  interest: number;
}

export default function Home() {
  const [inputValues, setInputValues] = useState<{
    initialInvestment: number,
    years: number,
    interestRate: number,
    compoundFrequency: 'Daily' | 'Monthly' | 'Annually',
    contributionAmount: number,
    contributionFrequency: 'Monthly' | 'Annually',
  }>({
    initialInvestment: 5000,
    years: 5,
    interestRate: 5,
    compoundFrequency: 'Monthly',
    contributionAmount: 100,
    contributionFrequency: 'Monthly',
  });

  const handleValuesChange = (updatedValues: {
    initialInvestment?: number,
    years?: number,
    interestRate?: number,
    compoundFrequency?: 'Daily' | 'Monthly' | 'Annually',
    contributionAmount?: number,
    contributionFrequency?: 'Monthly' | 'Annually'
  }) => {
    setInputValues({...inputValues, ...updatedValues});
  }

  const getCompoundFrequency = (freq: 'Daily' | 'Monthly' | 'Annually'): number => {
    switch (freq) {
      case 'Daily': return 365;
      case 'Monthly': return 12;
      case 'Annually': return 1;
    }
  }

  const calculateData = (): {
    yearlyData: YearlyData[],
    totalSavings: number,
    totalInterest: number,
    totalPrincipal: number
  } => {
    const {
      initialInvestment,
      years,
      interestRate,
      compoundFrequency,
      contributionAmount,
      contributionFrequency
    } = inputValues;

    const rate = interestRate / 100;
    const compoundPeriods = getCompoundFrequency(compoundFrequency);
    const ratePerPeriod = rate / compoundPeriods;
    
    // Convert contribution to the same frequency as compounding
    const periodicContribution = contributionFrequency === 'Monthly' 
      ? contributionAmount * (12 / compoundPeriods)
      : contributionAmount / compoundPeriods;

    const yearlyData: YearlyData[] = [];
    let totalPrincipal = initialInvestment;
    let previousValue = initialInvestment;

    for (let year = 1; year <= years; year++) {
      // Calculate for each compounding period in the year
      const periodsThisYear = compoundPeriods;
      let yearEndValue = previousValue;

      for (let period = 1; period <= periodsThisYear; period++) {
        yearEndValue = yearEndValue * (1 + ratePerPeriod) + periodicContribution;
      }

      const yearlyContributions = contributionFrequency === 'Monthly'
        ? contributionAmount * 12
        : contributionAmount;

      totalPrincipal += yearlyContributions;
      
      const totalInterestThisYear = yearEndValue - totalPrincipal;
      
      yearlyData.push({
        year,
        savings: totalPrincipal,
        interest: totalInterestThisYear
      });

      previousValue = yearEndValue;
    }

    const totalSavings = previousValue;
    const totalInterest = totalSavings - totalPrincipal;

    return {
      yearlyData,
      totalSavings,
      totalInterest,
      totalPrincipal
    };
  };

  const { yearlyData, totalSavings, totalInterest, totalPrincipal } = calculateData();
  const savings = yearlyData.map(data => data.savings);
  const interest = yearlyData.map(data => data.interest);
  console.log(savings);
  

  return (
    <div className="flex w-full min-h-screen items-center justify-center">
      <div className="flex items-end">
        <InputForm inputValues={inputValues} onValuesChange={handleValuesChange}/>
        <div className="flex flex-col items-center gap-2">
          <div className="w-[800px]">
            <div className="flex justify-between gap-2">
              <div className="flex flex-col justify-center items-center bg-white h-20 flex-1 rounded-tl-md shadow-lg text-[#2A7E3B]">
                <h3 className="font-bold text-sm">Total Balance</h3>
                {/* <p className="font-bold text-xl">${(totalSavings).toLocaleString()}</p> */}
                <NumberFlow 
                value={totalSavings}
                format={{ style: 'currency', currency:'USD' }}
                className="font-bold text-xl"
                />
              </div>
              <div className="flex flex-col justify-center items-center flex-1 shadow-lg bg-white text-[#664282]">
                <h3 className="font-light text-sm">Total Principal</h3>
                {/* <p className="font-bold text-xl">${totalPrincipal.toLocaleString()}</p> */}
                <NumberFlow 
                value={totalPrincipal}
                format={{ style: 'currency', currency:'USD' }}
                className="font-bold text-xl"
                />
              </div>
              <div className="flex flex-col justify-center items-center flex-1 rounded-tr-md shadow-lg bg-white text-[#99731a]">
                <h3 className="font-light text-sm">Total Interest</h3>
                {/* <p className="font-bold text-xl">${totalInterest.toLocaleString()}</p> */}
                <NumberFlow 
                value={totalInterest}
                format={{ style: 'currency', currency:'USD' }}
                className="font-bold text-xl"
                />
              </div>
            </div>
          </div>
          <div>
            <ChartData savings={savings} interest={interest}/>
          </div>
        </div>
      </div>
      </div>
  );
}