'use client'

import Image from 'next/image';
import { useState } from 'react';
import { Chart } from "react-google-charts";




/*const etfList = [
  'CAC',
  'NASDAQ'
];*/




/*function calculate(id: number, value: number) {
  console.log('coucou here : ', etfList[id].compo[0].name)
  return value * etfList[id].compo[0].pourcentage;
}*/

/*function Result({ etf, amount }) {
  return <div>
    {etf ? etf : 'default text'}
    {amount ? amount : null}
  </div>
}*/



//console.log(calculate(0, 500));


function ResultsTable({ etfs, totalAmount }: any) {
  console.log(etfs);
  return (
    <div className="mt-2 flex flex-col">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="overflow-hidden">

            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="">
                <tr>
                  <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                  <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase">Percentage</th>
                  <th scope="col" className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {etfs ?
                  etfs.composition ?
                    etfs.composition.map((compo: any) =>
                      <tr key={compo.compoName} className="">
                        <td className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                          {compo.compoName}</td>
                        <td className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                          {(compo.compoValue * 100).toFixed(2)}%</td>
                        <td className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                          {(compo.compoValue * totalAmount).toFixed(2)}€</td>
                      </tr>) :
                    null :
                  null}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function ResultsChart({ etfs }: any) {

  if (etfs.composition != null) {
    let etfTemp = [];
    etfTemp.push(["Action", "Percentage"]);
    etfs.composition.map((etf: any) => etfTemp.push([etf.compoName, etf.compoValue]));
    console.log(etfTemp);

    return (
      <Chart
        chartType="PieChart"
        data={etfTemp}
        width={"100%"}
        height={"600px"}
      />
    );
  }
}



export default function Home() {




  /*const etfList = [
      {
        id: 1, name: 'SP500', compo: [
      {name: 'Apple', pourcentage: 0.00378 },
      {name: 'Microsoft', pourcentage: 0.00157 },
      ]
    },
      {id: 2, name: 'NASDAQ' },
      {id: 3, name: 'MSCI World' },
      ];*/

  const etfList = [
    {
      id: 1,
      name: 'S&P 500',
      composition: [{
        compoName: 'Apple',
        compoValue: 0.0661
      }, {
        compoName: 'Microsoft',
        compoValue: 0.0558
      }, {
        compoName: 'Amazon',
        compoValue: 0.0251
      }, {
        compoName: 'Nvidia',
        compoValue: 0.0173
      }, {
        compoName: 'Tesla',
        compoValue: 0.0166
      }, {
        compoName: 'Berkshire Hathaway',
        compoValue: 0.0165
      }, {
        compoName: 'Alphabet',
        compoValue: 0.0161
      }, {
        compoName: 'Exxon',
        compoValue: 0.0136
      }, {
        compoName: 'Unitedhealth',
        compoValue: 0.0133
      }, {
        compoName: 'Jpmorgan',
        compoValue: 0.0126
      }, {
        compoName: 'Autres',
        compoValue: 0.747
      }]
    },
    {
      id: 2,
      name: 'NASDAQ'
    },
    {
      id: 3,
      name: 'MSCI World',
      composition: [{
        compoName: 'microsoft',
        compoValue: 1.234
      }, {
        compoName: 'Tesla',
        compoValue: 4.58
      }, {
        compoName: 'Boug',
        compoValue: 2.51
      }]
    },
  ];


  const [etf, setEtf] = useState(etfList[0]); // define the state variable and initialized it with the first value of the table
  const [amount, setAmount] = useState(''); // define the state variable and initialized it with the first value of the table


  const onChangeSelect = (e: any) => {
    const selectedEtf = e.target.value;
    const fullDataEtf = etfList.filter((e) => e.id == selectedEtf)[0];
    setEtf(fullDataEtf);
  }





  return (
    <div className='h-screen p-2'>
      <div className="w-full text-2xl text-center">ETF Scanner</div>

      <div className="mt-2">
        <select
          id="etfs"
          onChange={e => onChangeSelect(e)}
          className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          {etfList.map((etf) =>
            <option
              value={etf.id}
              key={etf.id}>{etf.name}
            </option>)}
        </select>
      </div>

      <div className="mt-2">
        <input
          type="number"
          id="amount"
          placeholder="Amount"
          onChange={e => setAmount(e.target.value)}
          className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>



      {etf.composition ?
        <ResultsTable etfs={etf} totalAmount={amount} /> :
        <p className="pt-2">No data</p>
      }

      <ResultsChart etfs={etf} />


    </div >
  )
}

/*  
onChange={e => setEtf(e.target.value)}

      <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Calculte</button>


      <div>
        {etf ? etf.composition ? etf.composition.map((ze) => <p key={ze.compoName}>{ze.compoName} : {ze.compoValue * parseInt(amount)}€</p>) : null : null}
      </div>





      <div className="w-full">
      <table className="w-full text-left">
        <thead>
          <tr>
            <th>Action</th>
            <th>Percentage</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {etfs ?
            etfs.composition ?
              etfs.composition.map((compo) =>
                <tr>
                  <td>{compo.compoName}</td>
                  <td>{(compo.compoValue * 100).toFixed(2)}%</td>
                  <td>{(compo.compoValue * totalAmount).toFixed(2)}€</td>
                </tr>) :
              null :
            null}
        </tbody>
      </table>
    </div>
   
      */
