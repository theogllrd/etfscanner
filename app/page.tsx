'use client'

import Image from 'next/image';
import { useState } from 'react';



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

function Result() {
  console.log();
  return <div>

  </div>
}

//console.log(calculate(0, 500));


function ResultsTable() {
  return (<table className="border-collapse border border-slate-500 ...">
    <thead>
      <tr>
        <th className="border border-slate-600 ...">State</th>
        <th className="border border-slate-600 ...">City</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td className="border border-slate-700 ...">Indiana</td>
        <td className="border border-slate-700 ...">Indianapolis</td>
      </tr>
      <tr>
        <td className="border border-slate-700 ...">Ohio</td>
        <td className="border border-slate-700 ...">Columbus</td>
      </tr>
      <tr>
        <td className="border border-slate-700 ...">Michigan</td>
        <td className="border border-slate-700 ...">Detroit</td>
      </tr>
    </tbody>
  </table>);
}



export default function Home() {




  /*const etfList = [
    {
      id: 1, name: 'SP500', compo: [
        { name: 'Apple', pourcentage: 0.00378 },
        { name: 'Microsoft', pourcentage: 0.00157 },
      ]
    },
    { id: 2, name: 'NASDAQ' },
    { id: 3, name: 'MSCI World' },
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
    <div className='h-screen'>
      <div className="w-full">ETF Scanner</div>

      <select id="etfs" onChange={e => onChangeSelect(e)} className="w-64 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        {etfList.map((etf) => <option value={etf.id} key={etf.id}>{etf.name}</option>)}
      </select>

      <input type="number" id="amount" onChange={e => setAmount(e.target.value)} className="w-64 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Amount" required />




      <div>
        {etf ? etf.composition ? etf.composition.map((ze) => <p key={ze.compoName}>{ze.compoName} : {ze.compoValue * parseInt(amount)}€</p>) : null : null}
      </div>


    </div >
  )
}

/*  
onChange={e => setEtf(e.target.value)}

      <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Calculte</button>




   
      */
