import { useEffect, useState } from 'react'
import {CChart} from "@coreui/react-chartjs"
import './App.css'

function App() {
  const [homeValue, setHomeValue] = useState(1000);
  const [downPayment, setDownPayment] = useState(0);
  const [loanAmount, setLoanAmount] = useState(0);
  const [interestRate, setInterestRate] = useState(2);
  const [tenure, setTenure] = useState(10);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  useEffect(() => {
    const newDownPayment = Math.floor(homeValue * 0.2);
    setDownPayment(newDownPayment);
    setLoanAmount(homeValue - newDownPayment);
  }, [homeValue]);

  useEffect(() => {
    const interestPerMonth = interestRate / 100 / 12;
    const totalLoanMonths = tenure * 12;
    const EMI = (loanAmount * interestPerMonth * (1 + interestPerMonth) ** totalLoanMonths) / ((1 + interestPerMonth) ** totalLoanMonths - 1);
    
    setMonthlyPayment(EMI.toFixed(2));
  }, [loanAmount, interestRate, tenure]);

  return(
    <div className='flex justify-between w-5/6 mx-auto my-10'>
      <div className='w-1/2 flex flex-col gap-5'>
        <div>
          <p>Home Value</p>
          <p className='text-3xl font-semibold'>$ {homeValue}</p>
          <input
           className='w-full' type="range" min="1000" max="10000" 
           onChange={(e) => setHomeValue(parseInt(e.target.value))}
          />
          <div className='flex justify-between text-xs'>
            <p>$ 1000</p>
            <p>$ 10000</p>
          </div>
        </div>
        <div>
          <p>Down Payment</p>
          <p className='text-3xl font-semibold'>$ {downPayment}</p>
          <input 
            className='w-full' type="range" min="0" max={homeValue} 
            onChange={(e) => {
              setDownPayment(parseInt(e.target.value));
              setLoanAmount(parseInt(e.target.value));
            }}
          />
          <div className='flex justify-between text-xs'>
            <p>$ 0</p>
            <p>$ {homeValue}</p>
          </div>
        </div>
        <div>
          <p>Loan Amount</p>
          <p className='text-3xl font-semibold'>$ {loanAmount}</p>
          <input 
            className='w-full' type="range" min="0" max={homeValue}
            onChange={(e) => {
              setLoanAmount(parseInt(e.target.value));
              setDownPayment(parseInt(e.target.value));
            }} 
          />
          <div className='flex justify-between text-xs'>
            <p>$ 0</p>
            <p>$ {homeValue}</p>
          </div>
        </div>
        <div>
          <p>Interest Rate</p>
          <p className='text-3xl font-semibold'>% {interestRate}</p>
          <input 
            className='w-full' type="range" min="2" max="18" 
            onChange={(e) => setInterestRate(parseInt(e.target.value))}
          />
          <div className='flex justify-between text-xs'>
            <p>% 2</p>
            <p>% 18</p>
          </div>
        </div>
        <div>
          <p>Tenure</p>
          <select className='border-gray-500 border-[0.1rem] w-full px-2 py-4 rounded-lg' name="tenure" id="tenure" onChange={(e) => {setTenure(parseInt(e.target.value)); console.log(tenure)}}>
            <option value="5">5 years</option>
            <option value="10">10 years</option>
            <option value="15">15 years</option>
            <option value="20">20 years</option>
            <option value="25">25 years</option>
          </select>
        </div>
      </div>
      <div className='flex flex-col items-center justify-center gap-10'>
        <p className='text-3xl font-semibold'>Monthly Payment: $ {monthlyPayment}</p>
        <CChart
          type="pie"
          data={{
            labels: ['Principle', 'Interest'],
            datasets: [
              {
                backgroundColor: ['#41B883', '#E46651'],
                data: [homeValue, monthlyPayment * tenure * 12 - loanAmount],
              },
            ],
          }}
          options={{
            plugins: {
              legend: {
                labels: {
                  color: "green",
                }
              }
            },
          }}
        />
      </div>
    </div>
  )
}

export default App
