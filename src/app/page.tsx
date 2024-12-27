'use client'

import InputForm from "./ui/input-form";
import ChartData from "./ui/chart";
import { useState } from "react";

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
    totalInterest: number
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
    let currentPrincipal = initialInvestment;
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

      currentPrincipal += yearlyContributions;
      
      const totalInterestThisYear = yearEndValue - currentPrincipal;
      
      yearlyData.push({
        year,
        savings: currentPrincipal,
        interest: totalInterestThisYear
      });

      previousValue = yearEndValue;
    }

    const totalSavings = previousValue;
    const totalInterest = totalSavings - currentPrincipal;

    return {
      yearlyData,
      totalSavings,
      totalInterest
    };
  };

  const { yearlyData, totalSavings } = calculateData();
  const savings = yearlyData.map(data => data.savings);
  const interest = yearlyData.map(data => data.interest);
  console.log(savings);
  

  return (
    <div className="flex flex-col items-center w-full max-w-7xl mx-auto p-4">
      <InputForm inputValues={inputValues} onValuesChange={handleValuesChange}/>
      <div className="text-center my-4">
        <h2 className="text-2xl font-bold">
          Total Balance: ${totalSavings.toLocaleString(undefined, { 
            minimumFractionDigits: 2, 
            maximumFractionDigits: 2 
          })}
        </h2>
      </div>
      <ChartData savings={savings} interest={interest}/>
    </div>
  );
}